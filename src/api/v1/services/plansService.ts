import db from "../config/dbClient";
import { createPlansType } from "../validationSchema/plans";

export const getPlans = async (userId: string) => {
  const response = await db.account.findMany({
    where: {
      userId,
    },
    select: {
      user: true,
      balance: true,
      plans: true,
    },
  });
  if (!response) {
    throw {
      statusCode: 404,
      message: "Record not found",
    };
  }
  return {
    statusCode: 200,
    message: response,
  };
};

export const createPlan = async (payload: createPlansType, id: string) => {
  const user = await db.user.findUnique({
    where: { id },
    include: {
      account: true,
    },
  });
  if (!user?.account) {
    throw {
      statusCode: 404,
      message: "user does not have an account",
    };
  }
  const response = await db.plan.create({
    data: {
      name: payload.name,
      target: payload.target,
      saving_frequency: payload.saving_frequency,
      current_balance: 0,
      start_date: payload.start_date,
      end_date: payload.end_date,
      hostId: user.id,
      accountId: user.account.id,
    },
  });
  return {
    statusCode: 201,
    message: response,
  };
};
