import { Router } from "express";
import userRoute from "./userRoute";

const Routes = (app: Router) => {
  app.use("/api/v1/user", userRoute);
};

export default Routes;
