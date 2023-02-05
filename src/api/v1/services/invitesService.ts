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
    const invite = await db.invites.create({
      data: {
        planId,
        buddyId: buddy.id,
        isAccepted: false,
      },
    });
    const { BASE_URL, PORT } = CONSTANTS;
    const planLink = `http://${BASE_URL}:${PORT}/api/v1/invite/${invite.id}`;

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
  throw {
    statusCode: 400,
    message: "buddies invitations exceeded 5",
  };
};

export const viewInvite = async (userId: string, inviteId: string) => {
  const invite = await db.invites.findFirst({
    where: {
      id: inviteId,
      buddyId: userId,
    },
    include: {
      plan: true,
    },
  });
  if (!invite) {
    throw {
      statusCode: 404,
      message: "Invitation not found",
    };
  }
  return {
    statusCode: 200,
    message: invite,
  };
};

export const confirm = async (
  userId: string,
  inviteId: string,
  feedback: boolean
) => {
  const invitee = await db.invites.findFirst({
    where: { buddyId: userId, id: inviteId },
  });
  if (!invitee) {
    throw {
      statusCode: 401,
      message: "You are not authorized to perform this operation",
    };
  }
  const response = await db.invites.update({
    where: {
      id: inviteId,
    },
    include: {
      plan: true,
    },
    data: {
      isAccepted: feedback,
    },
  });
  if (response.isAccepted) {
    return {
      statusCode: 200,
      message: `You accepted to join ${response.plan}`,
    };
  }
  return {
    statusCode: 200,
    message: `You declined to join ${response.plan}`,
  };
};

export const allInvites = async (buddyId: string) => {
  const response = await db.invites.findMany({
    where: { buddyId },
    include: { plan: true },
  });
  return {
    statusCode: 200,
    message: response,
  };
};
