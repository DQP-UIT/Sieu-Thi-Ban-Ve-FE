"use client";

import ProductDetail from "@/components/design-interface";
import { useSelectedProduct } from "@/store/product-store";
import { IProduct } from "@/types/type";
import { redirect } from "next/navigation";

export default function ProductPage() {
  const product = useSelectedProduct((p) => p.product);
  if (product === null) {
    redirect("/customer/product/basehouse");
    return null;
  }

  return (
    <div className="w-full mt-12">
      <ProductDetail design={product} />
    </div>
  );
}

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
