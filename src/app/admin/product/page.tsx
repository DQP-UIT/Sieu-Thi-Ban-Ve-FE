"use client";

import ProductDetail from "@/components/design-interface";
import { useSelectedProduct } from "@/store/product-store";
import { redirect } from "next/navigation";

export default function ProductPage() {
  const product = useSelectedProduct((p) => p.product);
  if (product === null) {
    redirect("/admin/report");
  }

  return (
    <div className="w-full mt-12">
      <ProductDetail design={product} />
    </div>
  );
}
