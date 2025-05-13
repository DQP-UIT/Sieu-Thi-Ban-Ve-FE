import { CostItem, useConstructionStore } from "@/store/estimate-calculating-store";
import { EstimateFormData } from "@/store/estimate-store";

type EstimateResult = {
  foundationCost: number;
  roofCost: number;
  structureCost: number;
  rawConstructionCost: number;
  finishingCost: number;
  gardenCost?: number;
  poolCost?: number;
  elevatorCost?: number;
  basementCost?: number;
  demolitionCost?: number;
  totalCost: number;
};

export function getBasicEstimateResults(
  formData: EstimateFormData
): EstimateResult {
  const { data, selected } = useConstructionStore.getState();
  const { city, type, package: pkg } = selected;

  if (!city || !type || !pkg) {
    return {
      foundationCost: 0,
      roofCost: 0,
      structureCost: 0,
      rawConstructionCost: 0,
      finishingCost: 0,
      totalCost: 0,
    };
  }

  const costItem: CostItem | undefined = data[city]?.[type]?.[pkg];
  if (!costItem) {
    return {
      foundationCost: 0,
      roofCost: 0,
      structureCost: 0,
      rawConstructionCost: 0,
      finishingCost: 0,
      totalCost: 0,
    };
  }

  // Phần móng (theo loại móng)
  const area = formData.dienTichXayDungTang1 ?? 0;
  let foundation = costItem.foundationCost;
  switch (formData.ketCauMong) {
    case "móng băng":
      foundation *= 1.3;
      break;
    case "móng bè":
      foundation *= 1.15;
      break;
  }
  const foundationCost = foundation * area;

  // Các phần còn lại tính thẳng theo diện tích
  const roofCost = (formData.dienTichTumMai ?? 0) * costItem.roofCost;
  const structureCost = (formData.soTang ?? 1) * area * costItem.structureCost;
  const rawConstructionCost = costItem.rawConstructionCost;
  const finishingCost = costItem.finishingCost;

  // Các phần tùy chọn
  const gardenCost = ["c4", "villa"].includes(type)
    ? costItem.gardenCost ?? 0
    : 0;
  const poolCost = formData.hoBoi ? costItem.poolCost ?? 0 : 0;
  const elevatorCost = formData.thangMay ? costItem.elevatorCost ?? 0 : 0;
  const basementCost = formData.tangHam ? costItem.basementCost ?? 0 : 0;
  const demolitionCost = type !== "c4" ? costItem.demolitionCost ?? 0 : 0;

  const totalCost =
    foundationCost +
    roofCost +
    structureCost +
    rawConstructionCost +
    finishingCost +
    gardenCost +
    poolCost +
    elevatorCost +
    basementCost +
    demolitionCost;

  return {
    foundationCost,
    roofCost,
    structureCost,
    rawConstructionCost,
    finishingCost,
    gardenCost,
    poolCost,
    elevatorCost,
    basementCost,
    demolitionCost,
    totalCost,
  };
}
