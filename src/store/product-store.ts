import { IProduct } from "@/types/type";
import { create } from "zustand";

interface SelectedProductState {
  product: IProduct | null;
  setProduct: (product: IProduct) => void;
}

export const useSelectedProduct = create<SelectedProductState>((set) => ({
  product: null,
  setProduct: (product) => set({ product }),
}));
