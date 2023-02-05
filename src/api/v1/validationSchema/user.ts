import z from "zod";

export const register = z.object({
  body: z
    .object({
      email: z
        .string({
          required_error: "Email is required",
        })
        .email("Not a valid email"),
      name: z.string({
        required_error: "Name is required",
      }),
      password: z
        .string({
          required_error: "Enter valid password",
        })
        .min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string({
        required_error: "Confirm password is required"
      }).min(6),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
        });
      }
    }),
});

export type registerSchema = z.infer<typeof register>["body"];

export const signIn = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "Email is required",
      })
      .email("Not a valid email"),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, { message: "Password not long enough" }),
  }),
});

export type userSignIn = z.infer<typeof signIn>["body"];
