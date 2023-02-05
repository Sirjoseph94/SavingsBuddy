import { Router } from "express";
import { auth } from "../middleware/auth";
import * as Controller from "../controllers/plansController";
import validate from "../middleware/validation";
import { createPlans } from "../validationSchema/plans";

const router = Router();

router.get("/", auth, Controller.getPlans);
router.post("/", auth, validate(createPlans), Controller.createPlan);

export default router;
