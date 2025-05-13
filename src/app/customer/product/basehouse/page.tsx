"use client";

import React, { useState, useEffect } from "react";
import DesignList from "@/components/design-list";
import { IProduct, mockProduct } from "@/types/type";
import { RiFilterLine, RiSortDesc } from "react-icons/ri";

// Generate mock data based on the provided mockProduct
const generateMockDesigns = (): IProduct[] => {
  // Create variations of the mockProduct
  return Array.from({ length: 8 }, (_, i) => ({
    ...mockProduct,
    id: i + 1,
    name: `Basic House Design ${i + 1}`,
    cost: 50000000 + i * 5000000,
    floor: (i % 3) + 1,
    square: (100 + i * 20).toString(),
    numberBedRoom: (i % 4) + 2,
    frontAge: 4 + (i % 3),
    images: [
      `https://images.unsplash.com/photo-${
        1580100000 + i * 10000
      }-abcdefghijk?auto=format&fit=crop&w=1200&q=80`,
      mockProduct.images[i % mockProduct.images.length],
    ],
    style: i % 2 === 0 ? "Hiện đại" : "Tối giản",
    description: `Mẫu nhà cơ bản ${i + 1} phòng ngủ với thiết kế ${
      i % 2 === 0 ? "hiện đại" : "tối giản"
    }, phù hợp với gia đình ${i % 2 === 0 ? "nhỏ" : "trung bình"}.`,
  }));
};

export default function BaseHousePage() {
  const [designs, setDesigns] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    setIsLoading(true);
    setTimeout(() => {
      setDesigns(generateMockDesigns());
      setIsLoading(false);
    }, 800);
  }, []);

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-2 mt-16">Basic House Designs</h1>
      <p className="text-gray-600 mb-6">
        Explore our collection of affordable and practical house designs with
        essential features for comfortable living. Perfect for first-time
        homeowners and those with budget constraints.
      </p>

      {/* Filters and sorting */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline btn-sm gap-2">
            <RiFilterLine /> Filters
          </button>
          <select className="select select-bordered select-sm w-full max-w-xs">
            <option disabled selected>
              Bedrooms
            </option>
            <option>2 Bedrooms</option>
            <option>3 Bedrooms</option>
            <option>4+ Bedrooms</option>
          </select>
          <select className="select select-bordered select-sm w-full max-w-xs">
            <option disabled selected>
              Floor
            </option>
            <option>1 Floor</option>
            <option>2 Floors</option>
            <option>3+ Floors</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm">Sort by:</span>
          <select className="select select-bordered select-sm w-full max-w-xs">
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>
      </div>

      {/* Design list */}
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <DesignList designs={designs} />

          {/* Pagination */}
          <div className="flex justify-center mt-10">
            <div className="join">
              <button className="join-item btn btn-sm">«</button>
              <button className="join-item btn btn-sm btn-active">1</button>
              <button className="join-item btn btn-sm">2</button>
              <button className="join-item btn btn-sm">3</button>
              <button className="join-item btn btn-sm">»</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
