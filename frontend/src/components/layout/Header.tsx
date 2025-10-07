// src/components/layout/Header.tsx
"use client";
import { Search, Bell } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4">
      {/* Search bar */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <Search size={18} className="text-gray-500"/>
        <input
          suppressHydrationWarning
          type="text"
          placeholder="Search..."
          className="w-full outline-none"
        />
      </div>

      {/* User actions */}
      <div className="flex items-center gap-4">
        <Bell size={20} className="text-gray-600 cursor-pointer"/>
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm">
            <div className="font-medium">Moni Roy</div>
            <div className="text-gray-500 text-xs">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
