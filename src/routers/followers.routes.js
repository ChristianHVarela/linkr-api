import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import followersSchema from "../schemas/followers.schema.js";
import { validateSchema } from "../middlewares/schema.validator.js";
import { toogleFollow } from "../controllers/followers.controller.js";

const router = Router()
router.post('/followers', authMiddleware, validateSchema(followersSchema), toogleFollow)

export default router