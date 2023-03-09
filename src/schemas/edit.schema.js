import Joi from "joi";

export const editSchema = Joi.object({
    description: Joi.string().required()
})