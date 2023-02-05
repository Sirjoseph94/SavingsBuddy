import { Router } from "express";
import { auth } from "../middleware/auth";
import * as Controller from "../controllers/plansController";

const router = Router();

router.post("/", auth, Controller.getPlans);

export default router;
