const crypto = require('crypto');

class AuthService {
  static generatePasswordResetToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  static sanitizeUser(user) {
    const sanitized = user.toObject();
    delete sanitized.password;
    delete sanitized.passwordResetToken;
    delete sanitized.passwordResetExpires;
    delete sanitized.emailVerificationToken;
    return sanitized;
  }
}

module.exports = AuthService;
