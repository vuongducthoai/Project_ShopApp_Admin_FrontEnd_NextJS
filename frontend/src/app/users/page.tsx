// app/users/page.tsx

"use client";
import { useState } from "react";
import useSWR from "swr"; // Import SWR

import UserTable from "@/components/users/UserTable";
import UserFilter from "@/components/users/UserFilter";
import AddUserModal from "@/components/users/AddUserModal";
import PaginationFooter from "@/components/users/PaginationFooter";

// Định nghĩa hàm fetcher cho SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UsersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  //State cho filter
  const [filters, setFilters] = useState({
    search: '',
    role: '', // 'Admin', 'Customer', '' (all)
    status: '', // 'true', 'false', ''(all)
  })

   const handleFilterChange = (name: string, value: string | number) => {
    setCurrentPage(1); 
    setFilters(prev => ({ ...prev, [name]: value }));
  };

   const params = new URLSearchParams({
    page: String(currentPage),
    limit: String(rowsPerPage),
  });

  if (filters.search) params.append('search', filters.search);
  if (filters.role) params.append('role', filters.role);
  if (filters.status !== '') params.append('status', String(filters.status));


  // Tạo key (URL) cho SWR, nó sẽ tự động thay đổi khi currentPage hoặc rowsPerPage thay đổi
  const apiKey = `${process.env.NEXT_PUBLIC_API_URL}/users?${params.toString()}`;

  // Dùng SWR để fetch dữ liệu
  const { data, error, isLoading } = useSWR(apiKey, fetcher);

 
  
  // Xử lý trạng thái loading và error
  if (error) return <div>Failed to load users. Please try again later.</div>;

  // Lấy dữ liệu đã fetch được
  const users = data?.data || [];
  const totalRows = data?.total || 0;
  const totalPages = data?.totalPages || 0;

  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-500">
          Manage all users in one place. Control access, assign roles, and monitor activity across your platform.
        </p>
      </div>

      <UserFilter 
        filters={filters}
        onFilterChange={handleFilterChange}
        onAddUserClick={() => setIsModalOpen(true)} />
      
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <div className="border rounded-lg overflow-hidden">
        <UserTable users={users} isLoading={isLoading}/>
      </div>

      <PaginationFooter
        totalRows={totalRows}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
}