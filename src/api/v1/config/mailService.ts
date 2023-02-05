import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: process.env.MAILER_PORT as unknown as number,
  // service: "gmail",
  auth: {
    // type: "OAuth2",
    user: process.env.MAILER_USERNAME,
    pass: process.env.MAILER_PASSWORD,
    // clientId: process.env.OAUTH_CLIENTID,
    // clientSecret: process.env.OAUTH_CLIENT_SECRET,
    // refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

export default transporter;
