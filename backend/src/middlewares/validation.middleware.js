const Joi = require('joi');
const AppError = require('../utils/AppError');

const earthquakeSchema = Joi.object({
  id: Joi.string().optional().allow(''),
  time: Joi.date().iso().required(),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  depth: Joi.number().min(0).max(1000).required(),
  mag: Joi.number().min(0).max(10).required(),
  magType: Joi.string().valid('mb', 'ml', 'ms', 'mw', 'md', 'mh', 'mblg', 'mb_lg', 'mc', 'mwr', 'mww', 'mwb', 'mwc', 'mi', 'mlv', 'mfa').optional().allow(''),
  place: Joi.string().required(),
  type: Joi.string().valid('earthquake', 'quarry', 'explosion', 'landslide', 'icequake', 'other').optional().allow(''),
  status: Joi.string().valid('reviewed', 'automatic', 'deleted').optional().allow(''),
  net: Joi.string().optional().allow(''),
  rms: Joi.number().optional().allow(''),
  gap: Joi.number().optional().allow(''),
  magError: Joi.number().optional().allow(''),
  nst: Joi.string().optional().allow(''),
  magNst: Joi.number().optional().allow(''),
  horizontalError: Joi.number().optional().allow(''),
  depthError: Joi.number().optional().allow(''),
  dmin: Joi.number().optional().allow(''),
  country: Joi.string().optional().allow(''),
  locationSource: Joi.string().optional().allow(''),
  magSource: Joi.string().optional().allow('')
});

exports.validateEarthquake = (req, res, next) => {
  const { error } = earthquakeSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));
  next();
};

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('user', 'admin', 'moderator')
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

exports.validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));
  next();
};

exports.validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(error.details[0].message, 400));
  next();
};
