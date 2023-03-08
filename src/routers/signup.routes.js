import { Router } from "express";
import { signup } from "../controllers/signup.controller.js";
import { validateSchema } from "../middlewares/schema.validator.js";
import SignupSchema from "../schemas/signup.schema.js";

const signupRouter = Router();

signupRouter.post('/signup', validateSchema(SignupSchema), signup);

export default signupRouter;