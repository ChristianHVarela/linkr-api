import { insertPost } from "../repositories/post.repository.js";

export const createPost = (req, res) => {
    const { link, description } = req.body
    try {
        insertPost(1, link, description)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
    return res.status(201).send()
}