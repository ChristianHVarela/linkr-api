import { Router } from "express";
import { getUser, searchUser } from "../controllers/users.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/user/:id", authMiddleware, getUser);
router.post("/user", authMiddleware, searchUser);

export default router;