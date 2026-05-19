const rateLimit = require('express-rate-limit');

exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  standardHeaders: true,
  legacyHeaders: false
});

exports.authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: 'Too many login attempts, please try again after 1 hour',
  skipSuccessfulRequests: true
});

exports.strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 50,
  message: 'Rate limit exceeded for this endpoint'
});
