"use client";

import React from "react";
import { useEstimateFormStore } from "@/store/estimate-store";

// prettier-ignore
const diaDiemOptions = [
  "Hà Nội", "Hồ Chí Minh", "Đà Nẵng", "Cần Thơ", "Bình Dương", "Bình Phước", "Bạc Liêu",
  "Bắc Giang", "Bắc Kạn", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Thuận", "Cà Mau", "Cao Bằng",
  "Gia Lai", "Hà Giang", "Hà Nam", "Hải Dương", "Hải Phòng", "Hòa Bình", "Hưng Yên", "Khánh Hòa",
  "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định",
  "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam",
  "Quảng Ngãi", "Quảng Ninh", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên",
  "Thanh Hóa", "Thừa Thiên-Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

const loaiCongTrinhOptions = ["Nhà phố", "Biệt thự", "Nhà cấp 4"];

const EstimateInput1 = () => {
  const { formData, updateFormData, showInput2 } = useEstimateFormStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showInput2();
    console.log("Submitted form data:", formData);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base-100 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Dự toán chi phí công trình</h2>
      <p className="mb-6">
        Ứng dụng dự toán chi phí thi công xây dựng, nhận kết quả ngay sau khi
        nhập thông số công trình.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="diaDiem" className="label font-medium">
            Địa điểm xây dựng:
          </label>
          <select
            id="diaDiem"
            value={formData.diaDiem}
            onChange={(e) => updateFormData("diaDiem", e.target.value)}
            className="select select-bordered w-full"
          >
            {diaDiemOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="loaiCongTrinh" className="label font-medium">
            Loại công trình:
          </label>
          <select
            id="loaiCongTrinh"
            value={formData.loaiCongTrinh}
            onChange={(e) => updateFormData("loaiCongTrinh", e.target.value)}
            className="select select-bordered w-full"
          >
            {loaiCongTrinhOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-2">
          Dự toán chi phí
        </button>
      </form>
    </div>
  );
};

export default EstimateInput1;
