import { Request, Response } from "express";
import * as Service from "../services/userService";
import { registerSchema, userSignIn } from "../validationSchema/user";
import { failed, success } from "../utils/responseFormat";

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password }: userSignIn = req.body;
    const response = await Service.signIn(email, password);
    return success(res, response.statusCode, response.message);
  } catch (error: any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const payload: registerSchema = req.body;
    const response = await Service.register(payload);
    return success(res, response.statusCode, response.message);
  } catch (error:any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
};
