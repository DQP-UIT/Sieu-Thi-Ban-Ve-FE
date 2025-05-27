// userSchema.ts
import { z } from "zod";

export const userSchema = z.object({
  fullName: z.string().min(1),
  address: z.string().min(1),
  dob: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  phonenumber: z.string().optional(),
  designs: z.string().optional(),
  activedDay: z.string().optional(),
  role: z.string().min(1),
  avatar: z.any().optional(),
});

export type NewUserForm = z.infer<typeof userSchema>;
