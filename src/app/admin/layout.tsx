"use client";

import Avatar from "@/components/ui/avatar";
import ThemesController from "@/components/ui/themes-controller";
import { motion, AnimatePresence } from "framer-motion";
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
  RiLogoutBoxLine,
  RiNotificationLine,
  RiSettingsLine,
  RiShieldUserLine,
  RiBarChartLine,
} from "react-icons/ri";

interface AdminMenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  description?: string;
  badge?: number;
}

const adminMenus: AdminMenuItem[] = [
  {
    name: "Dashboard",
    path: "/admin/report",
    icon: <RiDashboardLine className="w-5 h-5" />,
    description: "Overview & Analytics",
  },
  {
    name: "Product Manage",
    path: "/admin/products-manage",
    icon: <RiBuildingLine className="w-5 h-5" />,
    description: "Manage Design Products",
  },
  {
    name: "User Manage",
    path: "/admin/users-manage",
    icon: <RiUserLine className="w-5 h-5" />,
    description: "User Administration",
  },
  {
    name: "Booking Manage",
    path: "/admin/bookings-manage",
    icon: <RiCalendarCheckLine className="w-5 h-5" />,
    description: "Handle Bookings",
  },
  {
    name: "Estimate Control",
    path: "/admin/estimate",
    icon: <RiBarChartLine className="w-5 h-5" />,
    description: "Cost Estimation",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const getCurrentPageTitle = () => {
    const currentMenu = adminMenus.find((menu) => menu.path === pathname);
    return currentMenu?.name || "Admin Panel";
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <input
        id="admin-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Enhanced Top Bar */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-10 bg-base-100/95 backdrop-blur-md border-b border-base-300 lg:hidden"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <RiShieldUserLine className="text-white w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Admin Panel
                </h2>
                <p className="text-xs text-gray-500">{getCurrentPageTitle()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Notifications */}
              <button className="btn btn-ghost btn-circle btn-sm">
                <div className="indicator">
                  <RiNotificationLine className="w-5 h-5" />
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>

              {/* User Avatar */}
              {user && <Avatar user={user} />}

              {/* Menu Toggle */}
              <button
                className="btn btn-ghost btn-circle"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                <AnimatePresence mode="wait">
                  {isDrawerOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RiCloseLine className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RiMenuLine className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main content with animation */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-4 md:p-6 lg:p-8"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Enhanced Sidebar / Drawer */}
      <div className="drawer-side z-20">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>

        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="min-h-full w-72 bg-gradient-to-b from-base-200 to-base-300 shadow-2xl"
        >
          {/* Sidebar Header */}
          <div className="sticky bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <RiShieldUserLine className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Admin Portal</h2>
                <p className="text-blue-100 text-sm">Management Dashboard</p>
              </div>
            </motion.div>

            {/* User Info */}
            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 p-3 bg-white/10 rounded-xl backdrop-blur-sm"
              >
                <Avatar user={user} />
                <div className="flex-1 min-w-0">
                  {/* Theme Controller */}
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-base-content/70 uppercase tracking-wider mb-3">
                      {user.fullName}
                    </h3>
                    <ThemesController />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Navigation Menu */}
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-base-content/70 uppercase tracking-wider mb-3">
                Navigation
              </h3>

              <ul className="space-y-2">
                {adminMenus.map((item, index) => {
                  const isActive = pathname === item.path;
                  return (
                    <motion.li
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <Link
                        href={item.path}
                        className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
                          isActive
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                            : "bg-base-100 hover:bg-base-100/80 hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-white/20"
                              : "bg-base-200 group-hover:bg-blue-100 group-hover:text-blue-600"
                          }`}
                        >
                          {item.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-medium truncate">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span
                                className={`badge badge-sm ${
                                  isActive
                                    ? "badge-white text-blue-600"
                                    : "badge-primary"
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p
                              className={`text-xs truncate mt-1 ${
                                isActive
                                  ? "text-white/80"
                                  : "text-base-content/60"
                              }`}
                            >
                              {item.description}
                            </p>
                          )}
                        </div>

                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
            {/* Logout Button */}
            <div className="flex-1 min-w-0">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                onClick={() =>
                  signOut({ redirect: true, callbackUrl: "/login" })
                }
                className="btn btn-error w-full gap-2 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <RiLogoutBoxLine className="w-4 h-4" />
                Sign Out
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
