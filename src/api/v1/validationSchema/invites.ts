import z from "zod";

export const sendInviteSchema = z.object({
  body: z.object({
    buddyEmail: z
      .string({
        required_error: "Buddy's email is required",
      })
      .email(),
    inviteId: z.string({
      required_error: "PlanId is required",
    }),
  }),
});

export const confirmInviteSchema = z.object({
  body: z.object({
    feedback: z.boolean({
      required_error: "Accept the invite? true/false",
    }),
  }),
  params: z.object({
    inviteId: z.string({
      required_error: "PlanId is required",
    }),
  }),
});
