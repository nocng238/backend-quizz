const Joi = require('joi');

const mailValidate = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } })
    .required()
    .messages({
      'string.base': `Invalid email`,
      'any.required': `Need to enter enough information`,
      'string.email': `Invalid email`,
    }),
});

module.exports = {
  mailValidate,
};
