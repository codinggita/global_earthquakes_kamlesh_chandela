const express = require('express');
const router = express.Router();
const analyticsController = require('../../controllers/analytics.controller');

router.get('/highest-magnitude', analyticsController.getHighestMagnitude);
router.head('/highest-magnitude', (req, res) => res.status(200).end());
router.get('/available-years', analyticsController.getAvailableYears);
router.get('/deepest', analyticsController.getDeepestEarthquakes);
router.get('/recent-activity', analyticsController.getRecentActivity);
router.get('/location-analysis', analyticsController.getLocationAnalysis);
router.get('/country-analysis', analyticsController.getCountryAnalysis);
router.get('/network-analysis', analyticsController.getNetworkAnalysis);
router.get('/magnitude-analysis', analyticsController.getMagnitudeAnalysis);
router.get('/depth-analysis', analyticsController.getDepthAnalysis);
router.get('/monthly-analysis', analyticsController.getMonthlyAnalysis);
router.get('/error-analysis', analyticsController.getErrorAnalysis);

module.exports = router;
