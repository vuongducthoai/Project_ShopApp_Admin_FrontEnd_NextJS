"use client";
import { getStatisticsSale } from "@/services/statisticsService";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { name: "Jan", sales: 4000 },
//   { name: "Feb", sales: 3000 },
//   { name: "Mar", sales: 5000 },
//   { name: "Apr", sales: 4780 },
//   { name: "May", sales: 5890 },
//   { name: "Jun", sales: 4390 },
//   { name: "Jul", sales: 4490 },
//   { name: "Aug", sales: 4700 },
//   { name: "Sep", sales: 5200 },
//   { name: "Oct", sales: 6300 },
//   { name: "Nov", sales: 5800 },
//   { name: "Dec", sales: 6900 },
// ];
interface SaleStatistics{
  month: number;
  total: number;
}

export default function SalesChart() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [saleStatistics, setSaleStatistics] = useState<SaleStatistics[]>([]);
  const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchSaleStatistics = async () => {
        try {
          setLoading(true);
          setError("");
          const res = await getStatisticsSale(selectedYear);
          console.log("Dữ liệu từ API:", res);
          setSaleStatistics(Array.isArray(res) ? res : []);
  
        } catch (err) {
          console.error(err);
          setError("Không thể tải được thống kê");
        } finally {
          setLoading(false);
        }
      };
  
      fetchSaleStatistics();
    }, [selectedYear]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = Number(e.target.value);
    setSelectedYear(year);
    // TODO: gọi API getSaleStatsIn1Year(year) ở đây nếu bạn có backend
  };

  if (loading) return <p>Đang tải thống kê...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
      {/* Tiêu đề + dropdown chọn năm */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Sales Details
        </h2>
         
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-700">Year:</span>
          <select
            value={selectedYear}
            onChange={handleYearChange}
            className="border border-gray-300 rounded-lg px-3 py-1 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart 
            data={saleStatistics} 
            margin={{ top: 10, right: 30, left: 40, bottom: 0 }} 
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" />
            <YAxis
              stroke="#9ca3af"
              tickFormatter={(value) =>
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
            <Tooltip
              labelFormatter={() => ""} 
              formatter={(value) =>
                new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(value as number)
              }
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>

      </div>
    </div>
  );
}
