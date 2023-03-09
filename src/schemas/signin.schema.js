import joi from 'joi';

const signinSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export default signinSchema;