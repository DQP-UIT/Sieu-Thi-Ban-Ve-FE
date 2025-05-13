"use client";

import Link from "next/link";
import {
  RiHome4Line,
  RiBuildingLine,
  RiHotelLine,
  RiHome8Line,
} from "react-icons/ri";

// Product category cards that match your layout navigation
const productCategories = [
  {
    name: "Basic House",
    path: "/product/basehouse",
    icon: <RiHome4Line className="w-8 h-8" />,
    description:
      "Affordable and practical house designs with essential features for comfortable living.",
  },
  {
    name: "City House",
    path: "/product/cityhouse",
    icon: <RiBuildingLine className="w-8 h-8" />,
    description:
      "Modern urban designs optimized for city lots with space-efficient layouts.",
  },
  {
    name: "Hotel",
    path: "/product/hotel",
    icon: <RiHotelLine className="w-8 h-8" />,
    description:
      "Professional hospitality blueprints from boutique hotels to large commercial properties.",
  },
  {
    name: "Villa",
    path: "/product/villa",
    icon: <RiHome8Line className="w-8 h-8" />,
    description:
      "Luxury residential designs with premium features and elegant architectural elements.",
  },
];

export default function ProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 mt-20">Design Blueprints Collection</h1>
      <p className="text-lg mb-8">
        Welcome to our comprehensive collection of house design blueprints.
        Please select a category from the sidebar or below to explore our
        designs.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {productCategories.map((category) => (
          <div key={category.path} className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-primary">{category.icon}</span>
                <h2 className="card-title">{category.name}</h2>
              </div>
              <p>{category.description}</p>
              <div className="card-actions justify-end mt-4">
                <Link href={category.path} className="btn btn-primary">
                  Browse Designs
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
