import { Router } from "express";
import { createPost, deletePost, getPosts } from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/schema.validator.js";
import { postSchema } from "../schemas/post.shema.js";


export const postRouter = Router()

postRouter.post('/posts', validateSchema(postSchema), createPost)
postRouter.get('/timeline', getPosts)
postRouter.delete('/posts/:id', authMiddleware, deletePost)	