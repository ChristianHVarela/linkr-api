import { Router } from "express";
import { createPost, deletePost, dislikePost, editPost, getPosts, likePost } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { authorizePost } from "../middlewares/post.middleware.js";
import { validateSchema } from "../middlewares/schema.validator.js";
import { editSchema } from "../schemas/edit.schema.js";
import { postSchema } from "../schemas/post.shema.js";


export const postRouter = Router()


postRouter.post('/posts', authMiddleware, validateSchema(postSchema), createPost)
postRouter.get('/timeline', authMiddleware, getPosts)
postRouter.delete('/posts/:id', authMiddleware, authorizePost, deletePost)
postRouter.put('/posts/:id', validateSchema(editSchema), authMiddleware, authorizePost, editPost)
postRouter.get('/posts/likes/:id', authMiddleware, likePost);
postRouter.delete('/posts/likes/:id', authMiddleware, dislikePost);