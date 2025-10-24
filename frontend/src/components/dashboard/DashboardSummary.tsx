"use client";
import { getStatistics } from "@/services/statisticsService";
import { Users, ShoppingCart, DollarSign, Clock } from "lucide-react";
import { useEffect, useState } from "react";


interface Statistics {
  title: string;
  value: number;
  percent: string;
}

export default function DashboardSummary() {
  const [statistics, setStatistics] = useState<Statistics[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSaleStatistics = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await getStatistics();
        console.log("Dữ liệu từ API:", res);
        setStatistics(Array.isArray(res) ? res : []);

      } catch (err) {
        console.error(err);
        setError("Không thể tải được thống kê");
      } finally {
        setLoading(false);
      }
    };

    fetchSaleStatistics();
  }, []);

  const getIcon = (title: string) => {
    switch (title) {
      case "Total User":
        return <Users className="text-purple-500" size={28} />;
      case "Total Order":
        return <ShoppingCart className="text-yellow-500" size={28} />;
      case "Total Sales":
        return <DollarSign className="text-blue-500" size={28} />;
      case "Total Pending":
        return <Clock className="text-orange-500" size={28} />;
      default:
        return null;
    }
  };

  if (loading) return <p>Đang tải thống kê...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statistics.map((item, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between"
        >
          <div>
            <h3 className="text-gray-900 text-base">{item.title}</h3>
            <p className="text-2xl font-bold text-gray-800">{item.value}</p>
            <p className="text-xs mt-1 text-green-500">{item.percent}</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-full">{getIcon(item.title)}</div>
        </div>
      ))}
    </div>
  );
}
