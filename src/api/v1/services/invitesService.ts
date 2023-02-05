import { CONSTANTS } from "../config/CONSTANTS";
import db from "../config/dbClient";
import sendMail from "../utils/sendMail";

export const sendInvite = async (
  userId: string,
  buddyEmail: string,
  planId: string
) => {
  const buddy = await db.user.findUnique({ where: { email: buddyEmail } });
  if (!buddy) {
    throw {
      statusCode: 404,
      message:
        "Buddy not found, ask them to register on the platform to join you to save",
    };
  }
  const plan = await db.plan.findFirst({
    where: {
      id: planId,
    },
    include: {
      buddies: true,
    },
  });

  if (!plan) {
    throw {
      statusCode: 404,
      message: "Plan does not exist, create a plan",
    };
  }
  if (plan.hostId !== userId) {
    throw {
      statusCode: 401,
      message: "You are not authorized to perform this operation",
    };
  }
  if (plan.buddies.length < 5) {
    await db.invites.create({
      data: {
        planId,
        buddyId: buddy.id,
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
