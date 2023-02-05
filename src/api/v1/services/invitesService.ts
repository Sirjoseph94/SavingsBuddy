import { CONSTANTS } from "../config/CONSTANTS";
import db from "../config/dbClient";
import sendMail from "../utils/sendMail";

export const sendInvite = async (
  userId: string,
  buddyId: string,
  planId: string
) => {
  const plan = await db.plan.findUnique({
    where: {
      id: planId,
    },
    include: {
      buddies: true,
    },
  });
  const buddy = await db.user.findUnique({ where: { id: buddyId } });
  if (!buddy) {
    throw {
      statusCode: 404,
      message:
        "Buddy not found, ask them to register on the platform to join you to save",
    };
  }
  if (!plan) {
    throw {
      statusCode: 404,
      message: "Plan does not exist, create a plan",
    };
  }
  if (plan.buddies.length < 5) {
    await db.invites.create({
      data: {
        planId,
        buddyId,
        isAccepted: false,
      },
    });
    const { BASE_URL, PORT } = CONSTANTS;
    const planLink = `http://${BASE_URL}:${PORT}/api/v1/plans/${planId}`;

    sendMail({
      email: buddy.email,
      subject: `${plan.name} - SavingsBuddy`,
      message: `
      Hi <b>${buddy.name}</b>
    
      <p>Your buddy invited you to join ${plan.name} Savings plan. <br>
      Please click <a href="${planLink}">here</a> to view.</p>          
      `,
    });
    return {
      statusCode: 201,
      message: `${buddy.name} has been invited.`,
    };
  }
};
