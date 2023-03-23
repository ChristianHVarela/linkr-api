import { Router } from "express";
import { PostComment } from "../controllers/comments.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/schema.validator.js";
import commentSchema from "../schemas/comments.schema.js";

const commentsRouter = Router();

commentsRouter.post('/posts/:id/comments', authMiddleware, validateSchema(commentSchema), PostComment);

export default commentsRouter;