"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RiAdvertisementLine,
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
  RiMenuLine,
} from "react-icons/ri";
import ThemesController from "@/components/ui/themes-controller";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
}

const receptionistMenus: MenuItem[] = [
  {
    name: "Advertisement",
    path: "/receptionist/advertisement",
    icon: <RiAdvertisementLine className="w-5 h-5" />,
  },
  {
    name: "Revenue",
    path: "/receptionist/revenue-report",
    icon: <RiMoneyDollarCircleLine className="w-5 h-5" />,
  },
  {
    name: "Booking",
    path: "/receptionist/booking-manage",
    icon: <RiCalendarCheckLine className="w-5 h-5" />,
  },
];

export default function ReceptionistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="drawer md:drawer-open">
      <input
        id="receptionist-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Bar for mobile */}
        <div className="sticky top-0 z-10 flex items-center justify-between bg-base-100 px-4 py-2 shadow-md lg:hidden">
          <h2 className="text-lg font-semibold">Receptionist Panel</h2>
          <label
            htmlFor="receptionist-drawer"
            className="btn btn-square btn-ghost"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <RiMenuLine className="w-6 h-6" />
          </label>
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-20">
        <label htmlFor="receptionist-drawer" className="drawer-overlay"></label>
        <div className="min-h-full w-64 bg-base-200 p-4">
          <div className="mb-6 mt-20 flex items-center justify-between">
            <h2 className="text-xl font-bold">Receptionist Menu</h2>
            <motion.div>
              <ThemesController />
            </motion.div>
          </div>

          <ul className="menu menu-lg p-0 gap-2">
            {receptionistMenus.map((item) => (
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
        </div>
      </div>
    </div>
  );
}
