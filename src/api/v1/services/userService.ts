import { CONSTANTS } from "../config/CONSTANTS";
import db from "../config/dbClient";
import { generateAccessToken } from "../utils/generateToken";
import { decryptPassword, encryptPassword } from "../utils/hashPassword";
import sendMail from "../utils/sendMail";
import { registerSchema } from "../validationSchema/user";
import jwt from "jsonwebtoken";

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
    throw {
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

  const token = generateAccessToken(response.id);
  const { BASE_URL, PORT } = CONSTANTS;
  const verifyLink = `http://${BASE_URL}:${PORT}/api/v1/user/verify/${token}`;

  sendMail({
    email: response.email,
    subject: "Registration Successful",
    message: `
      Hi <b>${response.name}</b>
    
      <p>Thank you for signing up to SavingBuddies
      Please click <a href="${verifyLink}">here</a> to verify your email.</p>          
      `,
  });
  return {
    statusCode: 200,
    message: { token, verified: response.isVerified },
  };
};

export const verifyEmail = async (token: string) => {
  const decoded = jwt.verify(token, process.env.AUTH_SECRET as string);
  const id = decoded as unknown as Record<string, string>;
  const user = await db.user.findUnique({ where: { id: id.user_id } });

  if (!user) {
    throw {
      statusCode: 404,
      message: "user not found",
    };
  }

  const response = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      isVerified: true,
    },
  });
  
  return { statusCode: 200, message: "User email has been verified and your account is created" };
};
