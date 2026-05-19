const Earthquake = require('../models/Earthquake.model');
const catchAsync = require('../utils/catchAsync');

exports.searchEarthquakes = catchAsync(async (req, res, next) => {
  const { q, page = 1, limit = 20 } = req.query;

  const filter = (!q || q.trim() === '') ? { isDeleted: { $ne: true } } : {
    isDeleted: { $ne: true },
    $or: [
      { place: new RegExp(q.trim(), 'i') },
      { country: new RegExp(q.trim(), 'i') },
      { net: new RegExp(q.trim(), 'i') },
      { magType: new RegExp(q.trim(), 'i') },
      { type: new RegExp(q.trim(), 'i') },
      { status: new RegExp(q.trim(), 'i') }
    ]
  };

  const skip = (parseInt(page) - 1) * parseInt(limit);

  const [data, total] = await Promise.all([
    Earthquake.find(filter).sort({ time: -1 }).skip(skip).limit(parseInt(limit)),
    Earthquake.countDocuments(filter)
  ]);

  res.status(200).json({
    success: true, data,
    pagination: {
      page: parseInt(page), limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit)), total
    }
  });
});
