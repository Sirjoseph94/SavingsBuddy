import { Router } from "express";
import userRoute from "./userRoute";
import accountRoute from "./accountRoute"
import plansRoute from "./plansRoute"

const Routes = (app: Router) => {
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/account", accountRoute)
  app.use("/api/v1/plans", plansRoute)
};

export default Routes;
