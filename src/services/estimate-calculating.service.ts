import {
  CostItem,
  PackageType,
  useConstructionStore,
} from "@/store/estimate-calculating-store";
import { EstimateFormData } from "@/store/estimate-store";

export type EstimateResult = {
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

type EstimateResultsByPackage = {
  [key in PackageType]?: EstimateResult;
};

function calculateEstimate(
  formData: EstimateFormData,
  costItem: CostItem,
  type: string
): EstimateResult {
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

  const roofCost = (formData.dienTichTumMai ?? 0) * costItem.roofCost;
  const structureCost = (formData.soTang ?? 1) * area * costItem.structureCost;
  const rawConstructionCost = costItem.rawConstructionCost;
  const finishingCost = costItem.finishingCost;

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

export function getAllEstimateResults(
  formData: EstimateFormData
): EstimateResultsByPackage {
  const { selected, costItems } = useConstructionStore.getState();
  const { type } = selected;

  if (!type || !costItems) return {};

  const results: EstimateResultsByPackage = {};

  (["basic", "standard", "premium"] as PackageType[]).forEach((pkg) => {
    const costItem = costItems[pkg];
    if (costItem) {
      results[pkg] = calculateEstimate(formData, costItem, type);
    }
  });

  return results;
}
