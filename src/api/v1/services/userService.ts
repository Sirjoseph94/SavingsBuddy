import db from "../config/dbClient";
import { generateAccessToken } from "../utils/generateToken";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import { registerSchema } from "../validationSchema/user";

export const signIn = async (email: string, password: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw {
        statusCode: 404,
        message: `We have no record of the email ${email}, please sign up`,
      };
    }
    const match = await decryptPassword(password, user.password);
    if (!match) {
      throw { statusCode: 403, message: "Password is not correct, try again" };
    }
    return {
      statusCode: 200,
      message: { token: generateAccessToken(user.id) },
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: { "Internal Server Error": error },
    };
  }
};

export const register = async (payload: registerSchema) => {
  const user = await db.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (user) {
    throw {
      statusCode: 400,
      message: `User with the email ${user.email} already exist, kindly sign in`,
    };
  }
  const response = await db.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: (await encryptPassword(payload.password)) as string,
    },
  });

  return {
    statusCode: 200,
    message: { token: generateAccessToken(response.id) },
  };
};
