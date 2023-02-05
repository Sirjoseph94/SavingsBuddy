import db from "../config/dbClient";

export const createAccount = async (userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.isVerified) {
    throw {
      statusCode: 401,
      message: "Please verify your email to create an account",
    };
  }
  const exist = await db.account.findFirst({
    where: {
      userId,
    },
  });
  if (exist) {
    throw {
      statusCode: 400,
      message: "You already have an account",
    };
  }
  const response = await db.account.create({
    data: {
      userId,
    },
  });
  return {
    statusCode: 201,
    message: { "account created": response },
  };
};
