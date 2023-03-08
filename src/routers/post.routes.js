import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { validateSchema } from "../middlewares/schema.validator.js";
import { postSchema } from "../schemas/post.shema.js";


export const postRouter = Router()

postRouter.post('/posts', validateSchema(postSchema), createPost)