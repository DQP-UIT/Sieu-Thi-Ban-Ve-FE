"use client";

import React from "react";
import { useFengShuiStore } from "@/store/fengshui-store";
import {
  checkTamTai,
  checkKimLau,
  checkHoangOc,
  chuyenDoiNamAmLich,
  getCungMenh,
  findSuitableAges,
  getHuongNha,
} from "../services/fengshui.service";

const FengShuiOutput = () => {
  const { birthYear, houseYear, showInput } = useFengShuiStore();

  // Logic xử lý dữ liệu
  const tamTaiResult = checkTamTai(birthYear, houseYear);
  const kimLauResult = checkKimLau(birthYear, houseYear);
  const hoangOcResult = checkHoangOc(birthYear, houseYear);
  const lunarAge = chuyenDoiNamAmLich(birthYear);
  const lunarHouseYear = chuyenDoiNamAmLich(houseYear);
  const destiny = getCungMenh(birthYear);
  const huongNhaNam = getHuongNha(birthYear, "Nam");
  const huongNhaNu = getHuongNha(birthYear, "Nữ");
  const suitableAges = findSuitableAges(birthYear, houseYear);

  const getResultText = (result: string) => {
    if (result.includes("Phạm") || result.includes("Xấu")) {
      return "text-error";
    }
    return "text-success";
  };

  const getResultBG = (result: string) => {
    if (result.includes("Phạm") || result.includes("Xấu")) {
      return "bg-red-100";
    }
    return "bg-green-100";
  };

  return (
    <div className="flex w-full items-center justify-center bg-base-200">
      <div className="w-full mt-20 max-w-2xl rounded-lg bg-base-100 p-6 shadow-xl">
        <h1 className="mb-4 text-center text-3xl font-bold">
          Xem tuổi làm nhà
        </h1>
        <p className="mb-8 text-center text-lg text-base-content/70">
          Kết quả xem tuổi làm nhà
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <span className="text-base-content/50">Năm sinh</span>
          <span className="font-semibold">{birthYear}</span>

          <span className="text-base-content/50">Tuổi khi làm nhà</span>
          <span className="font-semibold">{houseYear - birthYear + 1}</span>

          <span className="text-base-content/50">Tuổi âm lịch</span>
          <span className="font-semibold">{lunarAge}</span>

          <span className="text-base-content/50">Cung mệnh</span>
          <span className="font-semibold">{destiny}</span>

          <span className="text-base-content/50">Năm xây nhà</span>
          <span className="font-semibold">{houseYear}</span>

          <span className="text-base-content/50">Năm âm lịch</span>
          <span className="font-semibold">{lunarHouseYear}</span>
        </div>

        {/* Tam Tai */}
        <div className={`mb-6 rounded-lg p-4 ${getResultBG(tamTaiResult)}`}>
          <h2
            className={`mb-2 text-lg font-semibold ${getResultText(
              tamTaiResult
            )}`}
          >
            Tam Tai
          </h2>
          <p className={`text-lg ${getResultText(tamTaiResult)}`}>
            {tamTaiResult}
          </p>
        </div>

        {/* Kim Lâu */}
        <div className={`mb-6 rounded-lg p-4 ${getResultBG(kimLauResult)}`}>
          <h2
            className={`mb-2 text-lg font-semibold ${getResultText(
              kimLauResult
            )}`}
          >
            Kim Lâu
          </h2>
          <p className={`text-lg ${getResultText(kimLauResult)}`}>
            {kimLauResult}
          </p>
        </div>

        {/* Hoang Ốc */}
        <div className={`mb-6 rounded-lg p-4 ${getResultBG(hoangOcResult)}`}>
          <h2
            className={`mb-2 text-lg font-semibold ${getResultText(
              hoangOcResult
            )}`}
          >
            Hoang Ốc
          </h2>
          <p className={`text-lg ${getResultText(hoangOcResult)}`}>
            {hoangOcResult}
          </p>
        </div>

        {/* Hướng Nhà */}
        <div className="mb-6 rounded-lg bg-info/20 p-4">
          <h2 className="mb-2 text-lg font-semibold text-info">
            Hướng mặt tiền hợp mạng
          </h2>
          <p className="text-info">Nam: {huongNhaNam}</p>
          <p className="text-info">Nữ: {huongNhaNu}</p>
        </div>

        {/* Mượn tuổi */}
        <div className="mb-6 rounded-lg bg-info/20 p-4">
          <h2 className="mb-2 text-lg font-semibold text-info">
            Các tuổi hợp để mượn tuổi
          </h2>
          <p className="text-info">{suitableAges.join(", ")}</p>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button className="btn btn-primary w-48" onClick={showInput}>
            Xem lại
          </button>
        </div>
      </div>
    </div>
  );
};

export default FengShuiOutput;
