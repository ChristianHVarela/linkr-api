import joi from 'joi';

const signupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().required(),
    image: joi.string().uri().required()
});

export default signupSchema;