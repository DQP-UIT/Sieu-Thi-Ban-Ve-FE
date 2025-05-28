"use client";

import { IProduct } from "@/types/type";
import DesignModal from "./design-modal";
import { useSelectedProduct } from "@/store/product-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DesignCardProps {
  design: IProduct;
}

const DesignCard: React.FC<DesignCardProps> = ({ design }) => {
  const setProduct = useSelectedProduct((p) => p.setProduct);
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleOnClick = () => {
    setProduct(design);
    router.push("/customer/product");
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div
      className="card bg-base-300 w-72 md:w-96 shadow-sm transform transition-all duration-500 ease-out hover:scale-105 hover:shadow-2xl hover:bg-blue-500/50 group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative overflow-hidden">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="w-full h-48 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={design.images2D[0]}
          alt={design.name}
          className={`w-full h-48 object-cover transition-all duration-700 ease-out transform group-hover:scale-110 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/30 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Floating price tag */}
        <div
          className={`absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold transform transition-all duration-300 ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-80"
          }`}
        >
          {formatPrice(design.cost)}
        </div>
      </figure>

      <div className="card-body relative">
        {/* Title with hover effect */}
        <h2 className="card-title text-lg transition-colors duration-300 group-hover:text-blue-600">
          {design.name}
        </h2>

        {/* Property details with staggered animation */}
        <div className="space-y-2">
          <p
            className={`text-gray-400 text-sm transition-all duration-300 delay-100 transform ${
              isHovered ? "translate-x-1 text-gray-300" : "translate-x-0"
            }`}
          >
            <span className="inline-flex items-center gap-1">
              🏢 Tầng: <span className="font-semibold">{design.floor}</span>
            </span>
            <span className="mx-2">|</span>
            <span className="inline-flex items-center gap-1">
              🛏️ Phòng:{" "}
              <span className="font-semibold">{design.numberBedRoom}</span>
            </span>
          </p>

          <p
            className={`text-gray-400 text-sm transition-all duration-300 delay-200 transform ${
              isHovered ? "translate-x-1 text-gray-300" : "translate-x-0"
            }`}
          >
            <span className="inline-flex items-center gap-1">
              📐 Diện tích: <span className="font-semibold">{design.size}</span>
            </span>
          </p>

          <p
            className={`text-md transition-all duration-300 delay-300 transform ${
              isHovered ? "translate-x-1 text-blue-600" : "translate-x-0"
            }`}
          >
            <span className="inline-flex items-center gap-1">
              ✏️ Design by:{" "}
              <span className="font-semibold">{design.designedBy}</span>
            </span>
          </p>
        </div>

        {/* Action buttons with enhanced animations */}
        <div className="card-actions justify-end gap-4 mt-4">
          <button
            className="btn btn-outline btn-primary rounded-lg transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-primary hover:text-white group/btn"
            onClick={handleOnClick}
          >
            <span className="group-hover/btn:mr-1 transition-all duration-200">
              Detail
            </span>
            <span className="transform transition-transform duration-300 group-hover/btn:translate-x-1">
              →
            </span>
          </button>

          <div className="transform transition-all duration-300 hover:scale-110">
            <DesignModal design={design} />
          </div>
        </div>

        {/* Animated border effect */}
        <div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out ${
            isHovered ? "w-full" : "w-0"
          }`}
        />
      </div>

      {/* Floating elements for extra visual appeal */}
      <div
        className={`absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full transform transition-all duration-500 ${
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
      <div
        className={`absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full transform transition-all duration-700 ${
          isHovered ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      />
    </div>
  );
};

export default DesignCard;
