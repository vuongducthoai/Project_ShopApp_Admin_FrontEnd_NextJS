"use client";
import Link from "next/link";
import { Home, Box, Mail, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-white border-r p-4 flex flex-col">
      <h1 className="text-xl font-bold text-blue-600 mb-6">DashStack</h1>
      <nav className="flex-1 space-y-2">
        <Link href="/" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <Home size={18}/> Dashboard
        </Link>
        <Link href="/products" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <Box size={18}/> Products
        </Link>
        <Link href="/inbox" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <Mail size={18}/> Inbox
        </Link>
      </nav>
      <div className="border-t pt-2 space-y-2">
        <Link href="/settings" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <Settings size={18}/> Settings
        </Link>
      <button
        suppressHydrationWarning
        className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded w-full"
      >
    <LogOut size={18}/> Logout
</button>


      </div>
    </aside>
  );
}
