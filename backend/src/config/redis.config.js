const logger = require('../utils/logger');

class RedisConfig {
  constructor() {
    this.enabled = false;
    this.client = null;
  }

  async connect() {
    logger.info('Redis caching is disabled');
  }

  async get() { return null; }
  async set() {}
  async del() {}
}

module.exports = new RedisConfig();
