"use client";
import Link from "next/link";
import { 
  Home, Box, ShoppingCart, User, 
  MessageSquare, Ticket, Bell, 
  Settings, LogOut 
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-60 h-screen bg-white border-r p-4 flex flex-col">
      <h1 className="text-xl font-bold text-blue-600 mb-6">DashStack</h1>
      <nav className="flex-1 space-y-2">
    <Link
          href="/"
          className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded 
                    font-nunito font-semibold text-[14px] leading-[100%] tracking-[0.3px] mb-[1px]"
        >
          <Home size={18}/> Dashboard
    </Link>


         <Link href="/users" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <User size={18}/> User
        </Link>
        <Link href="/orders" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
           <ShoppingCart size={18}/> Order Lists
        </Link>
        <Link href="/products" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <Box size={18}/> Products
        </Link>
        <Link href="/comments" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <MessageSquare size={18}/> Comment
        </Link>
        <Link href="/coupons" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <Ticket size={18}/> Coupon
        </Link>
        <Link href="/notifications" className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded">
          <Bell size={18}/> Notify
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
