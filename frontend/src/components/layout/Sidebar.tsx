"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home, Box, ShoppingCart, User,
  MessageSquare, Ticket, Bell,
  Settings, LogOut, Grid
} from "lucide-react";
import { logout } from "@/services/authService";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/users", label: "User", icon: User },
    { href: "/orders", label: "Order Lists", icon: ShoppingCart },
    { href: "/categories", label: "Category", icon: Grid },
    { href: "/products", label: "Products", icon: Box },
    { href: "/comments", label: "Comment", icon: MessageSquare },
    { href: "/coupons", label: "Coupon", icon: Ticket },
    { href: "/notifications", label: "Notify", icon: Bell },
  ];

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    setLoading(true);
    try {
      const message = await logout(token);
      console.log(message); // "Logged out successfully"
      localStorage.removeItem("token");
      router.push("/login");
    } catch (err: any) {
      console.error("Logout error:", err.message);
      localStorage.removeItem("token"); // Ép logout local nếu token lỗi
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <aside className="w-50 h-screen bg-white p-4 flex flex-col">
      <h1 className="text-xl text-center font-bold text-blue-600 mb-6">
        Dash<span className="text-gray-800">Stack</span>
      </h1>

      {/* Navigation links */}
      <nav className="flex-1 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex items-center gap-3 p-2 rounded-lg font-semibold text-sm transition-colors duration-200
                ${isActive ? "bg-[#4880FF] text-white" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="border-t pt-2 space-y-2">
        <Link
          href="/settings"
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
        >
          <Settings size={18} /> Settings
        </Link>

        <button
          suppressHydrationWarning
          onClick={handleLogout}
          disabled={loading}
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full text-left transition disabled:opacity-50"
        >
          <LogOut size={18} />
          {loading ? "Đang đăng xuất..." : "Logout"}
        </button>
      </div>
    </aside>
  );
}
