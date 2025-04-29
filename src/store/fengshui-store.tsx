import { create } from "zustand";

export interface FengShuiInputData {
  birthYear: number;
  houseYear: number;
  isOutputVisible: boolean;
  setBirthYear: (year: number) => void;
  setHouseYear: (year: number) => void;
  setBothYears: (birthYear: number, houseYear: number) => void;
  showOutput: () => void;
  showInput: () => void;
}

export const useFengShuiStore = create<FengShuiInputData>()((set) => ({
  birthYear: 2000,
  houseYear: new Date().getFullYear(),
  isOutputVisible: false, 
  setBirthYear: (year) => set((state) => ({ ...state, birthYear: year })),
  setHouseYear: (year) => set((state) => ({ ...state, houseYear: year })),
  setBothYears: (birthYear, houseYear) => set({ birthYear, houseYear }),
  showOutput: () => set({ isOutputVisible: true }),
  showInput: () => set({ isOutputVisible: false }),
}));
