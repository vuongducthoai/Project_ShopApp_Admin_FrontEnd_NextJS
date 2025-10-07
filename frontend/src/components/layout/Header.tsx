"use client";
import { Search, Bell, Menu } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="h-12 bg-red border-b flex items-center justify-between px-4 shadow-sm">
      {/* Left section: Menu + Search */}
      <div className="flex items-center">
        <Menu size={24} className="mr-2 text-gray-600 cursor-pointer" />
        <div className="flex items-center bg-gray-50 border rounded-full px-3 py-1.5 w-full ml-2">
          <Search size={16} className="text-gray-500  mr-2" />
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Search"
            className="w-full bg-transparent outline-none text-sm text-gray-700"
          />
        </div>
      </div>

      {/* Right section: Notifications, Language, Profile */}
      <div className="flex items-center gap-5">
        {/* Notification icon with badge */}
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-3 h-3 flex items-center justify-center"></span>
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1 cursor-pointer">
          <Image
            src="/english.png"
            alt="English"
            width={20}
            height={20}
            className="rounded-sm"
          />
          <span className="text-sm text-gray-700">English</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-3 h-3 text-gray-500"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* User avatar + name */}
        <div className="flex items-center gap-2 cursor-pointer">
          <Image
            src="/avatar.png"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
          <div className="text-sm leading-tight">
            <div className="font-medium">Moni Roy</div>
            <div className="text-gray-500 text-xs">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}
