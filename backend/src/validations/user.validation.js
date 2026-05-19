const Joi = require('joi');

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50),
  preferences: Joi.object({
    theme: Joi.string().valid('light', 'dark'),
    notifications: Joi.boolean(),
    itemsPerPage: Joi.number().min(5).max(100)
  })
});

const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(6).required()
});

module.exports = { updateProfileSchema, changePasswordSchema };
