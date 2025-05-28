"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  RiListCheck2,
  RiPencilRuler2Line,
  RiUploadCloud2Line,
  RiMenuLine,
  RiCloseLine,
  RiLogoutBoxLine,
  RiPaletteLine,
  RiNotificationLine,
  RiSettingsLine,
  RiStarLine,
  RiTimeLine,
  RiCheckboxCircleLine,
} from "react-icons/ri";
import ThemesController from "@/components/ui/themes-controller";
import Avatar from "@/components/ui/avatar";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  description?: string;
  badge?: number;
}

const designerMenus: MenuItem[] = [
  {
    name: "Tasks",
    path: "/designer/task",
    icon: <RiListCheck2 className="w-5 h-5" />,
    description: "Manage your assignments",
  },
  {
    name: "My Designs",
    path: "/designer/design",
    icon: <RiPencilRuler2Line className="w-5 h-5" />,
    description: "View and edit designs",
  },
  {
    name: "Upload Design",
    path: "/designer/upload-design",
    icon: <RiUploadCloud2Line className="w-5 h-5" />,
    description: "Upload new creations",
  },
];

export default function DesignerLayout({
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
    const currentMenu = designerMenus.find((menu) => menu.path === pathname);
    return currentMenu?.name || "Designer Studio";
  };

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      <input
        id="designer-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={(e) => setIsDrawerOpen(e.target.checked)}
      />

      {/* Page Content */}
      <div className="drawer-content flex flex-col">
        {/* Enhanced Top Bar for mobile */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="sticky top-0 z-10 bg-base-100/95 backdrop-blur-md border-b border-base-300 lg:hidden"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <RiPaletteLine className="text-white w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Designer Studio
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

        {/* Main Content with animation */}
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

      {/* Enhanced Sidebar */}
      <div className="drawer-side z-20">
        <label htmlFor="designer-drawer" className="drawer-overlay"></label>

        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="min-h-full w-72 bg-gradient-to-b from-base-200 to-base-300 shadow-2xl"
        >
          {/* Sidebar Header */}
          <div className="sticky bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <RiPaletteLine className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Design Studio</h2>
                <p className="text-purple-100 text-sm">Creative Workspace</p>
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
                Workspace
              </h3>

              <ul className="space-y-2">
                {designerMenus.map((item, index) => {
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
                            ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg"
                            : "bg-base-100 hover:bg-base-100/80 hover:shadow-md"
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            isActive
                              ? "bg-white/20"
                              : "bg-base-200 group-hover:bg-purple-100 group-hover:text-purple-600"
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
                                    ? "badge-white text-purple-600"
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

            {/* Stats Cards */}
            {/* <div className="mb-6 space-y-3">
              <h3 className="text-sm font-semibold text-base-content/70 uppercase tracking-wider">
                Today's Progress
              </h3>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
                  <div className="flex items-center gap-2">
                    <RiCheckboxCircleLine className="text-green-600 w-4 h-4" />
                    <span className="text-xs font-medium text-green-800">
                      Completed
                    </span>
                  </div>
                  <p className="text-lg font-bold text-green-700 mt-1">8</p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-3 border border-orange-200">
                  <div className="flex items-center gap-2">
                    <RiTimeLine className="text-orange-600 w-4 h-4" />
                    <span className="text-xs font-medium text-orange-800">
                      Pending
                    </span>
                  </div>
                  <p className="text-lg font-bold text-orange-700 mt-1">3</p>
                </div>
              </div>
            </div> */}

            {/* Portfolio Stats */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-200 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <RiStarLine className="text-indigo-600" />
                <span className="font-semibold text-indigo-800">
                  Portfolio Stats
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-indigo-700">Total Designs:</span>
                  <span className="font-bold text-indigo-800">{user?.designs}</span>
                </div>
                {/* <div className="flex justify-between">
                  <span className="text-indigo-700">This Month:</span>
                  <span className="font-bold text-indigo-800">5</span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-indigo-600">Monthly Goal</span>
                    <span className="text-indigo-600">5/8</span>
                  </div>
                  <div className="w-full bg-indigo-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: "62.5%" }}
                    ></div>
                  </div>
                </div> */}
              </div>
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
