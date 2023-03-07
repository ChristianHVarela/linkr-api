import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { validateSchema } from "../middlewares/schemma.validator.js";
import { postSchemma } from "../schemas/post.shemma.js";


export const postRouter = Router()

postRouter.post('/posts', validateSchema(postSchemma), createPost)