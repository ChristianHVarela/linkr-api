import { getCommentsByPost, postCommentQuery } from "../repositories/comments.repository.js";
import { findPostById } from "../repositories/post.repository.js";

export async function PostComment(req, res) {
    const { comment } = req.body;
    const { id: userId } = res.locals.user;
    const { id: postId } = req.params;

    if (isNaN(postId)) return res.sendStatus(401);

    try
    {
        const { rows:post } = await findPostById(postId);
        if (post.length === 0) return res.status(404).send("post not found");
        await postCommentQuery(userId, postId, comment);
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}

export async function GetComments(req, res) {
    const { id: userId } = res.locals.user;
    const { id: postId } = req.params;

    if (isNaN(postId)) return res.sendStatus(401);

    try {
        const { rows: comments } = await getCommentsByPost(userId, postId);
        res.status(200).send(comments);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
}