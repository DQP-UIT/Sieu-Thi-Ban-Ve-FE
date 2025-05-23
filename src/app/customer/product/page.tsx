"use client";

import ContactCard from "@/components/contact-card";
import ProductDetail from "@/components/design-interface";
import { useSelectedProduct } from "@/store/product-store";
import { IProduct } from "@/types/type";
import { redirect } from "next/navigation";

export default function ProductPage() {
  const product = useSelectedProduct((p) => p.product);
  if (product === null) {
    redirect("/customer/product/basehouse");
  }

  return (
    <div className="w-full mt-12">
      <ProductDetail design={product} />
      <div className="w-full">
        <ContactCard />
      </div>
    </div>
  );
}
