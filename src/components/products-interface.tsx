"use client";

import React, { useState, useEffect } from "react";
import DesignList from "@/components/design-list";
import { IProduct } from "@/types/type";
import { RiFilterLine } from "react-icons/ri";
import axios from "axios";

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

const ITEMS_PER_PAGE = 8;

interface ProductsListProps {
  productTypeId: number;
}

const ProductsList: React.FC<ProductsListProps> = ({ productTypeId }) => {
  const [designs, setDesigns] = useState<IProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [bedroomFilter, setBedroomFilter] = useState("");
  const [floorFilter, setFloorFilter] = useState("");
  const [sortBy, setSortBy] = useState("price_asc");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}/product/product/filter?productTypeId=${productTypeId}`
      )
      .then((res) => {
        const data = normalizeProducts(res.data);
        setTimeout(() => {
          setDesigns(data);
          setIsLoading(false);
        }, 800);
      });
  }, []);

  // Filter & Sort
  const filteredDesigns = designs
    .filter((d) => {
      if (bedroomFilter) {
        const minBedrooms = parseInt(bedroomFilter);
        if (bedroomFilter === "4") {
          if (d.numberBedRoom < 4) return false;
        } else if (d.numberBedRoom !== minBedrooms) return false;
      }
      if (floorFilter) {
        const minFloors = parseInt(floorFilter);
        if (floorFilter === "3") {
          if (d.floor < 3) return false;
        } else if (d.floor !== minFloors) return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.cost - b.cost;
        case "price_desc":
          return b.cost - a.cost;
        default:
          return b.id - a.id;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredDesigns.length / ITEMS_PER_PAGE);
  const paginatedDesigns = filteredDesigns.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold mb-2 mt-16">Basic House Designs</h1>
      <p className="text-gray-600 mb-6">
        Explore our collection of affordable and practical house designs.
      </p>

      {/* Filters */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <div className="flex flex-wrap gap-2">
          <button className="btn btn-outline btn-sm gap-2">
            <RiFilterLine /> Filters
          </button>
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={bedroomFilter}
            onChange={(e) => {
              setBedroomFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Bedrooms</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4+ Bedrooms</option>
          </select>
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={floorFilter}
            onChange={(e) => {
              setFloorFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">All Floors</option>
            <option value="1">1 Floor</option>
            <option value="2">2 Floors</option>
            <option value="3">3+ Floors</option>
          </select>
        </div>

        {/* Sort */}
        <div className="flex items-center gap-2">
          <span className="text-sm px-1 min-w-16">Sort by:</span>
          <select
            className="select select-bordered select-sm w-full max-w-xs"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Design List */}
      {isLoading ? (
        <div className="w-full flex justify-center items-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <DesignList designs={paginatedDesigns} />

          {/* Pagination UI */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="join">
                <button
                  className="join-item btn btn-sm"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  «
                </button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    className={`join-item btn btn-sm ${
                      currentPage === i + 1 ? "btn-active" : ""
                    }`}
                    onClick={() => goToPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  className="join-item btn btn-sm"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProductsList;