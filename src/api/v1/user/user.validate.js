const Joi = require('joi');

const generateUsername = (parent, helpers) => {

    return parent.firstname.toLowerCase() + '-' + parent.lastname.toLowerCase();
};
const CteateValidate = Joi.object({
    username: Joi.string().empty('')
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }).required(),

    phone: Joi.number().min(10).integer()

})


module.exports = {
    CteateValidate
}

