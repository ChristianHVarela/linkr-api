import { Router } from "express";
import { signup } from "../controllers/signup.controller.js";
import { validateSchema } from "../middlewares/schemma.validator.js";
import signupSchema from "../schemas/signup.schema.js";

const signupRouter = Router();

signupRouter.post('/signup', validateSchema(signupSchema), signup);

export default signupRouter;