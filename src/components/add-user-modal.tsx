"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, NewUserForm } from "@/lib/schemas/userSchema";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AddUserModalProps {
  onSuccess: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();

  const formatMySQLDateTime = (date: Date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const defaultValues: NewUserForm = {
    fullName: "",
    address: "",
    dob: new Date().toISOString().split("T")[0],
    email: "",
    password: "",
    phonenumber: "",
    designs: "0",
    role: "user",
    avatar: undefined,
    activedDay: formatMySQLDateTime(new Date()),
    google: 0,
  };

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm<NewUserForm>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  // Watch google field để kiểm soát hiển thị password
  const googleValue = watch("google");

  const onSubmit = async (data: NewUserForm) => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Format dates properly
    const formattedData = {
      ...data,
      dob: new Date(data.dob).toISOString().split("T")[0],
      activedDay: formatMySQLDateTime(new Date()),
      // Nếu là Google account thì không gửi password
      password: data.google === 1 ? "" : data.password,
      avatar: data.google === 1 ? undefined : data.avatar,
    };

    // Append all form data
    Object.entries(formattedData).forEach(([key, value]) => {
      if (key === "avatar" && value instanceof FileList) {
        if (value.length > 0) {
          formData.append("avatar", value[0]);
        }
      } else {
        formData.append(key, value?.toString() ?? "");
      }
    });

    try {
      const res = await axios.post(`${API_URL}/user`, formData, {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      });

      if (res.status === 201 || res.status === 200) {
        await Swal.fire({
          icon: "success",
          title: "Thành công",
          text: "Đã thêm người dùng mới!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
        });
        reset(defaultValues);
        onSuccess();
        (
          document.getElementById("add-user-modal") as HTMLDialogElement
        )?.close();
      }
    } catch (error: any) {
      console.error("Submit error:", error.response?.data);
      await Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.response?.data?.message || "Không thể thêm người dùng!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          reset(defaultValues);
          (
            document.getElementById("add-user-modal") as HTMLDialogElement
          )?.showModal();
        }}
      >
        Add new user
      </button>

      <dialog id="add-user-modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-6">Thêm người dùng mới</h3>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Account Type */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Loại tài khoản *
                </span>
              </label>
              <Controller
                control={control}
                name="google"
                render={({ field }) => (
                  <div className="flex gap-6">
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="google"
                        className="radio radio-primary"
                        value={0}
                        checked={field.value === 0}
                        onChange={() => field.onChange(0)}
                      />
                      <span className="label-text">Normal Account</span>
                    </label>
                    <label className="label cursor-pointer gap-2">
                      <input
                        type="radio"
                        name="google"
                        className="radio radio-primary"
                        value={1}
                        checked={field.value === 1}
                        onChange={() => field.onChange(1)}
                      />
                      <span className="label-text">Google Account</span>
                    </label>
                  </div>
                )}
              />
              {googleValue === 1 && (
                <div className="alert alert-info mt-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-current shrink-0 w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>Tài khoản Google</span>
                </div>
              )}
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Họ tên *</span>
                </label>
                <input
                  className={`input input-bordered w-full ${
                    errors.fullName ? "input-error" : ""
                  }`}
                  placeholder="Nhập họ và tên"
                  {...register("fullName")}
                />
                {errors.fullName && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.fullName.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email *</span>
                </label>
                <input
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                  type="email"
                  placeholder="example@email.com"
                  {...register("email")}
                />
                {errors.email && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.email.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Password - Conditional */}
              {googleValue === 0 && (
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text">Mật khẩu *</span>
                  </label>
                  <input
                    className={`input input-bordered w-full ${
                      errors.password ? "input-error" : ""
                    }`}
                    type="password"
                    placeholder="Tối thiểu 6 ký tự"
                    {...register("password")}
                  />
                  {errors.password && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.password.message}
                      </span>
                    </label>
                  )}
                </div>
              )}

              {/* Address */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Địa chỉ *</span>
                </label>
                <input
                  className={`input input-bordered w-full ${
                    errors.address ? "input-error" : ""
                  }`}
                  placeholder="Nhập địa chỉ đầy đủ"
                  {...register("address")}
                />
                {errors.address && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.address.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Ngày sinh *</span>
                </label>
                <input
                  className={`input input-bordered w-full ${
                    errors.dob ? "input-error" : ""
                  }`}
                  type="date"
                  {...register("dob")}
                />
                {errors.dob && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.dob.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Phone Number */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Số điện thoại</span>
                </label>
                <input
                  className="input input-bordered w-full"
                  placeholder="0123456789"
                  {...register("phonenumber")}
                />
              </div>

              {/* Role */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Vai trò *</span>
                </label>
                <select
                  className={`select select-bordered w-full ${
                    errors.role ? "select-error" : ""
                  }`}
                  {...register("role")}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="designer">Designer</option>
                  <option value="receptionist">Receptionist</option>
                </select>
                {errors.role && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.role.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Avatar */}
              {googleValue === 0 && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Avatar</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full"
                    {...register("avatar")}
                  />
                  <label className="label">
                    <span className="label-text-alt">
                      PNG, JPG, GIF tối đa 2MB
                    </span>
                  </label>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  (
                    document.getElementById(
                      "add-user-modal"
                    ) as HTMLDialogElement
                  )?.close()
                }
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Đang thêm...
                  </>
                ) : (
                  "Thêm"
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddUserModal;
