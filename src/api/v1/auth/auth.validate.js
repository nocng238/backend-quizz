const Joi = require('joi');

const { PASSWORD_VALIDATE_REGEX } = require('../../../constants/Auth');

const loginValidate = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Please enter your email address',
    'string.empty': 'Please enter your email address',
    'string.email': 'Email address is wrong format',
  }),
  password: Joi.string().min(8).max(30).required().messages({
    'any.required': 'Please enter your password',
    'string.empty': 'Please enter your password',
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password must be less than 30 characters',
  }),
});

const mailValidate = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
    .required()
    .messages({
      'string.empty': `Need to enter enough information`,
      'string.base': `Invalid email`,
      'any.required': `Need to enter enough information`,
      'string.email': `Invalid email`,
    }),
});

const changePassValidate = Joi.object({
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .pattern(new RegExp(PASSWORD_VALIDATE_REGEX))
    .messages({
      'string.max': `Password Characters whose length exceeds 30`,
      'string.min': `Password characters less than 8`,
      'any.required': `Need to enter enough information`,
      'string.empty': `Need to enter enough information`,
      'string.pattern.base': `Password contains at least one number and one special character`,
    }),

  confirmedPassword: Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .messages({
      'any.only': 'Confirmed password must match password',
      'any.required': `Need to enter enough information`,
    }),
});

module.exports = {
  loginValidate,
  mailValidate,
  changePassValidate,
};
