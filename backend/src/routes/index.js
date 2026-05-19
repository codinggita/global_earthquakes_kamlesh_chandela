const express = require('express');
const router = express.Router();

router.use('/earthquakes', require('./v1/earthquake.routes'));
router.use('/auth', require('./v1/auth.routes'));
router.use('/analytics/earthquakes', require('./v1/analytics.routes'));
router.use('/stats/earthquakes', require('./v1/stats.routes'));
router.use('/search', require('./v1/search.routes'));
router.use('/admin', require('./v1/admin.routes'));
router.use('/middleware', require('./v1/middleware.routes'));
router.use('/jwt', require('./v1/auth.routes')); // Reuse auth for jwt practice
router.use('/protected', require('./v1/earthquake.routes')); // Reuse earthquake for protected practice
router.use('/earthquakes/filter', require('./v1/earthquake.routes')); // Reuse for filter routes
router.use('/earthquakes/sort', require('./v1/earthquake.routes')); // Reuse for sort routes

module.exports = router;
