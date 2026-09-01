const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  action: {
    type: String,
    enum: ['CREATE', 'UPDATE', 'DELETE', 'READ', 'LOGIN', 'LOGOUT', 'EXPORT'],
    required: true
  },
  resource: {
    type: String,
    required: true
  },
  resourceId: String,
  details: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

auditLogSchema.index({ userId: 1, timestamp: -1 });
auditLogSchema.index({ action: 1, resource: 1 });

module.exports = mongoose.model('AuditLog', auditLogSchema);
