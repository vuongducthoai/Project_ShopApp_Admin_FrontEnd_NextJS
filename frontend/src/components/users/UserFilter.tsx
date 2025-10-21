"use client";
import { Search, Filter, Calendar, Plus, Download } from "lucide-react";

export default function UserFilter() {
  return (
    <div className="flex flex-wrap justify-between items-center gap-4 bg-white p-4 border rounded-lg">
      <div className="flex gap-2 flex-wrap">
        <div className="flex items-center border rounded-[20px] px-2">
          <Search size={18} className="text-gray-500" />
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Search"
            className="ml-2 outline-none border-none"
          />
        </div>
        <button className="flex items-center gap-1 border rounded px-3 py-1 hover:bg-gray-50">
          <Filter size={16} /> Role
        </button>
        <button className="flex items-center gap-1 border rounded px-3 py-1 hover:bg-gray-50">
          <Filter size={16} /> Status
        </button>
        <button className="flex items-center gap-1 border rounded px-3 py-1 hover:bg-gray-50">
          <Calendar size={16} /> Date
        </button>
      </div>

      <div className="flex gap-2">
        <button className="flex items-center gap-1 border rounded px-3 py-1 hover:bg-gray-50">
          <Download size={16} /> Export
        </button>
        <button className="flex items-center gap-1 bg-blue-600 text-white rounded px-3 py-1 hover:bg-blue-700">
          <Plus size={16} /> Add User
        </button>
      </div>
    </div>
  );
}
