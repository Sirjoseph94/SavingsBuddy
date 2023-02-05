import transporter from "../config/mailService";

type body = {
  email: string;
  subject: string;
  message: string;
};

async function sendMail(data: body) {
  const { email, subject, message } = data;
  const body = {
    from: "hi@savingbuddy.com",
    to: email,
    subject: subject,
    html: message
  };
  try {
   return transporter.sendMail(body);
  } catch (error) {
    console.error(error);
    return
  }
}

export default sendMail;
