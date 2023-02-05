import z from "zod";

export const amount = z.object({
  body: z.object({
    amount: z.number({
      required_error: "Amount is required",
    }),
  }),
});
