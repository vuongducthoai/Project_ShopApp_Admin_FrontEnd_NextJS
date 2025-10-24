"use client";

import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import CouponStatusBadge from "./CouponsStatusBadge";
import { Coupon, Filter } from "@/app/coupons/page";
import { getCoupons, toggleStatusCoupon } from "@/services/couponService";
import ToggleSwitch from "./ToggleSwitch";

interface CouponTableProps {
  onUpdateCoupon: (coupon: Coupon) => void,
  filters: Filter
}

export default function CouponTable({ onUpdateCoupon, filters }: CouponTableProps) {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const itemsPerPage = 5;

  // Fetch API mỗi khi currentPage thay đổi
 useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getCoupons({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          code: filters.code || undefined,
          isActive: filters.isActive || undefined,
          startDate: filters.startDate || undefined,
          endDate: filters.endDate || undefined,
          maxDiscountValue: filters.maxDiscountValue || undefined,
        });

        setCoupons(res.data);
        setTotalPages(Math.ceil(res.total / res.limit));
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách coupon");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [currentPage, filters]); 

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);


  const handleToggleActive = async (id: string) => {
    try {
      await toggleStatusCoupon(id);
    } catch (err: any) {
      setError(err.message);
    }
    setCoupons(prev =>
      prev.map(coupon =>
        coupon.id === id
          ? { ...coupon, isActive: !coupon.isActive } 
          : coupon
      )
    );
  };

  
  // Hàm sinh danh sách số trang rút gọn
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  if (loading)
    return <p className="text-center text-gray-500 py-6">Đang tải dữ liệu...</p>;
  if (error)
    return <p className="text-center text-red-500 py-6">{error}</p>;

  return (
    <div className="bg-white border rounded-lg shadow-sm flex flex-col">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Code</th>
              <th className="px-4 py-3 text-left">Discount(%)</th>
              <th className="px-4 py-3 text-left">Max Discount</th>
              <th className="px-4 py-3 text-left">Start Date</th>
              <th className="px-4 py-3 text-left">End Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Used</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((u, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{u.code}</td>
                <td className="px-4 py-2">{u.discountValue}%</td>
                <td className="px-4 py-2">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(u.maxDiscount)}
                </td>
                <td className="px-4 py-2">{u.startDate.split("T")[0]}</td>
                <td className="px-4 py-2">{u.endDate.split("T")[0]}</td>
                <td className="px-4 py-2">
                  <CouponStatusBadge
                    status={u.isActive ? "Active" : "Inactive"}
                  />
                </td>
                <td className="px-4 py-2">{u.usedCount}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    className="p-1 hover:bg-gray-100 rounded"
                    onClick={() => onUpdateCoupon(u)}
                  >
                    <Edit size={16} />
                  </button>
                  <ToggleSwitch
                    isOn={!!u.isActive}
                    onToggle={() => handleToggleActive(u.id || "")}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-2 p-4 border-t mt-auto bg-gray-50 rounded-b-lg">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-3 py-1 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={idx} className="px-2 text-gray-500 select-none">
              ...
            </span>
          ) : (
            <button
              key={idx}
              onClick={() => setCurrentPage(page as number)}
              className={`px-3 py-1 rounded-lg text-sm font-medium ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-3 py-1 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
}
