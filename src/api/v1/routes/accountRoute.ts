import { Router } from "express";
import * as Controller from "../controllers/userController";
import { auth } from "../middleware/auth";

const router = Router();

router.post("/create", auth, Controller.signIn);


export default router;
