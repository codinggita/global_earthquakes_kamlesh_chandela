const AnalyticsService = require('../services/analytics.service');
const Earthquake = require('../models/Earthquake.model');
const catchAsync = require('../utils/catchAsync');

exports.getHighestMagnitude = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const result = await AnalyticsService.getHighestMagnitude(year ? parseInt(year) : null);
  res.status(200).json({ success: true, data: result });
});

exports.getDeepestEarthquakes = catchAsync(async (req, res, next) => {
  const { limit = 10, year } = req.query;
  const result = await AnalyticsService.getDeepestEarthquakes(parseInt(limit), year ? parseInt(year) : null);
  res.status(200).json({ success: true, data: result });
});

exports.getRecentActivity = catchAsync(async (req, res, next) => {
  const { days = 30 } = req.query;
  const result = await AnalyticsService.getRecentActivity(parseInt(days));
  res.status(200).json({ success: true, data: result });
});

exports.getLocationAnalysis = catchAsync(async (req, res, next) => {
  const result = await AnalyticsService.getLocationAnalysis();
  res.status(200).json({ success: true, data: result });
});

exports.getCountryAnalysis = catchAsync(async (req, res, next) => {
  const { limit = 10, year } = req.query;
  const result = await AnalyticsService.getCountryAnalysis(parseInt(limit), year ? parseInt(year) : null);
  res.status(200).json({ success: true, data: result });
});

exports.getMagnitudeAnalysis = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const result = await AnalyticsService.getMagnitudeAnalysis(year ? parseInt(year) : null);
  res.status(200).json({ success: true, data: result });
});

exports.getDepthAnalysis = catchAsync(async (req, res, next) => {
  const { year } = req.query;
  const result = await AnalyticsService.getDepthAnalysis(year ? parseInt(year) : null);
  res.status(200).json({ success: true, data: result });
});

exports.getMonthlyAnalysis = catchAsync(async (req, res, next) => {
  const { year = 2015 } = req.query;
  const result = await AnalyticsService.getMonthlyAnalysis(parseInt(year));
  res.status(200).json({ success: true, data: result });
});

exports.getNetworkAnalysis = catchAsync(async (req, res, next) => {
  const result = await AnalyticsService.getNetworkAnalysis();
  res.status(200).json({ success: true, data: result });
});

exports.getErrorAnalysis = catchAsync(async (req, res, next) => {
  const result = await AnalyticsService.getErrorAnalysis();
  res.status(200).json({ success: true, data: result });
});

exports.getAvailableYears = catchAsync(async (req, res, next) => {
  const years = await Earthquake.distinct('year');
  // Filter out nulls and sort descending
  const validYears = years.filter(y => y).sort((a, b) => b - a);
  res.status(200).json({ success: true, data: validYears });
});
