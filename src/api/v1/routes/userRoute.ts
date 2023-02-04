import { Router } from "express";
  import validate from "../middleware/validation";
  import { signIn } from "../validationSchema/user";
  import * as Controller from "../controllers/userController"

const router = Router()

router.get("/signin", validate(signIn), Controller.signIn)

export default router;