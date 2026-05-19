const Joi = require('joi');

const earthquakeSchema = Joi.object({
  id: Joi.string().required(),
  time: Joi.date().iso().required(),
  updated: Joi.date().iso(),
  place: Joi.string().required(),
  type: Joi.string().valid('earthquake', 'quarry', 'explosion', 'landslide', 'icequake', 'other'),
  latitude: Joi.number().min(-90).max(90).required(),
  longitude: Joi.number().min(-180).max(180).required(),
  depth: Joi.number().min(0).max(1000).required(),
  mag: Joi.number().min(0).max(10).required(),
  magType: Joi.string().valid('mb', 'ml', 'ms', 'mw', 'md', 'mh', 'mblg', 'mb_lg', 'mc', 'mwr', 'mww', 'mwb', 'mwc', 'mi', 'mlv', 'mfa'),
  magError: Joi.number(),
  magNst: Joi.number(),
  horizontalError: Joi.number(),
  depthError: Joi.number(),
  nst: Joi.string(),
  gap: Joi.number(),
  dmin: Joi.number(),
  rms: Joi.number(),
  net: Joi.string(),
  locationSource: Joi.string(),
  magSource: Joi.string(),
  status: Joi.string().valid('reviewed', 'automatic', 'deleted')
});

const earthquakeUpdateSchema = earthquakeSchema.fork(
  ['id', 'time', 'place', 'latitude', 'longitude', 'depth', 'mag'],
  (schema) => schema.optional()
);

module.exports = { earthquakeSchema, earthquakeUpdateSchema };
