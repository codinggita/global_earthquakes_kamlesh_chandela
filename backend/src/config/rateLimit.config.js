module.exports = {
  api: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  auth: {
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: 'Too many login attempts, please try again after 1 hour',
    skipSuccessfulRequests: true,
  },
  strict: {
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: 'Rate limit exceeded for this endpoint',
  },
};
