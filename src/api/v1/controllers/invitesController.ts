import { Response } from "express";
import * as Service from "../services/invitesService";
import { userRequest } from "../interface/express";
import { failed, success } from "../utils/responseFormat";

export const create = async (req: userRequest, res: Response) => {
  try {
    const { user_id } = req.user;
    const { buddyEmail, planId } = req.body;
    const response = await Service.sendInvite(user_id, buddyEmail, planId);
    return success(res, response.statusCode, response.message);
  } catch (error: any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
};

export const view = async (req: userRequest, res: Response) => {
  try {
    const { user_id } = req.user;
    const { inviteId } = req.params;
    const response = await Service.viewInvite(user_id, inviteId);
    return success(res, response.statusCode, response.message);
  } catch (error: any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
};
export const confirm = async (req: userRequest, res: Response) => {
  try {
    const { user_id } = req.user;
    const { inviteId } = req.params;
    const { feedback } = req.body;
    const response = await Service.confirm(user_id, inviteId, feedback);
    return success(res, response.statusCode, response.message);
  } catch (error: any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
};
export const getAll = async (req: userRequest, res: Response) => {
  try {
    const { user_id } = req.user;
    const response = await Service.allInvites(user_id);
    return success(res, response.statusCode, response.message);
  } catch (error: any) {
    console.error(error);
    return failed(res, error.statusCode, error.message);
  }
};
