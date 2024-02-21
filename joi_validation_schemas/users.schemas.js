const Joi = require('joi');
const genderEnum = require('../enums/gender.enum');

const UserCreateSchema = Joi.object({
    phoneNumber: Joi.string()
        .pattern(/^\+380\d{9}$/)
        .required(),

    firstName: Joi.string()
        .min(2)
        .max(60),

    lastName: Joi.string()
        .min(2)
        .max(60),

    email: Joi.string()
        .email()
        .required(),

    birthDate: Joi.date(),

    gender: Joi.string()
        .valid(...Object.values(genderEnum)),

    password: Joi.string()
        .required()
        .min(6)
        .max(10),
});

const UserUpdateSchema = Joi.object({
    phoneNumber: Joi.string()
        .pattern(/^\+380\d{9}$/),

    firstName: Joi.string()
        .min(2)
        .max(60),

    lastName: Joi.string()
        .min(2)
        .max(60),

    email: Joi.string()
        .email(),

    birthDate: Joi.date(),

    gender: Joi.string()
        .valid(...Object.values(genderEnum)),
});

module.exports = {
    UserCreateSchema,
    UserUpdateSchema,
};