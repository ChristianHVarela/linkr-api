import { Router } from "express";
import { getHashtag, getTrending } from "../controllers/hashtags.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/trending", authMiddleware, getTrending);
router.get("/hashtag/:hashtag", authMiddleware, getHashtag);

export default router;
