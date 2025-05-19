"use client";

import React from "react";
import ProductsList from "@/components/products-interface";

export default function CityHousePage() {
  return (
    <div className="w-full h-full">
      <ProductsList productTypeId={2} />
    </div>
  );
}
