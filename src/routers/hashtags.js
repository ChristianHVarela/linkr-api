import { Router } from "express";
import { getTrending } from "../controllers/hashtagsController.js";

const router = Router();
router.get("/trending", getTrending);

export default router;
