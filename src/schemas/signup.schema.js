import joi from 'joi';

const SignupSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
    name: joi.string().required(),
    image: joi.string().uri().required()
});

export default SignupSchema;