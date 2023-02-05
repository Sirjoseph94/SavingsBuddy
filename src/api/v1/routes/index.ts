import { Router } from "express";
import userRoute from "./userRoute";
import accountRoute from "./accountRoute"

const Routes = (app: Router) => {
  app.use("/api/v1/user", userRoute);
  app.use("/api/v1/account", accountRoute)
};

export default Routes;
