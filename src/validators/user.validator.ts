import * as Joi from "joi";

export const createUserSchema = Joi.object({
    first_name: Joi.string()
        .required()
        .min(1)
        .trim(),
    middle_name: Joi.string()
        .min(1)
        .trim(),
    last_name: Joi.string()
        .required()
        .min(1)
        .trim(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
        })
        .required(),
    password: Joi.string()
        .required(),
    dob: Joi.date()
        .less(Date.now())
        .required(),
    gender: Joi.string()
        .valid("male", "female")
        .required(),
    phone_number: Joi.string()
        .required(),
    address: Joi.string()
        .required(),
    role: Joi.string()
        .valid('patient', 'provider', 'admin', 'super admin')
        .default('patient'),
    notes: Joi.string()
        .required()
})