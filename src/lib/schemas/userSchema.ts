import { z } from "zod";

export const userSchema = z
  .object({
    fullName: z.string().min(1, "Họ tên là bắt buộc"),
    address: z.string().min(1, "Địa chỉ là bắt buộc"),
    dob: z.string().min(1, "Ngày sinh là bắt buộc"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().optional(),
    phonenumber: z.string().optional(),
    designs: z.string().optional(),
    activedDay: z.string().optional(),
    role: z.string().min(1, "Vai trò là bắt buộc"),
    avatar: z.any().optional(),
    google: z.union([z.literal(0), z.literal(1)]),
  })
  .refine(
    (data) => {
      // Nếu google = 0 thì password là bắt buộc
      if (data.google === 0) {
        return data.password && data.password.length >= 6;
      }
      return true;
    },
    {
      message: "Mật khẩu phải có ít nhất 6 ký tự",
      path: ["password"], // Hiển thị lỗi ở trường password
    }
  );

export type NewUserForm = z.infer<typeof userSchema>;
