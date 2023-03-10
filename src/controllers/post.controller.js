import { addHashtag, deleteHashtags } from "../repositories/hashtags.repository.js";
import { deletePostById, getPostsOrderByCreatedAtDesc, insertPost, updatePostById } from "../repositories/post.repository.js";
import urlMetadata from 'url-metadata'
import { insertMetada } from "../repositories/metadata.repository.js";
import { getLikes } from "../repositories/likes.repository.js";

export const createPost = async (req, res) => {
    const { link, description } = req.body
    const hashtags = extractHashtags(description)
    try {
        const user = res.locals.user
        const post = await insertPost(user.id, link, description)
        hashtags.forEach(async (hashtag) => {
            await addHashtag(hashtag, post.rows[0].id)
        })
        const metadata = await urlMetadata(link)
        await insertMetada(metadata.title, metadata.description, metadata.image, post.rows[0].id)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error)
    }
    return res.status(201).send()
}

export const getPosts = async (_, res) => {
    let posts = []
    let body = []
    const userId = res.locals.user.id
    try {
        const postsResult = await getPostsOrderByCreatedAtDesc(userId)
        const { rows:likes } = await getLikes(userId)
        if (postsResult.rowCount > 0){
            posts = [...postsResult.rows]
            body = buildBody(posts, likes)
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send()
    }
    return res.send(body);
}

export const buildBody = (post, likes) =>{
    const likesMap = new Map();
    likes.forEach((like) => likesMap.set(like.id, likes));
    const body = [];
    post.forEach((post) => {
    let like;
    try{
        like = likesMap.get(post.id)[0];
    } catch(e){
        like = { likes: [], liked_by_me:false }
    }
    body.push({ ...post, ...like });
    });
    return body;
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