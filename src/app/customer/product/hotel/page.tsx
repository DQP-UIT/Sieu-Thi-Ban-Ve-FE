"use client";

import React from "react";
import ProductsList from "@/components/products-interface";

export default function HotelPage() {
  return (
    <div className="w-full h-full">
      <ProductsList productTypeId={4} />
    </div>
  );
}
