import { Router } from "express";
import validate from "../middleware/validation";
import { register, signIn } from "../validationSchema/user";
import * as Controller from "../controllers/userController";

const router = Router();

router.post("/signin", validate(signIn), Controller.signIn);
router.post("/register", validate(register), Controller.register);
router.get("/verify/:token", Controller.verify);

export default router;
