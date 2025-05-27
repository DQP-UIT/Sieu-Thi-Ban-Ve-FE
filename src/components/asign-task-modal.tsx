import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { IActor, IBooking, IBookingUpdate } from "@/types/type";
import { useSession } from "next-auth/react";

interface AssignModalProps {
  booking: IBooking;
  designerList: IActor[];
  onSuccess: () => void;
}

const AssignModal: React.FC<AssignModalProps> = ({
  booking,
  designerList,
  onSuccess,
}) => {
  const [selectedDesigner, setSelectedDesigner] = useState<number | null>(
    booking?.designer?.id ?? null
  );
  
  const bookingUpdateObj: IBookingUpdate = {
    designer: selectedDesigner ?? null,
    status: booking.status === "handled" ? "handled" : "assigned",
    name: booking?.name ?? "",
    phone_number: booking?.phone_number ?? "",
    email: booking?.email ?? "",
    message: booking?.message ?? "",
  };
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const accessToken = session?.accessToken;

  const handleAssign = async () => {
    setIsSubmitting(true);
    console.log("obj",bookingUpdateObj);
    
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
        title: "Thành công",
        text: "Đã phân công designer!",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
      });

      onSuccess();
      (document.getElementById("assign-modal") as HTMLDialogElement)?.close();
    } catch (error: any) {
      console.error(error);
      await Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: error.response?.data?.message || "Không thể phân công!",
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
        className="btn btn-accent"
        onClick={() =>
          (
            document.getElementById(
              `assign-modal-${booking.id}`
            ) as HTMLDialogElement
          )?.showModal()
        }
      >
        Assign
      </button>

      <dialog id={`assign-modal-${booking.id}`} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Phân công designer</h3>
          <select
            className="select select-bordered w-full mb-4"
            value={selectedDesigner ?? ""}
            onChange={(e) =>
              setSelectedDesigner(
                e.target.value === "" ? null : Number(e.target.value)
              )
            }
          >
            <option value="">Chọn designer</option>
            {designerList.map((designer) => (
              <option key={designer.id} value={designer.id}>
                {designer.fullName} ({designer.email})
              </option>
            ))}
          </select>

          <div className="modal-action">
            <button
              className="btn"
              onClick={() =>
                (
                  document.getElementById(
                    `assign-modal-${booking.id}`
                  ) as HTMLDialogElement
                )?.close()
              }
            >
              Hủy
            </button>
            <button
              className="btn btn-primary"
              onClick={handleAssign}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Đang phân công..." : "Xác nhận"}
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default AssignModal;
