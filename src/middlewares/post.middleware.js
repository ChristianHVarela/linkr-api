import { findPostById } from "../repositories/post.repository"

export const authorizePost = async (req, res, next) => {
    const { id } = req.params;
    try{
        const { rows:post } = await findPostById(id)
        if (post.length === 0) return res.sendStatus(404)
        const postUser = post[0].user_id
        const userId = res.locals.user.id
        if (postUser !== userId) return res.sendStatus(401)
        next()
    } catch (err) {
		console.log(err);
		res.sendStatus(500);
	}
}