const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../../middlewares/auth.middleware');
const { loggerMiddleware } = require('../../middlewares/logger.middleware');

router.get('/logger', loggerMiddleware, (req, res) => {
  res.status(200).json({ success: true, message: 'Request logged successfully' });
});

router.get('/auth', protect, (req, res) => {
  res.status(200).json({ success: true, message: 'Authentication successful', user: req.user });
});

router.get('/rate-limit', (req, res) => {
  res.status(200).json({ success: true, message: 'Rate limit check successful' });
});

router.get('/error-handler', (req, res, next) => {
  next(new Error('This is a test error for global error handler'));
});

router.get('/request-time', (req, res) => {
  res.status(200).json({ success: true, message: 'Request timing check', timestamp: new Date() });
});

router.get('/cache', (req, res) => {
  res.status(200).json({ success: true, message: 'Cache check successful' });
});

module.exports = router;
