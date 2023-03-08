import { Router } from "express";
import { getHashtag, getTrending } from "../controllers/hashtags.controller.js";

const router = Router();
router.get("/trending", getTrending);
router.get("/hashtag/:hashtag", getHashtag);

export default router;
