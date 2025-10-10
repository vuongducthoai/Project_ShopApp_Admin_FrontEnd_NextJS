"use client";
import { useState, useRef, useEffect, ElementType } from "react";
import { Search, Filter, Calendar, Plus, Download, User, ShieldCheck, ChevronDown, LayoutGrid } from "lucide-react";
import FilterDropdown from "./FilterDropdown";

type UserFilterProps = {
  filters: { search: string; role: string; status: string | number };
  onFilterChange: (name: string, value: string | number) => void;
  onAddUserClick: () => void;
}

export default function UserFilter({filters, onFilterChange, onAddUserClick} : UserFilterProps) {
    const roleOptions = [
    {label: "All",  value: "",icon: LayoutGrid},
    { label: "Admin", value: "Admin" ,icon: ShieldCheck },
    { label: "Customer", value: "Customer" ,icon: User },
  ];

  const statusOptions = [
    {label: "All", value: "", icon: LayoutGrid},
    {label: "Active", value: 1, icon: ShieldCheck},
    {label: "Banned", value: 0, icon: User},
  ]

  const handleDropdownSelect = (name: 'role' | 'status', value: string) => {
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-wrap justify-between items-center gap-4 bg-[#F9FAFB] p-4 rounded-lg">
      <div className="flex gap-2 flex-wrap items-center">
        {/* Search */}
        <div className="flex items-center border rounded-[20px] px-4 py-1">
          <Search size={18} className="text-gray-500" />
          <input
            suppressHydrationWarning
            type="text"
            placeholder="Search"
            className="ml-2 outline-none border-none"
            value={filters.search} 
            onChange={(e) => onFilterChange('search', e.target.value)}
          />  
        </div>

        <FilterDropdown 
          label="Role" 
          icon={User} 
          options={roleOptions} 
          selectedValue = {filters.role}  
          onSelect={(value) => onFilterChange('role', value)}

        />
        <FilterDropdown 
          label="Status" 
          icon={ShieldCheck} 
          options={statusOptions}
          selectedValue = {filters.status}
          onSelect={(value) => onFilterChange('status', value)}
          />
      </div>

      <div className="flex gap-2">
        <button suppressHydrationWarning className="flex items-center gap-1 border rounded-[20px] px-3 py-1 hover:bg-gray-50 cursor-pointer">
          <Download size={16} /> Export
        </button>
        <button suppressHydrationWarning 
                className="flex items-center gap-1 bg-blue-600 text-white rounded-[20px] px-3 py-1 hover:bg-blue-700 cursor-pointer"
                onClick={onAddUserClick}
                >
          <Plus size={16} /> Add User
        </button>
      </div>
    </div>
  );
}
