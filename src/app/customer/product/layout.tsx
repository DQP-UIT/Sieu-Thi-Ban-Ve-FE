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
} from "react-icons/ri";

interface ProductCategory {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const productCategories: ProductCategory[] = [
  {
    name: "Basic House",
    path: "/product/basehouse",
    icon: <RiHome4Line className="w-5 h-5" />,
  },
  {
    name: "City House",
    path: "/product/cityhouse",
    icon: <RiBuildingLine className="w-5 h-5" />,
  },
  {
    name: "Hotel",
    path: "/product/hotel",
    icon: <RiHotelLine className="w-5 h-5" />,
  },
  {
    name: "Villa",
    path: "/product/villa",
    icon: <RiHome8Line className="w-5 h-5" />,
  },
];

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer when changing routes on mobile
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

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
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-base-100 px-4 py-2 shadow-md lg:hidden">
          <h2 className="text-lg font-semibold">DesignsRepo</h2>
          <label
            htmlFor="product-drawer"
            className="btn btn-square btn-ghost"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            {isDrawerOpen ? (
              <RiCloseLine className="h-6 w-6" />
            ) : (
              <RiMenuLine className="h-6 w-6" />
            )}
          </label>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Sidebar / Drawer */}
      <div className="drawer-side z-20">
        <label
          htmlFor="product-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="min-h-full w-64 bg-base-200 p-4">
          <div className="flex items-center justify-between mb-6 mt-20">
            <h2 className="text-xl font-bold">Product Categories</h2>
          </div>

          <ul className="menu menu-lg p-0 gap-2">
            {productCategories.map((category) => (
              <li key={category.path}>
                <Link
                  href={category.path}
                  className={
                    pathname === category.path
                      ? "active font-medium"
                      : "font-medium"
                  }
                >
                  {category.icon}
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-10">
            <div className="rounded-lg bg-base-100 p-4">
              <h3 className="font-semibold">Need custom design?</h3>
              <p className="text-sm mt-1">
                Contact our team for custom blueprint solutions.
              </p>
              <Link
                href="/contact"
                className="btn btn-primary btn-sm w-full mt-3"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
