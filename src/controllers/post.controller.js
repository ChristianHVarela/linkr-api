import { addHashtag, deleteHashtags } from "../repositories/hashtags.repository.js";
import { deletePostById, getPostsOrderByCreatedAtDesc, insertPost, updatePostById } from "../repositories/post.repository.js";

export const createPost = async (req, res) => {
    const { link, description } = req.body
    try {
        await insertPost(51, link, description)
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

function extractHashtags(str) {
    const regex = /#([\wÀ-ú]+)/gm;
    let matches = str.match(regex);
    if (matches) {
      return matches.map(match => match.slice(1));
    }
    return [];
  }

export const editPost = async (req, res) =>{
    const { id } = req.params;
    const { description } = req.body;
    const hashtags = extractHashtags(description);
    try{
        await deleteHashtags(id);
        hashtags.forEach(async (hashtag) => {
            await addHashtag(hashtag, id);
        });
        await updatePostById(id, description);
        return res.status(200).send();
    } catch(error){
        console.log(error);
        return res.status(500).send()
    }
}