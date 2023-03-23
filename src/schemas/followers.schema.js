import Joi from 'joi'

const followersSchema = Joi.object({
    follower_id: Joi.number().required()
})

export default followersSchema