import { IProduct } from "@/types/type";

export function normalizeProducts(apiData: any[]): IProduct[] {
  return apiData.map((item) => ({
    id: Number(item.id) ?? undefined,
    name: item.name ?? "",
    size: item.size ?? "",
    cost: Number(item.cost) ?? 0,

    images: Array.isArray(item.images) ? item.images : [],
    images2D: Array.isArray(item.images2D) ? item.images2D : [],
    images3D: Array.isArray(item.images3D) ? item.images3D : [],

    floor: Number(item.floor) ?? 0,
    square: item.square ?? "",

    userId: Number(item.userId) ?? 0,
    style: item.style ?? "",
    designedBy: item.designedBy ?? "",

    numberBedRoom: Number(item.numberBedRoom) ?? 0,
    frontAge: Number(item.frontAge) ?? 0,
    productTypeId: Number(item.productTypeId) ?? 0,

    description: item.description ?? "",

    files: Array.isArray(item.files) ? item.files : [],
  }));
}

interface APIResponse {
  data: {
    id: number;
    name: string;
    size: string;
    cost: number;
    images: string[] | null;
    images2D: string[] | null;
    images3D: string[] | null;
    floor: number;
    square: string;
    userId: number;
    style: string;
    designedBy: string;
    numberBedRoom: number;
    frontAge: number;
    productTypeId: number;
    description: string;
    files: string[] | null;
    videos: string[] | null;
    productType: {
      id: number;
      name: string;
      description: string;
    };
    orders: Array<{
      id: number;
      orderUserName: string;
      orderPhoneNumber: string;
      orderCity: string;
      orderAdress: string;
      productId: number;
      userId: number;
      createAt: string;
      solved: number;
    }>;
  };
}

export const normalizeOneProduct = (apiResponse: APIResponse): IProduct => {
  const { data } = apiResponse;

  return {
    id: Number(data.id) ?? undefined,
    name: data.name,
    size: data.size,
    cost: data.cost,
    images: data.images || [],
    images2D: data.images2D || [],
    images3D: data.images3D || [],
    floor: data.floor,
    square: data.square,
    userId: data.userId,
    style: data.style,
    designedBy: data.designedBy,
    numberBedRoom: data.numberBedRoom,
    frontAge: data.frontAge,
    productTypeId: data.productTypeId,
    description: data.description,
    files: data.files || [],
  };
};