"use client";
import { useEstimateFormStore } from "@/store/estimate-store";
import React, { useEffect } from "react";

const EstimatePart2 = () => {
  const { formData, updateFormData, showOutput, resetFormData } =
    useEstimateFormStore();

  useEffect(() => {
    console.log("Dia Diem: ", formData.diaDiem);
    console.log("Cong Trinh: ", formData.loaiCongTrinh);
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    updateFormData(name, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showOutput();
  };

  return (
    <div className="w-full min-h-screen py-10">
      <div className="max-w-5xl mx-auto p-6 bg-base-100 rounded-box shadow">
        <h1 className="text-3xl font-bold text-center mb-6">
          Nhập thông số công trình
        </h1>

        <div className="flex flex-col gap-6">
          {/* Diện tích đất và tầng 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="dienTichDat"
              value={formData.dienTichDat ?? ""}
              onChange={handleChange}
              placeholder="Diện tích đất (m²)"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="dienTichXayDungTang1"
              value={formData.dienTichXayDungTang1 ?? ""}
              onChange={handleChange}
              placeholder="Diện tích xây dựng tầng 1 (m²)"
              className="input input-bordered w-full"
            />
          </div>

          {/* Tầng hoặc gác lửng */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.loaiCongTrinh !== "Nhà cấp 4" ? (
              <input
                type="number"
                name="soTang"
                value={formData.soTang ?? ""}
                onChange={handleChange}
                placeholder="Số tầng"
                className="input input-bordered w-full"
              />
            ) : (
              <input
                type="number"
                name="dienTichGacLung"
                value={formData.dienTichGacLung ?? ""}
                onChange={handleChange}
                placeholder="Diện tích gác lửng nếu có"
                className="input input-bordered w-full"
              />
            )}

            <select
              name="ketCauTumMai"
              value={formData.ketCauTumMai}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="mái BTCT phẳng, cán nền lát gạch">
                Mái BTCT phẳng
              </option>
              <option value="mái ngói">Mái ngói</option>
            </select>

            <input
              type="number"
              name="dienTichTumMai"
              value={formData.dienTichTumMai ?? ""}
              onChange={handleChange}
              placeholder="Diện tích tum mái"
              className="input input-bordered w-full"
            />
          </div>

          {/* Các lựa chọn nâng cao: thang máy, tầng hầm, hồ bơi */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="thangMay"
              value={String(formData.thangMay)}
              onChange={(e: any) =>
                updateFormData(
                  e.target.name,
                  e.target.value === "true" ? true : false
                )
              }
              className="select select-bordered w-full"
            >
              <option value="false">Không dùng thang máy</option>
              <option value="true">Dùng thang máy</option>
            </select>
            {formData.thangMay && (
              <input
                type="number"
                name="soDiemDungThangMay"
                value={formData.soDiemDungThangMay ?? ""}
                onChange={handleChange}
                placeholder="Số điểm dừng thang máy"
                className="input input-bordered w-full"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="tangHam"
              value={String(formData.tangHam)}
              onChange={(e: any) =>
                updateFormData(
                  e.target.name,
                  e.target.value === "true" ? true : false
                )
              }
              className="select select-bordered w-full"
            >
              <option value="false">Không có tầng hầm</option>
              <option value="true">Có tầng hầm</option>
            </select>
            {formData.tangHam && (
              <input
                type="number"
                name="dienTichTangHam"
                value={formData.dienTichTangHam ?? ""}
                onChange={handleChange}
                placeholder="Diện tích tầng hầm"
                className="input input-bordered w-full"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="hoBoi"
              value={String(formData.hoBoi)}
              onChange={(e: any) =>
                updateFormData(
                  e.target.name,
                  e.target.value === "true" ? true : false
                )
              }
              className="select select-bordered w-full"
            >
              <option value="false">Không có hồ bơi</option>
              <option value="true">Có hồ bơi</option>
            </select>
            {formData.hoBoi && (
              <input
                type="number"
                name="dienTichHoBoi"
                value={formData.dienTichHoBoi ?? ""}
                onChange={handleChange}
                placeholder="Diện tích hồ bơi"
                className="input input-bordered w-full"
              />
            )}
          </div>

          {/* Vị trí nhà / mặt tiền */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.loaiCongTrinh === "Nhà phố" ? (
              <select
                name="matTien"
                value={formData.matTien}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value={1}>Một mặt tiền</option>
                <option value={2}>Hai mặt tiền</option>
                <option value={3}>Ba mặt tiền</option>
              </select>
            ) : (
              <select
                name="vitriNha"
                value={formData.vitriNha}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="nhà giữa khu đất">Nhà giữa khu đất</option>
                <option value="1 cạnh giáp với hàng xóm">1 cạnh giáp</option>
                <option value="2 cạnh giáp với hàng xóm">2 cạnh giáp</option>
                <option value="3 cạnh giáp với hàng xóm">3 cạnh giáp</option>
              </select>
            )}
            <select
              name="ketCauMong"
              value={formData.ketCauMong}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="móng đơn">Móng đơn</option>
              <option value="móng băng">Móng băng</option>
              <option value="móng bè">Móng bè</option>
            </select>
          </div>

          {/* Khu đất và nhà lân cận hoặc sân vườn */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              name="khuDat"
              value={formData.khuDat}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="đường dưới 3m">Đường dưới 3m</option>
              <option value="đường trên 3m">Đường trên 3m</option>
            </select>

            {formData.loaiCongTrinh === "Nhà phố" ? (
              <select
                name="nhaLanCan"
                value={formData.nhaLanCan}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="hai bên có nhà">Hai bên có nhà</option>
                <option value="bên trái có nhà">Bên trái có nhà</option>
                <option value="bên phải có nhà">Bên phải có nhà</option>
                <option value="hai bên không có nhà">
                  Hai bên không có nhà
                </option>
              </select>
            ) : (
              <select
                name="sanVuon"
                value={formData.sanVuon}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="hơn 60% diện tích là cây xanh">
                  60% cây xanh
                </option>
                <option value="hơn 80% diện tích là cây xanh">
                  80% cây xanh
                </option>
                <option value="hơn 60% diện tích lát nền hoặc thảm bê tông">
                  60% lát nền
                </option>
                <option value="hơn 80% diện tích lát nền hoặc thảm bê tông">
                  80% lát nền
                </option>
              </select>
            )}
          </div>

          <div className="alert alert-info shadow-lg">
            <span>
              Hướng dẫn: Số tầng chưa bao gồm tum mái. Ví dụ nhà 3 tầng, không
              tum mái, tầng 3 lợp tôn: nhập "số tầng: 2", "diện tích tum mái =
              tầng 2".
            </span>
          </div>

          <div className="flex gap-4 mt-4">
            <button onClick={handleSubmit} className="btn btn-primary px-8">
              Tính ngay
            </button>
            <button onClick={resetFormData} className="btn btn-outline px-8">
              Nhập lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatePart2;
