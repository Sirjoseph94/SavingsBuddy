import z from "zod";

export const sendInviteSchema = z.object({
  body: z.object({
    buddyEmail: z
      .string({
        required_error: "Buddy's email is required",
      })
      .email(),
    planId: z.string({
      required_error: "PlanId is required",
    }),
  }),
});
