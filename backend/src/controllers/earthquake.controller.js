const EarthquakeService = require('../services/earthquake.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const { validateEarthquake } = require('../utils/validators');
const { logAction } = require('../utils/auditLogger');

exports.getAllEarthquakes = catchAsync(async (req, res, next) => {
  const {
    page = 1, limit = 10, sort = '-time', country, magType, status,
    minMagnitude, maxMagnitude, minDepth, maxDepth, net, network, year, month,
    place, minGap, depthCategory, magnitudeCategory, minRms
  } = req.query;

  // Sort field mapping — allow human-friendly names like 'magnitude' alongside DB field 'mag'
  const sortFieldMap = { magnitude: 'mag', '-magnitude': '-mag', time: 'time', '-time': '-time' };
  const rawSort = (sort && sort !== '') ? sort : '-time';
  const sortOrder = sortFieldMap[rawSort] || rawSort;

  const filter = { isDeleted: { $ne: true } };
  if (country && country.trim()) filter.country = { $regex: country.trim(), $options: 'i' };
  if (magType && magType.trim()) filter.magType = magType.trim();
  if (status && status.trim()) filter.status = status.trim();
  if (minMagnitude || maxMagnitude) {
    filter.mag = {};
    if (minMagnitude) filter.mag.$gte = parseFloat(minMagnitude);
    if (maxMagnitude) filter.mag.$lte = parseFloat(maxMagnitude);
  }
  if (minDepth || maxDepth) {
    filter.depth = {};
    if (minDepth) filter.depth.$gte = parseFloat(minDepth);
    if (maxDepth) filter.depth.$lte = parseFloat(maxDepth);
  }
  const netValue = net || network; // Support both ?net=us and ?network=us
  if (netValue && netValue.trim()) filter.net = netValue.trim();
  if (year) filter.year = parseInt(year);
  if (month) filter.month = parseInt(month);
  if (place && place.trim()) filter.place = { $regex: place.trim(), $options: 'i' };
  if (minGap) filter.gap = { $gte: parseFloat(minGap) };
  if (minRms) filter.rms = { $gte: parseFloat(minRms) };
  if (depthCategory) filter.depthCategory = depthCategory;
  if (magnitudeCategory) filter.magnitudeCategory = magnitudeCategory;

  const result = await EarthquakeService.getAllEarthquakes(filter, {
    page: parseInt(page), limit: parseInt(limit), sort: sortOrder
  });

  res.status(200).json({
    success: true, message: 'Earthquakes fetched successfully',
    data: result.data, pagination: result.pagination, total: result.total
  });
});

exports.getEarthquakeById = catchAsync(async (req, res, next) => {
  const earthquake = await EarthquakeService.getEarthquakeById(req.params.id);
  if (!earthquake) return next(new AppError('Earthquake not found', 404));
  res.status(200).json({ success: true, message: 'Earthquake fetched successfully', data: earthquake });
});

exports.createEarthquake = catchAsync(async (req, res, next) => {
  const validationError = validateEarthquake(req.body);
  if (validationError) return next(new AppError(validationError, 400));
  const earthquake = await EarthquakeService.createEarthquake(req.body);
  
  // Log the action
  await logAction(req.user.id, 'CREATE', 'Earthquake', earthquake._id, { place: earthquake.place });

  res.status(201).json({ success: true, message: 'Earthquake created successfully', data: earthquake });
});

exports.updateEarthquake = catchAsync(async (req, res, next) => {
  const earthquake = await EarthquakeService.updateEarthquake(req.params.id, req.body);
  if (!earthquake) return next(new AppError('Earthquake not found', 404));

  // Log the action
  await logAction(req.user.id, 'UPDATE', 'Earthquake', earthquake._id, { place: earthquake.place });

  res.status(200).json({ success: true, message: 'Earthquake updated successfully', data: earthquake });
});

exports.deleteEarthquake = catchAsync(async (req, res, next) => {
  const earthquake = await EarthquakeService.deleteEarthquake(req.params.id);
  if (!earthquake) return next(new AppError('Earthquake not found', 404));

  // Log the action
  await logAction(req.user.id, 'DELETE', 'Earthquake', req.params.id);

  res.status(200).json({ success: true, message: 'Earthquake deleted successfully' });
});

exports.checkExists = catchAsync(async (req, res, next) => {
  const exists = await EarthquakeService.checkExists(req.params.id);
  res.status(200).json({ success: true, exists });
});

exports.bulkCreate = catchAsync(async (req, res, next) => {
  const { earthquakes } = req.body;
  if (!Array.isArray(earthquakes) || earthquakes.length === 0) {
    return next(new AppError('Please provide an array of earthquakes', 400));
  }
  const result = await EarthquakeService.bulkCreate(earthquakes);
  res.status(201).json({ success: true, message: `${result.insertedCount} earthquakes created successfully`, data: result });
});

exports.bulkUpdate = catchAsync(async (req, res, next) => {
  const { filter, update } = req.body;
  const result = await EarthquakeService.bulkUpdate(filter, update);
  res.status(200).json({ success: true, message: `${result.modifiedCount} earthquakes updated successfully`, data: result });
});

exports.bulkDelete = catchAsync(async (req, res, next) => {
  const { ids } = req.body;
  const result = await EarthquakeService.bulkDelete(ids);
  res.status(200).json({ success: true, message: `${result.deletedCount} earthquakes deleted successfully` });
});

exports.getByPlace = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getByPlace(req.params.place);
  res.status(200).json({ success: true, count: earthquakes.length, data: earthquakes });
});

exports.getByCountry = catchAsync(async (req, res, next) => {
  const { page = 1, limit = 20 } = req.query;
  const result = await EarthquakeService.getByCountry(req.params.country, { page: parseInt(page), limit: parseInt(limit) });
  res.status(200).json({ success: true, data: result.data, pagination: result.pagination });
});

exports.getByType = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getByType(req.params.type);
  res.status(200).json({ success: true, count: earthquakes.length, data: earthquakes });
});

exports.getByStatus = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getByStatus(req.params.status);
  res.status(200).json({ success: true, count: earthquakes.length, data: earthquakes });
});

exports.getByMagType = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getByMagType(req.params.magType);
  res.status(200).json({ success: true, count: earthquakes.length, data: earthquakes });
});

exports.getByNetwork = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getByNetwork(req.params.net);
  res.status(200).json({ success: true, count: earthquakes.length, data: earthquakes });
});

exports.getHighMagnitude = catchAsync(async (req, res, next) => {
  const { minMag = 6, page = 1, limit = 20 } = req.query;
  const result = await EarthquakeService.getHighMagnitude(parseFloat(minMag), { 
    page: parseInt(page) || 1, 
    limit: parseInt(limit) || 20 
  });
  res.status(200).json({ success: true, data: result.data, pagination: result.pagination });
});

exports.getDeepEarthquakes = catchAsync(async (req, res, next) => {
  const { minDepth = 300, page = 1, limit = 20 } = req.query;
  const result = await EarthquakeService.getDeepEarthquakes(parseFloat(minDepth), { 
    page: parseInt(page) || 1, 
    limit: parseInt(limit) || 20 
  });
  res.status(200).json({ success: true, data: result.data, pagination: result.pagination });
});

exports.getShallowEarthquakes = catchAsync(async (req, res, next) => {
  const { maxDepth = 70, page = 1, limit = 20 } = req.query;
  const result = await EarthquakeService.getShallowEarthquakes(parseFloat(maxDepth), { page: parseInt(page), limit: parseInt(limit) });
  res.status(200).json({ success: true, data: result.data, pagination: result.pagination });
});

exports.getRecentEarthquakes = catchAsync(async (req, res, next) => {
  const { days = 7, page = 1, limit = 20 } = req.query;
  const result = await EarthquakeService.getRecentEarthquakes(parseInt(days), { page: parseInt(page), limit: parseInt(limit) });
  res.status(200).json({ success: true, data: result.data, pagination: result.pagination });
});

exports.getCriticalEarthquakes = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getCriticalEarthquakes();
  res.status(200).json({ success: true, count: earthquakes.length, data: earthquakes });
});

exports.getHighGap = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({ gap: { $gt: 180 } }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getHighRms = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({ rms: { $gt: 1 } }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getOceanic = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({ 
    $or: [{ country: 'Ocean' }, { country: 'Unknown' }, { place: /ocean/i }] 
  }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getByMagnitude = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({ mag: parseFloat(req.params.mag) }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getByDepth = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({ depth: parseFloat(req.params.depth) }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getByDate = catchAsync(async (req, res, next) => {
  const date = new Date(req.params.date);
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);
  const earthquakes = await EarthquakeService.getAllEarthquakes({ 
    time: { $gte: date, $lt: nextDay } 
  }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getByYear = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({ year: parseInt(req.params.year) }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getByMonth = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({ month: parseInt(req.params.month) }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getLowMagnitude = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({ mag: { $lt: 4 } }, { limit: 100 });
  res.status(200).json({ success: true, count: earthquakes.data.length, data: earthquakes.data });
});

exports.getRandom = catchAsync(async (req, res, next) => {
  const count = await EarthquakeService.getCount({});
  const random = Math.floor(Math.random() * count);
  const earthquake = await EarthquakeService.getAllEarthquakes({}, { limit: 1, page: random + 1 });
  res.status(200).json({ success: true, data: earthquake.data[0] });
});

exports.exportCSV = catchAsync(async (req, res, next) => {
  const earthquakes = await EarthquakeService.getAllEarthquakes({}, { limit: 1000 }); // Export last 1000 records
  
  if (!earthquakes.data || earthquakes.data.length === 0) {
    return next(new AppError('No data available to export', 404));
  }

  const fields = ['time', 'latitude', 'longitude', 'depth', 'mag', 'magType', 'place', 'type', 'status', 'net'];
  const csvRows = [];
  
  // Header row
  csvRows.push(fields.join(','));

  // Data rows
  for (const eq of earthquakes.data) {
    const row = fields.map(field => {
      const val = eq[field];
      if (typeof val === 'string') {
        return `"${val.replace(/"/g, '""')}"`; // Escape quotes and wrap in quotes
      }
      return val;
    });
    csvRows.push(row.join(','));
  }

  const csvContent = csvRows.join('\n');
  const filename = `earthquakes_export_${new Date().toISOString().split('T')[0]}.csv`;

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  res.status(200).send(csvContent);
});
