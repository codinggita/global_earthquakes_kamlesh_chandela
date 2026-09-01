const mongoose = require('mongoose');
const User = require('../models/User.model');
const AuditLog = require('../models/AuditLog.model');
const Earthquake = require('../models/Earthquake.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const logger = require('../utils/logger');
const { logAction } = require('../utils/auditLogger');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const { role, isActive } = req.query;

  const filter = {};
  if (role && role.trim()) filter.role = role.trim();
  if (isActive !== undefined && isActive !== '') filter.isActive = isActive === 'true';

  const skip = (page - 1) * limit;
  const [users, total] = await Promise.all([
    User.find(filter).select('-password').skip(skip).limit(limit).sort({ createdAt: -1 }),
    User.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true,
    data: users,
    pagination: {
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      total
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new AppError('Invalid User ID', 400));
  }
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, data: user });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new AppError('Invalid User ID', 400));
  }
  const { name, role, isActive, preferences } = req.body;
  const updateData = {};
  if (name) updateData.name = name;
  if (role) updateData.role = role;
  if (isActive !== undefined) updateData.isActive = isActive;
  if (preferences) updateData.preferences = preferences;

  const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true }).select('-password');
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, message: 'User updated successfully', data: user });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return next(new AppError('Invalid User ID', 400));
  }
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return next(new AppError('User not found', 404));
  res.status(200).json({ success: true, message: 'User deleted successfully' });
});

exports.getAuditLogs = catchAsync(async (req, res, next) => {
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));
  const { action, resource } = req.query;

  const filter = {};
  if (action && action.trim()) filter.action = action.trim();
  if (resource && resource.trim()) filter.resource = resource.trim();

  const skip = (page - 1) * limit;

  let logs = [];
  let total = 0;

  try {
    [logs, total] = await Promise.all([
      AuditLog.find(filter).populate('userId', 'name email').skip(skip).limit(limit).sort({ timestamp: -1 }),
      AuditLog.countDocuments(filter)
    ]);
  } catch (err) {
    logger.warn('AuditLog populate/query fallback without populate:', err.message);
    [logs, total] = await Promise.all([
      AuditLog.find(filter).skip(skip).limit(limit).sort({ timestamp: -1 }),
      AuditLog.countDocuments(filter)
    ]);
  }

  res.status(200).json({
    success: true,
    data: logs,
    pagination: {
      page,
      limit,
      totalPages: Math.max(1, Math.ceil(total / limit)),
      total
    }
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
  if (req.user?._id) {
    await logAction(req.user._id, 'EXPORT', 'System', null, { syncedCount, range: { start, end } });
  }

  res.status(200).json({
    success: true,
    message: `Sync completed. ${syncedCount} new earthquakes added.`,
    count: syncedCount
  });
});

exports.getDashboardStats = catchAsync(async (req, res, next) => {
  // Fetch counts safely
  const [totalUsers, totalEarthquakes] = await Promise.all([
    User.countDocuments({}).catch(() => 0),
    Earthquake.countDocuments({ isDeleted: { $ne: true } }).catch(() => 0)
  ]);

  // User Trend for last 7 days (safe date conversion)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  let userTrendData = [];
  try {
    userTrendData = await User.aggregate([
      {
        $addFields: {
          parsedDate: {
            $convert: { input: '$createdAt', to: 'date', onError: null, onNull: null }
          }
        }
      },
      {
        $match: {
          parsedDate: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$parsedDate' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
  } catch (err) {
    logger.warn('User trend aggregation fallback:', err.message);
  }

  // Earthquake Trend for last 7 days (safe date conversion)
  let earthquakeTrendData = [];
  try {
    earthquakeTrendData = await Earthquake.aggregate([
      {
        $addFields: {
          parsedDate: {
            $convert: { input: '$time', to: 'date', onError: null, onNull: null }
          }
        }
      },
      {
        $match: {
          parsedDate: { $gte: sevenDaysAgo },
          isDeleted: { $ne: true }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$parsedDate' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);
  } catch (err) {
    logger.warn('Earthquake trend aggregation fallback:', err.message);
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const formattedUserTrend = [];
  const formattedEarthquakeTrend = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];

    const uMatch = Array.isArray(userTrendData) ? userTrendData.find(item => item._id === dateStr) : null;
    formattedUserTrend.push({
      name: days[d.getDay()],
      users: uMatch ? uMatch.count : 0
    });

    const eMatch = Array.isArray(earthquakeTrendData) ? earthquakeTrendData.find(item => item._id === dateStr) : null;
    formattedEarthquakeTrend.push({
      name: days[d.getDay()],
      records: eMatch ? eMatch.count : 0
    });
  }

  // System Alerts (Recent High Mag + Recent Users)
  const [recentHighMag, recentUsers] = await Promise.all([
    Earthquake.find({ mag: { $gte: 6 }, isDeleted: { $ne: true } })
      .sort({ time: -1 })
      .limit(5)
      .catch(() => []),
    User.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .catch(() => [])
  ]);

  const alerts = [
    ...(recentHighMag || []).map(eq => ({ type: 'error', message: `High magnitude (${eq.mag}) detected: ${eq.place || 'Unknown'}` })),
    ...(recentUsers || []).map(user => ({ type: 'info', message: `New user registered: ${user.name || user.email}` }))
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

