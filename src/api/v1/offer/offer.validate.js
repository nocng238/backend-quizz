const Joi = require('joi');

const createOffersValidate = Joi.object({
  cvs: Joi.array().items(Joi.object()).min(1).required().messages({
    'array.base': 'Need to receive an array of CV ids',
    'array.min': 'Need to enter at least one CV id',
    'any.required': 'Need to enter an array of CV ids',
  }),
  content: Joi.string().empty('').required().messages({
    'string.base': 'Invalid offer',
    'any.required': 'Need to enter offer',
  }),
  startDate: Joi.date().empty('').required().messages({
    'date.base': 'Invalid date time',
    'any.required': 'Need to enter date time',
  }),
});

module.exports = { createOffersValidate };
