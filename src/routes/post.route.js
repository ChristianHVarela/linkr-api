import { Router } from "express";
import { validateSchema } from "../middlewares/schemma.validator";
import { postSchemma } from "../schemas/post.shemma.js";


const postRouter = Router()

postRouter.post('/posts', validateSchema(postSchemma), createPost)