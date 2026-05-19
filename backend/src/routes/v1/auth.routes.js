const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth.controller');
const { protect } = require('../../middlewares/auth.middleware');
const { validateLogin, validateRegister } = require('../../middlewares/validation.middleware');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.post('/logout', protect, authController.logout);
router.get('/profile', protect, authController.getProfile);
router.patch('/profile', protect, authController.updateProfile);
router.post('/change-password', protect, authController.changePassword);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);
router.post('/send-otp', authController.sendOtp);

router.head('/profile', protect, (req, res) => res.status(200).end());
router.options('/login', (req, res) => {
  res.header('Allow', 'POST, OPTIONS');
  res.status(200).send();
});

// JWT Practice Routes
router.get('/jwt/profile', protect, authController.getProfile);
router.get('/jwt/dashboard', protect, (req, res) => res.status(200).json({ success: true, message: 'JWT Dashboard Access' }));
router.post('/jwt/generate-token', authController.login);
router.post('/jwt/verify-token', authController.verifyToken);
router.post('/jwt/refresh-token', protect, authController.refreshToken);
router.delete('/jwt/revoke-token', protect, authController.revokeToken);
router.get('/jwt/private-earthquakes', protect, (req, res) => res.redirect('/api/v1/earthquakes'));
router.get('/jwt/private-analytics', protect, authController.getPrivateAnalytics);

router.options('/jwt/profile', (req, res) => {
  res.header('Allow', 'GET, OPTIONS');
  res.status(200).send();
});

module.exports = router;
