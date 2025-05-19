import axios from "axios";
import { useConstructionStore } from "@/store/estimate-calculating-store";
import {
  ConstructionType,
  CostItem,
  PackageType,
} from "@/store/estimate-calculating-store";

const api_url = process.env.NEXT_PUBLIC_API_URL;

type RawCostItem = {
  foundation_cost: number;
  basement_cost?: number;
  structure_cost: number;
  roof_cost: number;
  demolition_cost?: number;
  raw_construction_cost: number;
  finishing_cost: number;
  total_house_cost?: number;
  garden_cost?: number;
  pool_cost?: number;
  elevator_cost?: number;
};

function convertToCostItem(raw: RawCostItem): CostItem {
  return {
    foundationCost: raw.foundation_cost,
    basementCost: raw.basement_cost,
    structureCost: raw.structure_cost,
    roofCost: raw.roof_cost,
    demolitionCost: raw.demolition_cost,
    rawConstructionCost: raw.raw_construction_cost,
    finishingCost: raw.finishing_cost,
    totalHouseCost: raw.total_house_cost,
    gardenCost: raw.garden_cost,
    poolCost: raw.pool_cost,
    elevatorCost: raw.elevator_cost,
  };
}


async function fetchCostItem(
  package_name: string,
  city: string,
  level: PackageType
): Promise<CostItem> {
  const res = await axios.get(`${api_url}/${package_name}`, {
    params: { city, package_level: level },
  });

  return convertToCostItem(res.data);
}

export async function fetchCityHousePackages(city: string) {
  const packages: Record<PackageType, CostItem> = {
    basic: await fetchCostItem("cityhousepackage", city, "basic"),
    standard: await fetchCostItem("cityhousepackage", city, "standard"),
    premium: await fetchCostItem("cityhousepackage", city, "premium"),
  };

  const type: ConstructionType = "ch";

  useConstructionStore.setState({
    selected: { city: city, type },
    costItems: packages,
  });
}

export async function fetchOneStoryHousePackages(city: string) {
  const packages: Record<PackageType, CostItem> = {
    basic: await fetchCostItem("onestoryhousepackage", city, "basic"),
    standard: await fetchCostItem("onestoryhousepackage", city, "standard"),
    premium: await fetchCostItem("onestoryhousepackage", city, "premium"),
  };

  const type: ConstructionType = "c4";

  useConstructionStore.setState({
    selected: { city: city, type },
    costItems: packages,
  });
}

export async function fetchVillaPackages(city: string) {
  const packages: Record<PackageType, CostItem> = {
    basic: await fetchCostItem("villapackage", city, "basic"),
    standard: await fetchCostItem("villapackage", city, "standard"),
    premium: await fetchCostItem("villapackage", city, "premium"),
  };

  const type: ConstructionType = "villa";

  useConstructionStore.setState({
    selected: { city: city, type },
    costItems: packages,
  });
}
