"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Fengshui", href: "/fengshui" },
  { label: "Estimate", href: "/estimate" },
  { label: "Product", href: "/product" },
];

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full backdrop-blur bg-black/60 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="text-white text-xl font-semibold tracking-tight"
          >
            DesignsRepo
          </Link>
        </motion.div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-sm text-white">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <Link href={link.href} className="hover:text-gray-300 transition">
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* GitHub Button */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://github.com/radix-ui/primitives"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-sm border border-white/30 px-4 py-1.5 rounded-md hover:bg-white hover:text-black transition"
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </header>
  );
}
