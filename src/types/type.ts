export interface IProduct {
  id: number;
  name: string;
  size: string;
  cost: number;

  images: string[];
  images2D: string[];
  images3D: string[];

  floor: number;
  square: string;

  userId: number;
  style: string;
  designedBy: string;

  numberBedRoom: number;
  frontAge: number;
  productTypeId: number;

  description: string;

  files: string[];
}

export interface CalculationPackage {
  name: "basic" | "standard" | "premium";
  // Tên gói tính toán: cơ bản, tiêu chuẩn, cao cấp

  roughConstructionCost: number;
  // Đơn giá xây dựng phần thô (VNĐ/m²)

  fullConstructionCost: number;
  // Đơn giá xây dựng trọn gói (VNĐ/m²)

  constructionCoefficient: number;
  // Hệ số xây dựng tổng thể (dùng để nhân với diện tích)

  foundationCost: number;
  // Hệ số móng (tùy loại móng: đơn, cọc, băng...)

  mezzanineCoefficient: number;
  // Hệ số tính gác lửng (thường nhỏ hơn 1 vì không tính 100%)

  basementCoefficient: number;
  // Hệ số tính tầng hầm (thường lớn hơn 1 do chi phí cao)

  elevatorCoefficient: number;
  // Hệ số có thang máy (tăng thêm chi phí xây dựng)

  rooftopCoefficient: number;
  // Hệ số tum mái (tính phần tum nếu có)

  gardenCoefficient?: number;
  // Hệ số sân vườn (chỉ dùng cho biệt thự - Villa, có thể không có)

  poolCost: number;
  // Chi phí xây hồ bơi (nếu có, đơn giá tính theo m²)
}

export interface IUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  dob: string;
  activedDay: string;
}

export interface IActor {
  id: number;
  fullName: string;
  address: string;
  dob: string;
  role: string;
  email: string;
  password: string;
  phonenumber: string | null;
  designs: string;
  activedDay: string | null;
  avatar: string | null;
}

export interface IBooking {
  id: number;
  name: string;
  phone_number: string;
  email: string;
  message: string;
  designer: IActor;
  status: "assigned" | "handled" | "unassigned";
  created_at: string;
  updated_at: string;
}

export interface IBookingUpdate {
  designer?: number | null;
  status: "assigned" | "handled";
  name: string;
  phone_number: string;
  email: string;
  message: string;
}


export const mockProduct: IProduct = {
  id: 1,
  name: "Nhà phố hiện đại 2 tầng",
  size: "8x16m",
  cost: 75000000,

  images: [
    "https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?&auto=format&fit=crop&w=1200&q=80",
  ],
  images2D: [
    "https://images.unsplash.com/photo-1479030160180-b1860951d696?&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?&auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d?&auto=format&fit=crop&w=1200&q=80",
  ],
  images3D: ["https://source.unsplash.com/800x600/?interior,bedroom"],

  floor: 2,
  square: "128",
  userId: 1001,
  style: "Hiện đại",
  designedBy: "Công ty ADesign",

  numberBedRoom: 4,
  frontAge: 5,
  productTypeId: 2,

  description:
    "Ngôi nhà thiết kế theo phong cách hiện đại, không gian mở, nhiều ánh sáng tự nhiên, bao gồm 4 phòng ngủ, 1 bếp, 1 phòng khách, sân trước rộng rãi.",

  files: ["floorplan.pdf", "specifications.docx"],
};
