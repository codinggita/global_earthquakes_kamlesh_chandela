const User = require('../models/User.model');
const AuditLog = require('../models/AuditLog.model');
const Earthquake = require('../models/Earthquake.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { logAction } = require('../utils/auditLogger');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 20, role, isActive } = req.query;
  const filter = {};
  if (role) filter.role = role;
  if (isActive !== undefined) filter.isActive = isActive === 'true';

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [users, total] = await Promise.all([
    User.find(filter).skip(skip).limit(parseInt(limit)).sort({ createdAt: -1 }),
    User.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true, data: users,
    pagination: { page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)), total }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, data: user });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, role, isActive, preferences } = req.body;
  const updateData = {};
  if (name) updateData.name = name;
  if (role) updateData.role = role;
  if (isActive !== undefined) updateData.isActive = isActive;
  if (preferences) updateData.preferences = preferences;

  const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, message: 'User updated successfully', data: user });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, message: 'User deleted successfully' });
});

exports.getAuditLogs = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 20, action, resource } = req.query;
  const filter = {};
  if (action) filter.action = action;
  if (resource) filter.resource = resource;

  const skip = (parseInt(page) - 1) * parseInt(limit);
  const [logs, total] = await Promise.all([
    AuditLog.find(filter).populate('userId', 'name email').skip(skip).limit(parseInt(limit)).sort({ timestamp: -1 }),
    AuditLog.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true, data: logs,
    pagination: { page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)), total }
  });
});

exports.syncUsgs = catchAsync(async (req, res, next) => {
  const { startTime, endTime } = req.body;
  const UsgsService = require('../services/usgs.service');
  
  const now = new Date();
  const start = startTime || new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(); // Default last 24h
  const end = endTime || now.toISOString();
  
  const syncedCount = await UsgsService.syncData(start, end);
  
  // Log the action
  await logAction(req.user.id, 'EXPORT', 'System', null, { syncedCount, range: { start, end } });

  res.status(200).json({ 
    success: true, 
    message: `Sync completed. ${syncedCount} new earthquakes added.`,
    count: syncedCount 
  });
});
exports.getDashboardStats = catchAsync(async (req, res, next) => {
  const [totalUsers, totalEarthquakes] = await Promise.all([
    User.countDocuments({}),
    Earthquake.countDocuments({ isDeleted: { $ne: true } })
  ]);

  // User Trend for last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const userTrendData = await User.aggregate([
    { $match: { createdAt: { $gte: sevenDaysAgo } } },
    { $group: { 
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 } 
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  // Earthquake Trend for last 7 days
  const earthquakeTrendData = await Earthquake.aggregate([
    { $match: { time: { $gte: sevenDaysAgo }, isDeleted: { $ne: true } } },
    { $group: { 
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$time" } },
        count: { $sum: 1 } 
      }
    },
    { $sort: { "_id": 1 } }
  ]);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const formattedUserTrend = [];
  const formattedEarthquakeTrend = [];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    
    const uMatch = userTrendData.find(item => item._id === dateStr);
    formattedUserTrend.push({
      name: days[d.getDay()],
      users: uMatch ? uMatch.count : 0
    });

    const eMatch = earthquakeTrendData.find(item => item._id === dateStr);
    formattedEarthquakeTrend.push({
      name: days[d.getDay()],
      records: eMatch ? eMatch.count : 0
    });
  }

  // System Alerts (Recent High Mag + Recent Users)
  const [recentHighMag, recentUsers] = await Promise.all([
    Earthquake.find({ mag: { $gte: 6 }, isDeleted: { $ne: true } }).sort({ time: -1 }).limit(5),
    User.find({}).sort({ createdAt: -1 }).limit(5)
  ]);

  const alerts = [
    ...recentHighMag.map(eq => ({ type: 'error', message: `High magnitude (${eq.mag}) detected: ${eq.place}` })),
    ...recentUsers.map(user => ({ type: 'info', message: `New user registered: ${user.name}` }))
  ].slice(0, 8);

  res.status(200).json({
    success: true,
    data: {
      totalUsers,
      totalEarthquakes,
      userTrend: formattedUserTrend,
      earthquakeTrend: formattedEarthquakeTrend,
      alerts
    }
  });
});
