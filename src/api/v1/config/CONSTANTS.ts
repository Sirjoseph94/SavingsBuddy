import dotenv from "dotenv";
dotenv.config();

type constants = {
  BASE_URL: string;
  PORT: string | number;
};

export const CONSTANTS: constants = {
  BASE_URL: process.env.BASE_URL || "localhost",
  PORT: process.env.PORT || 3000,
};
