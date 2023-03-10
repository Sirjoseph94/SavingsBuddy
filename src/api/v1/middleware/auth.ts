import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Response, NextFunction } from "express";
import db from "../config/dbClient";
import { userRequest } from "../interface/express";

dotenv.config();
const key = process.env.AUTH_SECRET as string;
export async function auth(
  req: userRequest,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization)
    return res.status(401).json({ error: "Access Denied, no token Provided" });
  try {
    const token = authorization.slice(7, authorization.length);
    const decoded = jwt.verify(token, key);
    if (!decoded) {
      return res.status(401).send("Unauthorized");
    }

    const { user_id } = decoded as { [key: string]: string };
    const user = await db.user.findUnique({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      return res.status(401).send("please register to access our service");
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json(error);
  }
}
