const express = require('express');
const router = express.Router();
const statsController = require('../../controllers/stats.controller');

router.get('/count', statsController.getCount);
router.head('/count', (req, res) => res.status(200).end());
router.get('/highest-magnitude', statsController.getHighestMagnitude);
router.get('/deepest', statsController.getDeepest);
router.get('/average-depth', statsController.getAverageDepth);
router.get('/average-magnitude', statsController.getAverageMagnitude);
router.get('/country-count', statsController.getCountryCount);
router.get('/type-count', statsController.getTypeCount);
router.get('/network-count', statsController.getNetworkCount);
router.get('/reviewed-count', statsController.getReviewedCount);
router.get('/monthly-count', statsController.getMonthlyCount);
router.get('/high-magnitude-count', statsController.getHighMagnitudeCount);
router.get('/deep-count', statsController.getDeepCount);

module.exports = router;
