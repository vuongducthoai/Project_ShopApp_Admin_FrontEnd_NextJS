"use client";

import { useEffect, useState } from "react";
import { Edit } from "lucide-react";
import {createNotificaton, Notification, getAllNotification } from "@/services/notificationService";
import {Filter} from "../../app/notifications/page"


interface NotificationTableProps {
  filters: Filter;
}

export default function NotificationTable({ filters }: NotificationTableProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await getAllNotification({
          page: currentPage.toString(),
          limit: itemsPerPage.toString(),
          type: filters.type || undefined,
        });

        setNotifications(res.data);
        setTotalPages(Math.ceil(res.total / res.limit));
      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách thông báo");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentPage, filters]);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

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
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Message</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {notifications.map((n, i) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2 font-medium">{n.title}</td>
                <td className="px-4 py-2">{n.message}</td>
                <td className="px-4 py-2">{n.type || "-"}</td>
                <td className="px-4 py-2">
                  {new Date(n.createdAt.slice(0,10)).toLocaleDateString('vi-VN')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
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