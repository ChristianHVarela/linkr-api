import joi from 'joi';

const commentSchema = joi.object({
    comment: joi.string().min(1).max(255).required()
});

export default commentSchema;