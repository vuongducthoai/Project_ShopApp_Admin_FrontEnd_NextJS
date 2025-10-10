"use client"

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"

type PaginationFooterProps = {
  totalRows: number;
  totalPages: number;
  rowsPerPage: number;
  setRowsPerPage: (size: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export default function PaginationFooterProps({
    totalRows,
    totalPages,
    rowsPerPage,
    setRowsPerPage,
    currentPage,
    setCurrentPage
}: PaginationFooterProps) {
    
    const handlePageChange = (newPage : number) => {
        if(newPage >= 1 && newPage <= totalPages){
            setCurrentPage(newPage);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        //Luon hien thi trang 1
        pageNumbers.push(1);

        //Hien thi '...' neu can
        if(currentPage > 3){
            pageNumbers.push('...');
        }

        // Hiển thị trang liền trước, trang hiện tại, và trang liền sau
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
            pageNumbers.push(i);
        }
        }
        
        // Hiển thị '...' nếu cần
        if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
        }
        
        // Luôn hiển thị trang cuối nếu có nhiều hơn 1 trang
        if (totalPages > 1) {
        pageNumbers.push(totalPages);
        }
        
        return pageNumbers;
    };

     return (
     <div className="
        fixed
        bottom-0
        left-50
        right-0
        flex 
        justify-between 
        items-center 
        p-3.5
        bg-gray-100 
        border-t
        z-10
        ">
      {/* Left Side: Rows per page */}
      <div className="flex items-center gap-2 text-sm">
        <span>Rows per page</span>
        <select
          suppressHydrationWarning
          value={rowsPerPage}
          onChange={(e) => setRowsPerPage(Number(e.target.value))}
          className="p-1 border rounded-md cursor-pointer"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-gray-500">of {totalRows} rows</span>
      </div>

      {/* Right Side: Pagination */}
      <div className="flex items-center gap-1">
        <button
          suppressHydrationWarning
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="p-2 disabled:opacity-50 cursor-pointer"
        >
          <ChevronsLeft size={18} />
        </button>
        <button
          suppressHydrationWarning
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="flex items-center gap-1">
          {renderPageNumbers().map((page, index) =>
            typeof page === 'number' ? (
              <button
                suppressHydrationWarning
                key={index}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded-full border-gray-400 cursor-pointer ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-3 py-1">...</span>
            )
          )}
        </div>

        <button
          suppressHydrationWarning
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 disabled:opacity-50 cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>
        <button
          suppressHydrationWarning
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 disabled:opacity-50 cursor-pointer"
        >
          <ChevronsRight size={18} />
        </button>
      </div>
    </div>
  );
}