import Joi from "joi";

export const postSchemma = Joi.object({
    link: Joi.string().uri().required(),
    description: Joi.string().required()
})