// app/orders/page.tsx
"use client";

import { useState } from 'react';
import useSWR from 'swr';
import OrderFilter from '@/components/orders/OrderFilter';
import OrderTable from '@/components/orders/OrderTable';
import PaginationFooter from '@/components/users/PaginationFooter'; 
import { useDebounce } from '@/hooks/useDebounce'; 
import OrderDetailModal from '@/components/orders/OrderDetailModal';
import ProtectedRoute from '@/components/ProtectedRoute';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function OrdersPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    search: '',
    orderStatus: '',
    startDate: '',
    endDate: '',
    paymentMethod: '',
  });
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  
  const debouncedSearch = useDebounce(filters.search, 500);

  const handleFilterChange = (name: string, value: string) => {
    setCurrentPage(1); 
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const params = new URLSearchParams({
    page: String(currentPage),
    limit: String(rowsPerPage),
  });
  if (debouncedSearch) params.append('search', debouncedSearch);
  if (filters.orderStatus) params.append('orderStatus', filters.orderStatus);
  if (filters.startDate) params.append('startDate', filters.startDate);
  if (filters.endDate) params.append('endDate', filters.endDate);
  if (filters.paymentMethod) params.append('paymentMethod', filters.paymentMethod);
  
  const apiKey = `${process.env.NEXT_PUBLIC_API_URL}/orders?${params.toString()}`;

  const { data, error, isLoading, mutate } = useSWR(apiKey, fetcher);

  if (error) return <div className="p-8 text-center text-red-500 font-medium">Failed to load data. Please try again.</div>;

  const orders = data?.data || [];
  const totalRows = data?.total || 0;
  const totalPages = data?.totalPages || 0;

  return (
    <ProtectedRoute>
    <main className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
      
      <OrderFilter filters={filters} onFilterChange={handleFilterChange} />
      
      <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
        <OrderTable 
          orders={orders} 
          isLoading={isLoading} 
          onViewDetails={(id) => setSelectedOrderId(id)}
        />
      </div>

      <PaginationFooter
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalRows={totalRows}
        totalPages={totalPages}
      />

      <OrderDetailModal 
        key={selectedOrderId}
        orderId={selectedOrderId}
        onClose={() => setSelectedOrderId(null)}
        mainMutate={mutate}
      />
    </main>
    </ProtectedRoute>
  );
}