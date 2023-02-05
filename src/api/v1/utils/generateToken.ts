import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

export function generateAccessToken(id: string) {
  const key = process.env.AUTH_SECRET as string;
  const token = jwt.sign({ user_id: id }, key, {
    expiresIn: "24h",
  });
  return token;
}
