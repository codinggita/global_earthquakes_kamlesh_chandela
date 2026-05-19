const AuditLog = require('../models/AuditLog.model');

/**
 * Log an administrative or user action to the database
 * @param {string} userId - ID of the user performing the action
 * @param {string} action - Action type (CREATE, UPDATE, DELETE, LOGIN, etc.)
 * @param {string} resource - The target resource (User, Earthquake, etc.)
 * @param {string} resourceId - (Optional) ID of the target resource
 * @param {object} details - (Optional) Additional details about the action
 */
const logAction = async (userId, action, resource, resourceId = null, details = null) => {
  try {
    await AuditLog.create({
      userId,
      action,
      resource,
      resourceId,
      details,
      timestamp: new Date()
    });
  } catch (err) {
    console.error('Audit Logging failed:', err);
  }
};

module.exports = { logAction };
