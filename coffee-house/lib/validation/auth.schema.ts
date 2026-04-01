import z from "zod";

export const loginSchema = z.object({
  login: z
    .string()
    .min(3, "Login must be at least 3 characters long")
    .regex(/^[A-Za-z].*$/, "Login must start with a letter")
    .regex(/^[A-Za-z]+$/, "Login can contain only English letters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});


export type LoginFormValues = z.infer<typeof loginSchema>;



export const registrationSchema = z
  .object({
    login: z
      .string()
      .min(3, "Login must be at least 3 characters long")
      .regex(/^[A-Za-z].*$/, "Login must start with a letter")
      .regex(/^[A-Za-z]+$/, "Login can contain only English letters"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
    city: z.string().min(2, "City is required"),
    street: z.string().min(2, "Street is required"),
    houseNumber: z
      .number("House number must be a positive integer")
      .int()
      .min(2, "House number must be more then 1"),
    paymentMethod: z.enum(["cash", "card"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormValues = z.infer<typeof registrationSchema>;