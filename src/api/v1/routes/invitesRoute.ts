import { Router } from "express";
import { auth } from "../middleware/auth";
import * as Controller from "../controllers/invitesController";
import validate from "../middleware/validation";
import {
  confirmInviteSchema,
  sendInviteSchema,
} from "../validationSchema/invites";

const router = Router();

router.get("/", auth, Controller.getAll);
router.get("/:inviteId", auth, Controller.view);
router.post("/", auth, validate(sendInviteSchema), Controller.create);
router.patch("/:inviteId", auth, validate(confirmInviteSchema), Controller.confirm);

export default router;
