import { Router } from "express";
import * as Controller from "../controllers/accountController";
import { auth } from "../middleware/auth";
import validate from "../middleware/validation";
import { amount } from "../validationSchema/account";

const router = Router();

router.post("/create", auth, Controller.create);
router.post("/update", auth, validate(amount), Controller.update);

export default router;
