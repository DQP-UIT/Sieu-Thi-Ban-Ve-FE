import { create } from "zustand";

export type ConstructionType = "villa" | "c4" | "ch";
export type PackageType = "basic" | "standard" | "premium";
export type City = string;

export type CostItem = {
  foundationCost: number;
  basementCost?: number;
  structureCost: number;
  roofCost: number;
  demolitionCost?: number;
  rawConstructionCost: number;
  finishingCost: number;
  totalHouseCost?: number;
  gardenCost?: number;
  poolCost?: number;
  elevatorCost?: number;
};

type ConstructionPackages = {
  [key in PackageType]?: CostItem;
};

interface ConstructionStore {
  selected: {
    city: City | null;
    type: ConstructionType | null;
  };
  costItems: ConstructionPackages | null;

  setSelected: (city: City, type: ConstructionType) => void;
  setCostItems: (packages: ConstructionPackages) => void;
  clear: () => void;
}

export const useConstructionStore = create<ConstructionStore>((set) => ({
  selected: {
    city: null,
    type: null,
    package: null,
  },
  costItems: null,
  setSelected: (city, type) =>
    set(() => ({
      selected: { city, type },
    })),
  setCostItems: (packages) =>
    set(() => ({
      costItems: packages,
    })),
  clear: () =>
    set(() => ({
      selected: { city: null, type: null, package: null },
      costItems: null,
    })),
}));
