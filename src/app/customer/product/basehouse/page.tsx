"use client";

import React from "react";
import ProductsList from "@/components/products-interface";

export default function BaseHousePage() {
  return (
    <div className="w-full h-full">
      <ProductsList productTypeId={1} />
    </div>
  );
}
