const Joi = require('joi');

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
const passwordValidate = Joi.object({
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .pattern(
      new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/)
    )
    .messages({
      'string.max': `Password Characters whose length exceeds 30`,
      'string.min': `Password characters less than 8`,
      'any.required': `Need to enter enough information`,
      'string.empty': `Need to enter enough information`,
      'string.pattern.base': `Password contains at least one number and one special character`,
    }),
});

module.exports = {
  mailValidate,
  passwordValidate,
};
