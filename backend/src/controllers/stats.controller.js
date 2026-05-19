const Earthquake = require('../models/Earthquake.model');
const catchAsync = require('../utils/catchAsync');

exports.getCount = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const filter = { isDeleted: { $ne: true } };
  if (year && !isNaN(parseInt(year))) filter.year = parseInt(year);
  const count = await Earthquake.countDocuments(filter);
  res.status(200).json({ success: true, data: { total: count } });
});

exports.getHighestMagnitude = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const filter = { isDeleted: { $ne: true } };
  if (year && !isNaN(parseInt(year))) filter.year = parseInt(year);
  const result = await Earthquake.findOne(filter).sort({ mag: -1 }).select('mag place time');
  res.status(200).json({ success: true, data: result || {} });
});

exports.getDeepest = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const filter = { isDeleted: { $ne: true } };
  if (year && !isNaN(parseInt(year))) filter.year = parseInt(year);
  const result = await Earthquake.findOne(filter).sort({ depth: -1 }).select('depth place time');
  res.status(200).json({ success: true, data: result || {} });
});

exports.getAverageDepth = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
  if (year && !isNaN(parseInt(year))) pipeline.push({ $match: { year: parseInt(year) } });
  pipeline.push({ $group: { _id: null, avgDepth: { $avg: '$depth' } } });
  const result = await Earthquake.aggregate(pipeline);
  res.status(200).json({ success: true, data: { averageDepth: result[0]?.avgDepth || 0 } });
});

exports.getAverageMagnitude = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
  if (year && !isNaN(parseInt(year))) pipeline.push({ $match: { year: parseInt(year) } });
  pipeline.push({ $group: { _id: null, avgMagnitude: { $avg: '$mag' } } });
  const result = await Earthquake.aggregate(pipeline);
  res.status(200).json({ success: true, data: { averageMagnitude: result[0]?.avgMagnitude || 0 } });
});

exports.getCountryCount = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
  if (year && !isNaN(parseInt(year))) pipeline.push({ $match: { year: parseInt(year) } });
  pipeline.push({ $group: { _id: '$country', count: { $sum: 1 } } }, { $sort: { count: -1 } });
  const result = await Earthquake.aggregate(pipeline);
  res.status(200).json({ success: true, data: result });
});

exports.getTypeCount = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
  if (year && !isNaN(parseInt(year))) pipeline.push({ $match: { year: parseInt(year) } });
  pipeline.push({ $group: { _id: '$type', count: { $sum: 1 } } });
  const result = await Earthquake.aggregate(pipeline);
  res.status(200).json({ success: true, data: result });
});

exports.getNetworkCount = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
  if (year && !isNaN(parseInt(year))) pipeline.push({ $match: { year: parseInt(year) } });
  pipeline.push({ $group: { _id: '$net', count: { $sum: 1 } } }, { $sort: { count: -1 } });
  const result = await Earthquake.aggregate(pipeline);
  res.status(200).json({ success: true, data: result });
});

exports.getReviewedCount = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const filter = { status: 'reviewed', isDeleted: { $ne: true } };
  if (year && !isNaN(parseInt(year))) filter.year = parseInt(year);
  const count = await Earthquake.countDocuments(filter);
  res.status(200).json({ success: true, data: { reviewedCount: count } });
});

exports.getMonthlyCount = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const pipeline = [{ $match: { isDeleted: { $ne: true } } }];
  if (year && !isNaN(parseInt(year))) pipeline.push({ $match: { year: parseInt(year) } });
  pipeline.push(
    { $group: { _id: '$month', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  );
  const result = await Earthquake.aggregate(pipeline);
  res.status(200).json({ success: true, data: result });
});

// Returns count of earthquakes with mag >= minMag (default 6)
exports.getHighMagnitudeCount = catchAsync(async (req, res, next) => {
  const { minMag = 6 } = req.query;
  const parsedMinMag = parseFloat(minMag);
  const filter = { mag: { $gte: isNaN(parsedMinMag) ? 6 : parsedMinMag }, isDeleted: { $ne: true } };
  const count = await Earthquake.countDocuments(filter);
  res.status(200).json({ success: true, data: { highMagnitudeCount: count } });
});

// Returns count of earthquakes with depth >= minDepth (default 300)
exports.getDeepCount = catchAsync(async (req, res, next) => {
  const { minDepth = 300 } = req.query;
  const parsedMinDepth = parseFloat(minDepth);
  const filter = { depth: { $gte: isNaN(parsedMinDepth) ? 300 : parsedMinDepth }, isDeleted: { $ne: true } };
  const count = await Earthquake.countDocuments(filter);
  res.status(200).json({ success: true, data: { deepCount: count } });
});
