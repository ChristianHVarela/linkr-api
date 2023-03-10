import { Router } from "express";
import { getUser, searchUser } from "../controllers/users.controller.js";

const router = Router();
router.get("/user/data/:id")
router.get("/user/:id", getUser);
router.post("/user", searchUser);

export default router;