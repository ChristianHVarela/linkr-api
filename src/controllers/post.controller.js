import { deletePostById, getPostsOrderByCreatedAtDesc, insertPost } from "../repositories/post.repository.js";

export const createPost = async (req, res) => {
    const { link, description } = req.body
    try {
        await insertPost(1, link, description)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
    return res.status(201).send()
}

export const getPosts = async (req, res) => {
    let posts = []
    try {
        const postsResult = await getPostsOrderByCreatedAtDesc()
        console.log(postsResult);
        if (postsResult.rowCount > 0){
            posts = [...postsResult.rows]
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send()
    }
    return res.send(posts)
}

export const deletePost = async (req, res) =>{
    const { id } = req.params;
    try {
        await deletePostById(id)
        res.sendStatus(204)
    } catch (error) {
        console.log(error);
        return res.status(500).send()
    }
}