const User = require('../models/User.model');
const AuthService = require('../services/auth.service');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const jwt = require('jsonwebtoken');
const { logAction } = require('../utils/auditLogger');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return next(new AppError('Email already registered', 400));

  const user = await User.create({ name, email, password, role: role || 'user' });
  
  // Log the registration
  await logAction(user._id, 'CREATE', 'User', user._id, { email: user.email });

  const token = generateToken(user._id);
  user.password = undefined;

  res.status(201).json({ success: true, message: 'User registered successfully', data: { user, token } });
});

exports.login = catchAsync(async (req, res, next) => {
  console.log('Login attempt for:', req.body.email);
  const { email, password } = req.body;
  if (!email || !password) return next(new AppError('Please provide email and password', 400));

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError('Invalid email or password', 401));
  }

  if (user.isActive === false) {
    return next(new AppError('Your account is banned. Please contact admin for support.', 401));
  }

  user.lastLogin = Date.now();
  await user.save({ validateBeforeSave: false });

  // Log the login
  await logAction(user._id, 'LOGIN', 'User', user._id);

  const token = generateToken(user._id);
  user.password = undefined;

  res.status(200).json({ success: true, message: 'Login successful', data: { user, token } });
});

exports.logout = catchAsync(async (req, res, next) => {
  if (req.user) {
    await logAction(req.user.id, 'LOGOUT', 'User', req.user.id);
  }
  res.status(200).json({ success: true, message: 'Logged out successfully' });
});

exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, data: user });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const allowedFields = ['name', 'preferences'];
  const updateData = {};
  Object.keys(req.body).forEach(key => {
    if (allowedFields.includes(key)) updateData[key] = req.body[key];
  });
  const user = await User.findByIdAndUpdate(req.user.id, updateData, { new: true, runValidators: true });
  res.status(200).json({ success: true, message: 'Profile updated successfully', data: user });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  const user = await User.findById(req.user.id).select('+password');
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError('Current password is incorrect', 401));
  }
  user.password = newPassword;
  await user.save();
  res.status(200).json({ success: true, message: 'Password changed successfully' });
});

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return next(new AppError('No user found with this email', 404));

  const resetToken = AuthService.generatePasswordResetToken();
  user.passwordResetToken = resetToken;
  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, message: 'Password reset token sent to email' });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() }
  });
  if (!user) return next(new AppError('Invalid or expired token', 400));

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.status(200).json({ success: true, message: 'Password reset successful' });
});

exports.verifyEmail = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const user = await User.findOne({ emailVerificationToken: token });
  if (!user) return next(new AppError('Invalid verification token', 400));

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ success: true, message: 'Email verified successfully' });
});

exports.verifyToken = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  if (!token) return next(new AppError('Token is required', 400));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ success: true, message: 'Token is valid', data: decoded });
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
});

exports.refreshToken = catchAsync(async (req, res, next) => {
  const token = generateToken(req.user.id);
  res.status(200).json({ success: true, token });
});

exports.revokeToken = catchAsync(async (req, res, next) => {
  // In a real app, you would add the token to a blacklist (Redis)
  res.status(200).json({ success: true, message: 'Token revoked successfully' });
});

exports.sendOtp = catchAsync(async (req, res, next) => {
  const { email, phone } = req.body;
  if (!email && !phone) return next(new AppError('Please provide email or phone number', 400));
  
  // Mock OTP generation
  const otp = Math.floor(100000 + Math.random() * 900000);
  console.log(`OTP for ${email || phone}: ${otp}`);

  res.status(200).json({ 
    success: true, 
    message: `OTP sent successfully to ${email || phone}`,
    data: process.env.NODE_ENV === 'development' ? { otp } : {} 
  });
});

exports.getPrivateAnalytics = catchAsync(async (req, res, next) => {
  // This is a practice route for JWT private access to analytics
  res.status(200).json({
    success: true,
    message: 'Access granted to private analytics',
    data: {
      user: req.user.name,
      role: req.user.role,
      accessedAt: new Date(),
      stats: {
        totalRequests: 150,
        averageResponseTime: '45ms',
        activeSessions: 12
      }
    }
  });
});
