const Joi = require('joi');

const createValidate = Joi.object({
  name: Joi.string()
    .empty('')
    .min(3)
    .max(30)
    .required()
    .messages({
      'string.base': `Invalid name`,
      'any.required': `Need to enter enough information`,
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
    .required()
    .messages({
      'string.base': `Invalid email`,
      'any.required': `Need to enter enough information`,
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
    .regex(/^[ A-Za-z0-9]+$/)
    .required(),

  phone: Joi.string()
    .length(10).pattern(/^[0-9]+$/)
    .required(),

  status: Joi.string()
    .valid('active', 'inactive')
    .required()
})

module.exports = {
  createValidate,
  updateValidate,
};

