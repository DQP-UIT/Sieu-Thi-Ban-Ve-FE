"use client";

import React from "react";
import ProductsList from "@/components/products-interface";

export default function VillaPage() {
  return (
    <div className="w-full h-full">
      <ProductsList productTypeId={3} />
    </div>
  );
}
