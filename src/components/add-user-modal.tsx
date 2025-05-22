"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, NewUserForm } from "@/lib/schemas/userSchema";
import axios from "axios";
import Swal from "sweetalert2";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface AddUserModalProps {
  onSuccess: () => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({onSuccess}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatMySQLDateTime = (date: Date) => {
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const defaultValues: NewUserForm = {
    fullName: "",
    address: "",
    dob: new Date().toISOString().split("T")[0], // YYYY-MM-DD format
    email: "",
    password: "",
    phonenumber: "",
    designs: "0",
    role: "user",
    avatar: undefined,
    activedDay: formatMySQLDateTime(new Date()), // YYYY-MM-DD HH:mm:ss format
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewUserForm>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const onSubmit = async (data: NewUserForm) => {
    setIsSubmitting(true);
    const formData = new FormData();

    // Format dates properly
    const formattedData = {
      ...data,
      dob: new Date(data.dob).toISOString().split("T")[0],
      activedDay: formatMySQLDateTime(new Date()),
    };

    // Append all form data
    Object.entries(formattedData).forEach(([key, value]) => {
      if (key === "avatar" && value instanceof FileList) {
        if (value.length > 0) {
          formData.append("avatar", value[0]);
        }
      } else {
        formData.append(key, value ?? "");
      }
    });

    try {
      const res = await axios.post(`${API_URL}/user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
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
        <div className="modal-box w-11/12 max-w-2xl">
          <h3 className="font-bold text-lg mb-4">Thêm người dùng mới</h3>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="label">Họ tên *</label>
              <input
                className={`input input-bordered w-full ${
                  errors.fullName ? "input-error" : ""
                }`}
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Email *</label>
              <input
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
                type="email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="label">Mật khẩu *</label>
              <input
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">Địa chỉ *</label>
              <input
                className={`input input-bordered w-full ${
                  errors.address ? "input-error" : ""
                }`}
                {...register("address")}
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <div>
              <label className="label">Ngày sinh *</label>
              <input
                className={`input input-bordered w-full ${
                  errors.dob ? "input-error" : ""
                }`}
                type="date"
                {...register("dob")}
              />
              {errors.dob && (
                <p className="text-red-500 text-sm">{errors.dob.message}</p>
              )}
            </div>

            <div>
              <label className="label">Số điện thoại</label>
              <input
                className="input input-bordered w-full"
                {...register("phonenumber")}
              />
            </div>

            <div>
              <label className="label">Vai trò *</label>
              <select
                className={`select select-bordered w-full ${
                  errors.role ? "select-error" : ""
                }`}
                {...register("role")}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="receptionist">Receptionist</option>
              </select>
            </div>

            <div>
              <label className="label">Avatar</label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                {...register("avatar")}
              />
            </div>

            <div className="col-span-full flex justify-end gap-2 mt-4">
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
                {isSubmitting ? "Đang thêm..." : "Thêm"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AddUserModal;
