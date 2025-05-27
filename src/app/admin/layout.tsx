"use client";

import Avatar from "@/components/ui/avatar";
import ThemesController from "@/components/ui/themes-controller";
import { motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RiDashboardLine,
  RiBuildingLine,
  RiUserLine,
  RiCalendarCheckLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

interface AdminMenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const adminMenus: AdminMenuItem[] = [
  {
    name: "Dashboard",
    path: "/admin/report",
    icon: <RiDashboardLine className="w-5 h-5" />,
  },
  {
    name: "Product Manage",
    path: "/admin/products-manage",
    icon: <RiBuildingLine className="w-5 h-5" />,
  },
  {
    name: "User Manage",
    path: "/admin/users-manage",
    icon: <RiUserLine className="w-5 h-5" />,
  },
  {
    name: "Booking Manage",
    path: "/admin/bookings-manage",
    icon: <RiCalendarCheckLine className="w-5 h-5" />,
  },
  {
    name: "Estimate Control",
    path: "/admin/estimate",
    icon: <RiCalendarCheckLine className="w-5 h-5" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="drawer md:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Bar for mobile */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-base-100 px-4 py-2 shadow-md lg:hidden">
          {user ? (
            <Avatar user={user} />
          ) : (
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          )}
          <label
            htmlFor="admin-drawer"
            className="btn btn-square btn-ghost"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <RiMenuLine className="w-6 h-6" />
          </label>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Sidebar / Drawer */}
      <div className="drawer-side z-20">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <div className="min-h-full w-64 bg-base-200 p-4">
          <div className="mb-6 mt-20 flex items-center justify-between">
            {user ? (
              <Avatar user={user} />
            ) : (
              <h2 className="text-lg font-semibold">Admin Menu</h2>
            )}
            {/* Theme controller */}
            <motion.div>
              <ThemesController />
            </motion.div>
          </div>

          <ul className="menu menu-lg p-0 gap-2">
            {adminMenus.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={
                    pathname === item.path
                      ? "active font-medium"
                      : "font-medium"
                  }
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
            className="btn btn-error px-4 btn-sm w-fit mt-6 absolute bottom-4 left-1/2"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
