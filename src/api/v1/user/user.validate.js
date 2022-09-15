const Joi = require('joi');

const {
  STATUS_OPTIONS,
  NAME_VALIDATE_REGEX,
  PHONE_VALIDATE_REGEX,
} = require('../../../constants/User');

const createValidate = Joi.object({
  name: Joi.string().empty('').min(3).max(30).required().messages({
    'string.base': `Invalid name`,
    'any.required': `Need to enter name information`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
    .required()
    .messages({
      'string.base': `Invalid email`,
      'any.required': `Need to enter email information`,
      'string.email': `Invalid email`,
    }),
  phone: Joi.number()
    .min(10)
    .integer()
    .messages({ 'string.base': `phone must be number` }),
});

const updateValidate = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(NAME_VALIDATE_REGEX)
    .required()
    .messages({
      'string.base': `Invalid name`,
      'string.min': `"name" length must be at least 3 characters long`,
      'string.max': `"name" length must be at less than 30 characters long`,
      'object.regex': `"name" fails to match the required pattern: /^[ A-Za-z0-9]+$/`,
      'any.required': `"name" is not allowed to be empty`,
    }),

  phone: Joi.string()
    .length(10)
    .pattern(PHONE_VALIDATE_REGEX)
    .required()
    .messages({
      'string.base': `Invalid phone`,
      'string.length': `"phone" length must be 10 characters long`,
      'object.regex': `"name" fails to match the required pattern: /^[0-9]+$/`,
      'any.required': `"phone" is not allowed to be empty`,
    }),

  status: Joi.string()
    .valid(...STATUS_OPTIONS)
    .required()
    .messages({
      'string.base': `Invalid status`,
      'object.valid': `"status" must be one of [active, inactive]`,
      'any.required': `"status" is not allowed to be empty`,
    }),
});

module.exports = {
  createValidate,
  updateValidate,
};
