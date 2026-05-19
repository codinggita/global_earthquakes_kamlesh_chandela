const logger = require('./logger');

class EmailService {
  static async sendEmail(options) {
    logger.info(`Email would be sent to ${options.email} with subject: ${options.subject}`);
    return true;
  }

  static async sendPasswordResetEmail(email, token) {
    return this.sendEmail({
      email,
      subject: 'Password Reset Request',
      text: `Your password reset token is: ${token}. This token expires in 10 minutes.`
    });
  }

  static async sendWelcomeEmail(email, name) {
    return this.sendEmail({
      email,
      subject: 'Welcome to Earthquake Analytics Platform',
      text: `Welcome ${name}! Your account has been created successfully.`
    });
  }
}

module.exports = EmailService;
