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

export type ConstructionPackages = {
  [key in PackageType]: CostItem;
};

export type ConstructionDataByCity = {
  [key in ConstructionType]?: ConstructionPackages;
};

interface ConstructionStore {
  data: {
    [key in City]?: ConstructionDataByCity;
  };
  selected: {
    city: City | null;
    type: ConstructionType | null;
    package: PackageType | null;
  };
  setSelected: (city: City, type: ConstructionType, pkg: PackageType) => void;
  setData: (
    city: City,
    type: ConstructionType,
    data: ConstructionPackages
  ) => void;
  clearData: () => void;
}

export const useConstructionStore = create<ConstructionStore>((set) => ({
  data: {},
  selected: {
    city: null,
    type: null,
    package: null,
  },
  setSelected: (city, type, pkg) =>
    set(() => ({
      selected: {
        city,
        type,
        package: pkg,
      },
    })),
  setData: (city, type, packages) =>
    set((state) => ({
      data: {
        ...state.data,
        [city]: {
          ...(state.data[city] || {}),
          [type]: packages,
        },
      },
    })),
  clearData: () =>
    set(() => ({
      data: {},
      selected: {
        city: null,
        type: null,
        package: null,
      },
    })),
}));
