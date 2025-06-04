"use client";

import { IProduct } from "@/types/type";
import DesignModal from "./design-modal";
import { useSelectedProduct } from "@/store/product-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      }}
      className="card bg-base-300 w-72 md:w-96 shadow-sm cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <figure className="relative overflow-hidden">
        {/* Loading skeleton */}
        <AnimatePresence>
          {!imageLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-48 bg-gray-200 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.img
          src={design.images2D[0]}
          alt={design.name}
          className="w-full h-48 object-cover"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: imageLoaded ? 1 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Floating price tag */}
        <motion.div
          className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold"
          initial={{ y: 8, opacity: 0.8 }}
          animate={{
            y: isHovered ? 0 : 8,
            opacity: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        >
          {formatPrice(design.cost)}
        </motion.div>
      </figure>

      <div className="card-body relative">
        {/* Title with hover effect */}
        <motion.h2
          className="card-title text-lg"
          animate={{
            color: isHovered ? "#2563eb" : "currentColor",
          }}
          transition={{ duration: 0.3 }}
        >
          {design.name}
        </motion.h2>

        {/* Property details with staggered animation */}
        <div className="space-y-2">
          <motion.p
            className="text-gray-400 text-sm"
            animate={{
              x: isHovered ? 4 : 0,
              color: isHovered ? "#9ca3af" : "#6b7280",
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span className="inline-flex items-center gap-1">
              🏢 Tầng: <span className="font-semibold">{design.floor}</span>
            </span>
            <span className="mx-2">|</span>
            <span className="inline-flex items-center gap-1">
              🛏️ Phòng:{" "}
              <span className="font-semibold">{design.numberBedRoom}</span>
            </span>
          </motion.p>

          <motion.p
            className="text-gray-400 text-sm"
            animate={{
              x: isHovered ? 4 : 0,
              color: isHovered ? "#9ca3af" : "#6b7280",
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-1">
              📐 Diện tích: <span className="font-semibold">{design.size}</span>
            </span>
          </motion.p>

          <motion.p
            className="text-md"
            animate={{
              x: isHovered ? 4 : 0,
              color: isHovered ? "#2563eb" : "currentColor",
            }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span className="inline-flex items-center gap-1">
              ✏️ Design by:{" "}
              <span className="font-semibold">{design.designedBy}</span>
            </span>
          </motion.p>
        </div>

        {/* Action buttons with enhanced animations */}
        <div className="card-actions justify-end gap-4 mt-4">
          <motion.button
            className="btn btn-outline btn-primary rounded-lg group/btn"
            onClick={handleOnClick}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <motion.span
              animate={{ marginRight: isHovered ? "4px" : "0px" }}
              transition={{ duration: 0.2 }}
            >
              Detail
            </motion.span>
            <motion.span
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{ duration: 0.3 }}
            >
              →
            </motion.span>
          </motion.button>

          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <DesignModal design={design} />
          </motion.div>
        </div>

        {/* Animated border effect */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? "100%" : 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Floating elements for extra visual appeal */}
      <AnimatePresence>
        {isHovered && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.div
              className="absolute -bottom-2 -left-2 w-4 h-4 bg-purple-500 rounded-full"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Additional floating particles */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute top-1/2 left-1/2 pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-32 h-32 border border-blue-300 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ transform: "translate(-50%, -50%)" }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DesignCard;
