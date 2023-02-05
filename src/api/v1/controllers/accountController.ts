import { Response } from "express";
import * as Service from "../services/accountService"
import { userRequest } from "../interface/express";
import { failed, success } from "../utils/responseFormat";

export const create = async (req: userRequest, res: Response) => {
  try {
    const {user_id} = req.user
    const response = await Service.createAccount(user_id)
    return success(res, response.statusCode, response.message);
  } catch (error:any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
}

export const update = async (req: userRequest, res: Response) => {
  try {
    const {user_id} = req.user
    const {amount} = req.body
    const response = await Service.updateAccount(user_id, amount)
    return success(res, response.statusCode, response.message);
  } catch (error:any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
}