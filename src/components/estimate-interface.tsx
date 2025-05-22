"use client";

import { useState } from "react";
import {
  useConstructionStore,
  ConstructionType,
  PackageType,
  CostItem,
} from "@/store/estimate-calculating-store";
import {
  fetchCityHousePackages,
  fetchOneStoryHousePackages,
  fetchVillaPackages,
} from "@/actions/fetch-etimate-package";
import { updateCostPackage } from "@/services/update-cost-package.service";
import Swal from "sweetalert2";

const cities = ["Hà Nội", "Đà Nẵng", "Hồ Chí Minh"];
const types: { label: string; value: ConstructionType }[] = [
  { label: "Biệt thự", value: "villa" },
  { label: "Nhà cấp 4", value: "c4" },
  { label: "Nhà phố", value: "ch" },
];

const packageLevels: PackageType[] = ["basic", "standard", "premium"];

export default function EstimateControl() {
  const { selected, setSelected, costItems, setCostItems } =
    useConstructionStore();
  const [localCity, setLocalCity] = useState(selected.city || "");
  const [localType, setLocalType] = useState<ConstructionType>(
    selected.type || "ch"
  );
  const [loading, setLoading] = useState(false);
  const [formState, setFormState] = useState<Record<PackageType, CostItem>>(
    {} as any
  );

  const handleFetch = async () => {
    if (!localCity || !localType) return;

    setLoading(true);
    try {
      setSelected(localCity, localType);
      if (localType === "ch") await fetchCityHousePackages(localCity);
      else if (localType === "c4") await fetchOneStoryHousePackages(localCity);
      else await fetchVillaPackages(localCity);

      // Copy từ store sang local state để chỉnh sửa
      const current = useConstructionStore.getState().costItems;
      if (current) setFormState(current as Record<PackageType, CostItem>);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (
    pkg: PackageType,
    field: keyof CostItem,
    value: number
  ) => {
    setFormState((prev) => ({
      ...prev,
      [pkg]: {
        ...prev[pkg],
        [field]: value,
      },
    }));
  };

  const handleSubmitUpdate = async (pkg: PackageType) => {
    if (!selected.city || !selected.type) return;
    const data = formState[pkg];
    setLoading(true);
    try {
      await updateCostPackage(selected.type, selected.city, pkg, data);
      setCostItems({ ...formState });
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Thành công",
        text: "Đã cập nhật thành công!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.error(err);
      await Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Lỗi",
        text: "Đã xảy ra lỗi khi cập nhật!",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">Quản lý Gói Tính Toán</h1>

      {/* Chọn thành phố và loại công trình */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label font-semibold">Thành phố:</label>
          <select
            className="select select-bordered w-full"
            value={localCity}
            onChange={(e) => setLocalCity(e.target.value)}
          >
            <option value="">-- Chọn thành phố --</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="label font-semibold">Loại công trình:</label>
          <select
            className="select select-bordered w-full"
            value={localType}
            onChange={(e) => setLocalType(e.target.value as ConstructionType)}
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={handleFetch}
        disabled={loading}
      >
        {loading ? "Đang tải..." : "Xem gói tính toán"}
      </button>

      {/* Form chỉnh sửa gói */}
      {formState &&
        packageLevels.map((pkg) =>
          formState[pkg] ? (
            <div
              key={pkg}
              className="card border border-base-300 shadow-lg p-4"
            >
              <h3 className="text-lg font-bold text-primary mb-3">
                Gói: {pkg.toUpperCase()}
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {Object.entries(formState[pkg]!).map(([key, value]) => (
                  <div key={key}>
                    <label className="label text-sm">{key}</label>
                    <input
                      type="number"
                      className="input input-bordered w-full"
                      value={value ?? 0}
                      onChange={(e) =>
                        handleFieldChange(
                          pkg,
                          key as keyof CostItem,
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>
                ))}
              </div>

              <button
                className="btn btn-success mt-4"
                onClick={() => handleSubmitUpdate(pkg)}
                disabled={loading}
              >
                {loading ? "Đang cập nhật..." : "Cập nhật gói này"}
              </button>
            </div>
          ) : null
        )}
    </div>
  );
}
