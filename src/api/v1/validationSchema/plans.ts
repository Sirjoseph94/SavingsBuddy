import z from "zod";

export const createPlans = z.object({
  body: z
    .object({
      name: z.string({
        required_error: "Plan name is required",
      }),
      target: z
        .number({
          required_error: "Enter a savings target",
        })
        .optional(),
      saving_frequency: z.enum(["DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
      start_date: z.preprocess(arg => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),

      end_date: z.preprocess(arg => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      }, z.date()),
    })
    .refine(
      ({ start_date, end_date }) =>
        start_date < end_date && start_date >= new Date(),
      {
        message:
          "Start date must be before end date and Start date should be in the future",
      }
    ),
});

export type createPlansType = z.infer<typeof createPlans>["body"];
