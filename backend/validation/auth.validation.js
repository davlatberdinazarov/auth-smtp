const Joi = require('joi');

const registerStep1Schema = Joi.object({
    fullName: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Full name must be a string',
        'string.empty': 'Full name cannot be empty',
        'string.min': 'Full name must be at least 3 characters long',
        'string.max': 'Full name must be at most 30 characters long',
        'any.required': 'Full name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6).max(30).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.pattern.name': 'Password must contain only alphanumeric characters',
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be at most 30 characters long',
        'any.required': 'Password is required'
    })

});
const registerStep2Schema = Joi.object({
    fullName: Joi.string().min(3).max(30).required().messages({
        'string.base': 'Full name must be a string',
        'string.empty': 'Full name cannot be empty',
        'string.min': 'Full name must be at least 3 characters long',
        'string.max': 'Full name must be at most 30 characters long',
        'any.required': 'Full name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6).max(30).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.pattern.name': 'Password must contain only alphanumeric characters',
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be at most 30 characters long',
        'any.required': 'Password is required'
    }),
    code: Joi.string().length(6).required().messages({
        'string.base': 'Code must be a string',
        'string.empty': 'Code cannot be empty',
        'string.length': 'Code must be exactly 6 characters long',
        'any.required': 'Code is required'
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': 'Email must be a string',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6).max(30).messages({
        'string.base': 'Password must be a string',
        'string.empty': 'Password cannot be empty',
        'string.pattern.name': 'Password must contain only alphanumeric characters',
        'string.min': 'Password must be at least 6 characters long',
        'string.max': 'Password must be at most 30 characters long',
        'any.required': 'Password is required'
    })
});

module.exports = {
    registerStep1Schema,
    registerStep2Schema,
    loginSchema
};