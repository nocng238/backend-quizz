const Joi = require('joi');

const createUserValidate = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be less than 30 characters',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
    'string.email': 'Email address is wrong format',
  }),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, { name: 'phone' })
    .empty('')
    .min(10)
    .messages({
      'string.min': 'Phone must be at least 10 characters',
      'string.pattern.name': 'Phone is wrong format',
    }),
});

const updateUserValidate = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be less than 30 characters',
  }),
  email: Joi.string(),
  status: Joi.string(),
  phone: Joi.string()
    .pattern(/^[0-9]+$/, { name: 'phone' })
    .empty('')
    .min(10)
    .messages({
      'string.min': 'Phone must be at least 10 characters',
      'string.pattern.name': 'Phone is wrong format',
    }),
});

module.exports = {
  createUserValidate,
  updateUserValidate,
};
