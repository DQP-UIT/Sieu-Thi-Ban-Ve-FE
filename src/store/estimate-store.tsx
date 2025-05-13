import { create } from "zustand";

export interface EstimateFormData {
  diaDiem: string;
  loaiCongTrinh: string;
  dienTichDat: number | null;
  dienTichXayDungTang1: number | null;
  soTang: number | null;
  dienTichGacLung: number | null;
  ketCauTumMai: string;
  dienTichTumMai: number | null;
  thangMay: boolean;
  soDiemDungThangMay: number | null;
  tangHam: boolean;
  dienTichTangHam: number | null;
  hoBoi: boolean;
  dienTichHoBoi: number | null;
  khuDat: string;
  nhaLanCan: string;
  matTien: number;
  ketCauMong: string;
  vitriNha: string;
  sanVuon: string;
}

interface EstimateFormStore {
  formData: EstimateFormData;
  isInput2Available: boolean;
  isOutputAvailable: boolean;
  updateFormData: <K extends keyof EstimateFormData>(
    name: K,
    value: EstimateFormData[K]
  ) => void;
  resetFormData: () => void;
  showInput2: () => void;
  showOutput: () => void;
}

const initialFormData: EstimateFormData = {
  diaDiem: "Đà Nẵng",
  loaiCongTrinh: "Nhà phố",
  dienTichDat: null,
  dienTichXayDungTang1: null,
  soTang: null,
  dienTichGacLung: null,
  ketCauTumMai: "mái BTCT phẳng, cán nền lát gạch",
  dienTichTumMai: null,
  thangMay: false,
  soDiemDungThangMay: null,
  tangHam: false,
  dienTichTangHam: null,
  hoBoi: false,
  dienTichHoBoi: null,
  khuDat: "đường dưới 3m",
  nhaLanCan: "hai bên có nhà",
  matTien: 1,
  ketCauMong: "móng đơn",
  vitriNha: "nhà giữa khu đất",
  sanVuon: "hơn 60% diện tích là cây xanh",
};

export const useEstimateFormStore = create<EstimateFormStore>((set) => ({
  formData: initialFormData,
  isInput2Available: false,
  isOutputAvailable: false,
  updateFormData: (name, value) =>
    set((state) => {
      if (!(name in state.formData)) return state;
      return {
        formData: {
          ...state.formData,
          [name]: value,
        },
      };
    }),
  resetFormData: () => set({ formData: initialFormData }),
  showInput2: () => set({ isInput2Available: true }),
  showOutput: () => set({ isOutputAvailable: true }),
}));
