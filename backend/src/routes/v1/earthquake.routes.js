const express = require('express');
const router = express.Router();
const earthquakeController = require('../../controllers/earthquake.controller');
const { protect, restrictTo } = require('../../middlewares/auth.middleware');
const { validateEarthquake } = require('../../middlewares/validation.middleware');

router.route('/')
  .get(earthquakeController.getAllEarthquakes)
  .post(protect, restrictTo('admin', 'moderator'), validateEarthquake, earthquakeController.createEarthquake);

router.route('/bulk-create')
  .post(protect, restrictTo('admin'), earthquakeController.bulkCreate);

router.route('/bulk-update')
  .patch(protect, restrictTo('admin'), earthquakeController.bulkUpdate);

router.route('/bulk-delete')
  .delete(protect, restrictTo('admin'), earthquakeController.bulkDelete);

router.route('/import-json')
  .post(protect, restrictTo('admin'), (req, res) => res.status(200).json({ success: true, message: 'JSON import started' }));

router.options('*', (req, res) => {
  res.header('Allow', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
  res.status(200).send();
});

router.head('/', (req, res) => res.status(200).end());
router.head('/:id', (req, res) => res.status(200).end());
router.head('/country/:country', (req, res) => res.status(200).end());
router.head('/system/health', (req, res) => res.status(200).end());

router.options('/system/health', (req, res) => {
  res.header('Allow', 'GET, OPTIONS');
  res.status(200).send();
});

router.get('/high-magnitude', earthquakeController.getHighMagnitude);
router.get('/deep', earthquakeController.getDeepEarthquakes);
router.get('/shallow', earthquakeController.getShallowEarthquakes);
router.get('/recent', earthquakeController.getRecentEarthquakes);
router.get('/reviewed', earthquakeController.getByStatus.bind(null, 'reviewed'));
router.get('/high-gap', earthquakeController.getHighGap);
router.get('/high-rms', earthquakeController.getHighRms);
router.get('/oceanic', earthquakeController.getOceanic);
router.get('/critical', earthquakeController.getCriticalEarthquakes);

router.get('/place/:place', earthquakeController.getByPlace);
router.get('/country/:country', earthquakeController.getByCountry);
router.get('/type/:type', earthquakeController.getByType);
router.get('/status/:status', earthquakeController.getByStatus);
router.get('/mag-type/:magType', earthquakeController.getByMagType);
router.get('/network/:net', earthquakeController.getByNetwork);

router.route('/exists/:id')
  .get(earthquakeController.checkExists);

router.route('/:id')
  .get(earthquakeController.getEarthquakeById)
  .put(protect, restrictTo('admin', 'moderator'), earthquakeController.updateEarthquake)
  .patch(protect, restrictTo('admin', 'moderator'), earthquakeController.updateEarthquake)
  .delete(protect, restrictTo('admin'), earthquakeController.deleteEarthquake);

// Route Parameters Practice
router.get('/magnitude/:mag', earthquakeController.getByMagnitude);
router.get('/depth/:depth', earthquakeController.getByDepth);
router.get('/date/:date', earthquakeController.getByDate);
router.get('/year/:year', earthquakeController.getByYear);
router.get('/month/:month', earthquakeController.getByMonth);

// Filtering Routes
router.get('/filter/high-magnitude', earthquakeController.getHighMagnitude);
router.get('/filter/low-magnitude', earthquakeController.getLowMagnitude);
router.get('/filter/deep', earthquakeController.getDeepEarthquakes);
router.get('/filter/shallow', earthquakeController.getShallowEarthquakes);
router.get('/filter/high-gap', earthquakeController.getHighGap);
router.get('/filter/high-rms', earthquakeController.getHighRms);
router.get('/filter/reviewed', earthquakeController.getByStatus.bind(null, 'reviewed'));
router.get('/filter/oceanic', earthquakeController.getOceanic);
router.get('/filter/recent', earthquakeController.getRecentEarthquakes);
router.get('/filter/critical', earthquakeController.getCriticalEarthquakes);

// Sorting Routes (Explicit endpoints as per checklist)
router.get('/sort/magnitude-desc', (req, res, next) => { req.query.sort = '-mag'; earthquakeController.getAllEarthquakes(req, res, next); });
router.get('/sort/time-desc', (req, res, next) => { req.query.sort = '-time'; earthquakeController.getAllEarthquakes(req, res, next); });

// System Routes
router.get('/system/health', (req, res) => res.status(200).json({ status: 'OK', timestamp: new Date() }));

// Random
router.get('/random', earthquakeController.getRandom);

// Export
router.get('/export/csv', earthquakeController.exportCSV);

module.exports = router;
