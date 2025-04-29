"use client";

import { useFengShuiStore } from "@/store/fengshui-store";
import React from "react";
import Swal from "sweetalert2";

const FengShuiInput = () => {
  const { birthYear, houseYear, setBirthYear, setHouseYear, showOutput } =
    useFengShuiStore();
  const currentYear = new Date().getFullYear();

  const handleSubmit = () => {
    if (birthYear <= 1950 || houseYear < currentYear) {
      Swal.fire({
        icon: "error",
        title: "Kiểm tra lại năm nhập vào",
        text: `Năm sinh phải lớn hơn 1950 và năm làm nhà phải lớn hơn ${currentYear}`,
      });
      return;
    }
    if (birthYear >= houseYear) {
      Swal.fire({
        icon: "error",
        title: "Kiểm tra lại năm nhập vào",
        text: `Năm sinh phải nhỏ hơn năm làm nhà: ${currentYear}`,
      });
      return;
    }
    showOutput();
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-2xl bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl text-primary-content justify-center">
            Xem tuổi làm nhà
          </h1>
          <p className="text-center text-base text-base-content">
            Theo khoa học phong thủy, để việc thi công được thuận buồm xuôi gió
            thì cần xem tuổi của chủ nhà phù hợp với năm làm nhà hay không.
            Tránh phạm vào Kim Lâu, Hoang Ốc, Tam Tai.
          </p>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Nhập năm sinh
              </span>
            </label>
            <input
              type="number"
              min={1950}
              value={birthYear}
              onChange={(e) => setBirthYear(Number(e.target.value))}
              placeholder="Nhập năm sinh"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control w-full mt-4">
            <label className="label">
              <span className="label-text text-lg font-semibold">
                Nhập năm làm nhà
              </span>
            </label>
            <input
              type="number"
              min={currentYear}
              value={houseYear}
              onChange={(e) => setHouseYear(Number(e.target.value))}
              placeholder="Nhập năm làm nhà"
              className="input input-bordered w-full"
            />
          </div>
          <div className="card-actions mt-6">
            <button
              onClick={handleSubmit}
              className="btn btn-primary w-full text-lg"
            >
              Xem ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FengShuiInput;
