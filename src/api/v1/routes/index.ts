import { Router } from "express";
import userRoute from "./userRoute";

export default (app: Router) => {
  app.use("/api/v1/user", userRoute);
};
