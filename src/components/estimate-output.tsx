"use client";

import { useMemo } from "react";
import { EstimateFormData, useEstimateFormStore } from "@/store/estimate-store";
import { useConstructionStore } from "@/store/estimate-calculating-store";
import {
  EstimateResult,
  getAllEstimateResults,
} from "@/services/estimate-calculating.service";

const EstimateOutput = () => {
  const { formData, showInput2 } = useEstimateFormStore();
  const { selected, costItems } = useConstructionStore();
  getAllEstimateResults(formData);
  const loaiCongTrinh = selected.type;

  const results = useMemo(() => {
    if (!formData || !costItems || !loaiCongTrinh) return {};
    return getAllEstimateResults(formData);
  }, [formData, costItems, loaiCongTrinh]);
  console.log("form data", formData);
  console.log("result", results);
  console.log("data-3", getAllEstimateResults(formData));
  
  
  const renderCosts = (
    costs: EstimateResult | undefined,
    packageName: string
  ) => {
    if (!costs || !loaiCongTrinh) return null;

    const rows = [
      { stt: 1, label: "Chi phí móng nhà", value: costs.foundationCost },
      { stt: 2, label: "Chi phí ngói", value: costs.roofCost },
      { stt: 3, label: "Chi phí thân nhà", value: costs.structureCost },
      { stt: 4, label: "Chi phí phần thô", value: costs.rawConstructionCost },
      { stt: 5, label: "Chi phí hoàn thiện", value: costs.finishingCost },
    ];

    if (loaiCongTrinh === "c4") {
      rows.push({
        stt: 6,
        label: "Chi phí sân vườn",
        value: costs.gardenCost ?? 0,
      });
    } else if (loaiCongTrinh === "ch") {
      rows.push(
        { stt: 6, label: "Chi phí tầng hầm", value: costs.basementCost ?? 0 },
        {
          stt: 7,
          label: "Chi phí chống đỡ nhà hàng xóm",
          value: costs.demolitionCost ?? 0,
        },
        { stt: 8, label: "Chi phí thang máy", value: costs.elevatorCost ?? 0 },
        { stt: 9, label: "Chi phí hồ bơi", value: costs.poolCost ?? 0 }
      );
    } else if (loaiCongTrinh === "villa") {
      rows.push(
        { stt: 6, label: "Chi phí tầng hầm", value: costs.basementCost ?? 0 },
        { stt: 7, label: "Chi phí thang máy", value: costs.elevatorCost ?? 0 },
        { stt: 8, label: "Chi phí hồ bơi", value: costs.poolCost ?? 0 },
        { stt: 9, label: "Chi phí sân vườn", value: costs.gardenCost ?? 0 }
      );
    }

    return (
      <div className="card bg-base-100 shadow-xl border border-primary">
        <div className="card-header bg-primary text-white text-xl font-bold p-4 rounded-t">
          Gói {packageName}
        </div>
        <div className="card-body p-4">
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thành phần</th>
                  <th className="text-right">Thành tiền (VND)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(({ stt, label, value }) => (
                  <tr key={stt}>
                    <td>{stt}</td>
                    <td>{label}</td>
                    <td className="text-right">
                      {(value ?? 0).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="divider"></div>
          <p className="text-primary font-bold text-lg">
            Tổng chi phí: {costs.totalCost.toLocaleString()} VND
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6 mt-16">
      <h1 className="text-2xl font-bold text-center text-primary">
        Kết quả tính toán kinh phí công trình
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {renderCosts(results.basic, "Basic")}
        {renderCosts(results.standard, "Standard")}
        {renderCosts(results.premium, "Premium")}
      </div>

      <div className="text-center mt-6">
        <p className="text-blue-500 mb-2">Đơn vị tính: Việt Nam đồng (VND)</p>
        <button className="btn btn-primary" onClick={showInput2}>
          Nhập lại
        </button>
      </div>
    </div>
  );
};

export default EstimateOutput;
