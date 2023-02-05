import { Response } from "express";
import * as Service from "../services/plansService";
import { userRequest } from "../interface/express";
import { failed, success } from "../utils/responseFormat";

export const getPlans = async (req: userRequest, res: Response) => {
  try {
    const { user_id } = req.user;
    const response = await Service.getPlans(user_id);
    return success(res, response.statusCode, response.message);
  } catch (error: any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
};

export const createPlan = async (req: userRequest, res: Response) => {
  try {
    const { user_id } = req.user;
    const payload = req.body;
    const response = await Service.createPlan(payload, user_id);
    return success(res, response.statusCode, response.message);
  } catch (error: any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
};
