"use client";
import { Filter, RotateCcw, Search } from 'lucide-react';
import { OrderStatus } from '@/types/order';
import React from 'react';

interface FilterValues {
  search: string;
  orderStatus: string;
  startDate: string;
  endDate: string;
}

interface OrderFilterProps {
  filters: FilterValues;
  onFilterChange: (key: keyof FilterValues, value: string) => void;
}

export default function OrderFilter({ filters, onFilterChange }: OrderFilterProps) {
  
  const handleReset = () => {
    onFilterChange('search', '');
    onFilterChange('orderStatus', '');
    onFilterChange('startDate', '');
    onFilterChange('endDate', '');
  };

  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 border rounded-lg shadow-sm">
      <div className="flex items-center border rounded-lg px-3 py-2 bg-gray-50">
        <Search size={18} className="text-gray-400" />
        <input
          suppressHydrationWarning={true}
          type="text"
          name="search"
          placeholder="Search by name, address..."
          className="ml-2 outline-none border-none bg-transparent text-sm w-48"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>

      <input suppressHydrationWarning={true} type="date" name="startDate" value={filters.startDate} onChange={(e) => onFilterChange('startDate', e.target.value)} className="p-2 border rounded-lg text-sm bg-gray-50"/>
      <span className="text-gray-400">-</span>
      <input suppressHydrationWarning={true} type="date" name="endDate" value={filters.endDate} onChange={(e) => onFilterChange('endDate', e.target.value)} className="p-2 border rounded-lg text-sm bg-gray-50"/>

      <select 
        suppressHydrationWarning={true}
        name="orderStatus" 
        value={filters.orderStatus} 
        onChange={(e) => onFilterChange('orderStatus', e.target.value)}
        className="p-2 border rounded-lg text-sm bg-gray-50"
      >
        <option value="">All Statuses</option>
        {Object.values(OrderStatus).map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
      
      <button suppressHydrationWarning={true} onClick={handleReset} className="flex items-center gap-2 text-sm text-gray-600 hover:text-black font-medium">
        <RotateCcw size={16}/> Reset Filter
      </button>
    </div>
  );
}