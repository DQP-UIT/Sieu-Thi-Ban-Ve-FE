"use client";

import ContactCard from "@/components/contact-card";
import ProductDetail from "@/components/design-interface";
import { useSelectedProduct } from "@/store/product-store";
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ProductPage() {
  const product = useSelectedProduct((p) => p.product);
  if (product === null) {
    redirect("/customer/product/basehouse");
  }
  useEffect(() => {
    try {
      axios.patch(`${API_URL}/product/patch/${product.id}`);
      console.log("Call complete");
    } catch (error) {
      console.error(error);
    }
  }, [product?.id]);

  return (
    <div className="w-full mt-12">
      <ProductDetail design={product} />
      <div className="w-full">
        <ContactCard />
      </div>
    </div>
  );
}
