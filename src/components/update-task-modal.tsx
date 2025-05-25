"use client";

import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { IBooking, IBookingUpdate } from "@/types/type";
import { useSession } from "next-auth/react";

interface Props {
  booking: IBooking | null;
  onSuccess: () => void;
}

const UpdateBookingStatusModal: React.FC<Props> = ({ booking, onSuccess }) => {
  const [status, setStatus] = useState<"assigned" | "handled">(
    booking?.status === "assigned" || booking?.status === "handled"
      ? booking.status
      : "assigned"
  );
  const bookingUpdateObj: IBookingUpdate = {
    designer: booking?.designer?.id,
    status: status,
    name: booking?.name ?? "",
    phone_number: booking?.phone_number ?? "",
    email: booking?.email ?? "",
    message: booking?.message ?? "",
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.user.accessToken;

  const handleUpdate = async () => {
    if (!booking) return;
    console.log("token", accessToken);
    console.log("booking", bookingUpdateObj);
    setIsSubmitting(true);
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/${booking.id}`,
        {
          ...bookingUpdateObj,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      await Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        toast: true,
        timer: 1500,
        showConfirmButton: false,
        position: "top-end",
      });

      onSuccess();
      (
        document.getElementById(
          "update-booking-status-modal"
        ) as HTMLDialogElement
      )?.close();
    } catch (err: any) {
      console.error("Update error:", err.response?.data);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: err.response?.data?.message || "Không thể cập nhật trạng thái!",
        toast: true,
        timer: 2000,
        showConfirmButton: false,
        position: "top-end",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={() =>
          (
            document.getElementById(
              "update-booking-status-modal"
            ) as HTMLDialogElement
          )?.showModal()
        }
      >
        Update
      </button>

      <dialog id="update-booking-status-modal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-lg mb-4">
            Cập nhật trạng thái Booking
          </h3>

          <div className="flex justify-center gap-4 mb-6">
            <button
              className={`btn ${
                status === "assigned" ? "btn-active btn-primary" : "btn-outline"
              }`}
              onClick={() => setStatus("assigned")}
              type="button"
            >
              Assigned
            </button>
            <button
              className={`btn ${
                status === "handled" ? "btn-active btn-success" : "btn-outline"
              }`}
              onClick={() => setStatus("handled")}
              type="button"
            >
              Handled
            </button>
          </div>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                (
                  document.getElementById(
                    "update-booking-status-modal"
                  ) as HTMLDialogElement
                )?.close()
              }
            >
              Hủy
            </button>
            <button
              className="btn btn-primary"
              onClick={handleUpdate}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UpdateBookingStatusModal;
