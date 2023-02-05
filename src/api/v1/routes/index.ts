import { Router } from "express";
import userRoute from "./userRoute";
import accountRoute from "./accountRoute";
import plansRoute from "./plansRoute";
import inviteRoute from "./invitesRoute";

const Routes = (app: Router) => {
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/account", accountRoute);
  app.use("/api/v1/plans", plansRoute);
  app.use("/api/v1/invite", inviteRoute);
};

export default Routes;
