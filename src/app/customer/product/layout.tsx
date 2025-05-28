"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  RiHome4Line,
  RiBuildingLine,
  RiHotelLine,
  RiHome8Line,
  RiMenuLine,
  RiCloseLine,
  RiPhoneLine,
  RiStarFill,
} from "react-icons/ri";

interface ProductCategory {
  name: string;
  path: string;
  icon: React.ReactNode;
  description: string;
  count?: number;
}

const productCategories: ProductCategory[] = [
  {
    name: "Basic House",
    path: "/customer/product/basehouse",
    icon: <RiHome4Line className="w-5 h-5" />,
    description: "Simple and practical designs",
  },
  {
    name: "City House",
    path: "/customer/product/cityhouse",
    icon: <RiBuildingLine className="w-5 h-5" />,
    description: "Modern urban living spaces",
  },
  {
    name: "Hotel",
    path: "/customer/product/hotel",
    icon: <RiHotelLine className="w-5 h-5" />,
    description: "Commercial hospitality designs",
  },
  {
    name: "Villa",
    path: "/customer/product/villa",
    icon: <RiHome8Line className="w-5 h-5" />,
    description: "Luxury residential designs",
  },
];

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();

  // Animation on mount
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Close drawer when changing routes on mobile
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  const getCurrentCategory = () => {
    return (
      productCategories.find((cat) => pathname === cat.path)?.name || "Products"
    );
  };

  return (
    <div className="drawer lg:drawer-open">
      <input
        id="product-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />

      {/* Page content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Enhanced Navbar for mobile */}
        <div className="sticky top-0 z-10 bg-base-100/95 backdrop-blur-md border-b border-base-300 lg:hidden">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">DR</span>
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  DesignsRepo
                </h2>
                <p className="text-xs text-gray-500">{getCurrentCategory()}</p>
              </div>
            </div>

            <button
              className="btn btn-ghost btn-circle hover:bg-base-200 transition-all duration-300"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <div className="relative">
                <RiMenuLine
                  className={`h-6 w-6 transition-all duration-300 ${
                    isDrawerOpen
                      ? "rotate-180 opacity-0"
                      : "rotate-0 opacity-100"
                  }`}
                />
                <RiCloseLine
                  className={`h-6 w-6 absolute top-0 left-0 transition-all duration-300 ${
                    isDrawerOpen
                      ? "rotate-0 opacity-100"
                      : "rotate-180 opacity-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Main content with better padding */}
        <main className="flex-1 bg-gradient-to-br from-base-100 to-base-200/30 p-4 md:p-6 lg:p-8">
          <div
            className={`transition-all duration-700 ease-out ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            {children}
          </div>
        </main>
      </div>

      {/* Enhanced Sidebar / Drawer */}
      <div className="drawer-side z-20">
        <label
          htmlFor="product-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="min-h-full w-72 bg-gradient-to-b from-base-200 to-base-300 shadow-2xl">
          {/* Sidebar Header */}
          <div className="sticky mt-16 bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <span className="text-white font-bold">DR</span>
              </div>
              <div>
                <h2 className="text-xl font-bold">DesignsRepo</h2>
                <p className="text-blue-100 text-sm">
                  Find your perfect design
                </p>
              </div>
            </div>
          </div>

          {/* Categories Section */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-base-content mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                Product Categories
              </h3>
              <p className="text-sm text-base-content/70">
                Explore our collection of architectural designs
              </p>
            </div>

            <ul className="space-y-2">
              {productCategories.map((category, index) => {
                const isActive = pathname === category.path;
                return (
                  <li key={category.path}>
                    <Link
                      href={category.path}
                      className={`group relative block p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                        isActive
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                          : "bg-base-100 hover:bg-base-100/80 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-white/20"
                              : "bg-base-200 group-hover:bg-blue-100 group-hover:text-blue-600"
                          }`}
                        >
                          {category.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{category.name}</span>
                            {category.count && (
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  isActive
                                    ? "bg-white/20 text-white"
                                    : "bg-base-200 text-base-content/70"
                                }`}
                              >
                                {category.count}
                              </span>
                            )}
                          </div>
                          <p
                            className={`text-xs mt-1 ${
                              isActive
                                ? "text-white/80"
                                : "text-base-content/60"
                            }`}
                          >
                            {category.description}
                          </p>
                        </div>
                      </div>

                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Stats Section */}
          {/* <div className="px-6 mb-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <RiStarFill className="text-yellow-500" />
                <span className="font-semibold text-green-800">
                  Featured Designs
                </span>
              </div>
              <p className="text-sm text-green-700">
                Over <span className="font-bold">123 premium designs</span>{" "}
                available
              </p>
            </div>
          </div> */}

          {/* Contact CTA */}
          <div className="px-6 pb-6 mt-auto">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <RiPhoneLine className="w-4 h-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-orange-800 mb-1">
                    Need Custom Design?
                  </h3>
                  <p className="text-sm text-orange-700 mb-3">
                    Our expert architects are ready to create your perfect
                    blueprint.
                  </p>
                  <Link
                    href="/customer/contact"
                    className="btn btn-sm bg-gradient-to-r from-orange-500 to-red-500 text-white border-none hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 w-full"
                  >
                    Contact Us Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
