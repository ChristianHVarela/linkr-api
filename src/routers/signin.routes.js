import { Router } from "express";
import { signin } from "../controllers/signin.controller.js";
import { validateSchema } from "../middlewares/schema.validator.js";
import signinSchema from "../schemas/signin.schema.js";



const signinRouter = Router();

signinRouter.post('/', validateSchema(signinSchema), signin);

export default signinRouter;