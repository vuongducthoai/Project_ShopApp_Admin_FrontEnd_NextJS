/* eslint-disable @next/next/no-img-element */
"use client";

import { exportOrderToPDF, getOrders } from "@/services/statisticsService";
import { useEffect, useMemo, useState } from "react";

interface ImageProduct {
  id: string;
  imageProduct: string;
}

interface Product {
  id: string;
  productName: string;
  listImage: ImageProduct[];
}

interface OrderItem {
  id: string;
  product: Product;
  price: number;
  size: string;
  quantity: number;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
}

interface Order {
  id: string;
  orderDate: string;
  orderStatus: string;
  user: User;
  orderItems: OrderItem[];
  addressDelivery: string;
  createdAt: string;
  updatedAt: string;
  coupon?: string; 
}

interface DealDetailProps {
  selectedYear: number;
}

export default function DealDetail({ selectedYear }: DealDetailProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string>("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>{
    const fetchOrders = async ()=>{
       try {
        setLoading(true);
        setError("");
        const res = await getOrders(selectedMonth, selectedYear.toString());
        console.log("Dữ liệu từ API:", res);
        setOrders(res);

      } catch (err) {
        console.error(err);
        setError("Không thể tải danh sách order");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();

  }, [selectedMonth, selectedYear])

  const months = [
    "All",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];

  const totalBill = useMemo(() => {
  if (!selectedOrder) return 0;
  return selectedOrder.orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
}, [selectedOrder]);


  if (loading) return <p>Đang tải danh sách đơn hàng...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white shadow rounded-2xl p-6 relative">
      {/* Tiêu đề và dropdown */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Deal Detail</h2>

        <div className="flex items-center gap-2">
        <span className="text-lg font-semibold text-gray-700">Month:</span>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        </div>
        
      </div>

      {/* Bảng danh sách đơn hàng */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-2 text-left">Order ID</th>
              <th className="px-4 py-2 text-left">User</th>
              <th className="px-4 py-2 text-left">Date-Time</th>
              <th className="px-4 py-2 text-left">Detail</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{order.id}</td>
                <td className="px-4 py-2">
                  {order.user.firstName} {order.user.lastName}
                </td>
                <td className="px-4 py-2">
                  {new Date(order.orderDate).toLocaleString()}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="text-blue-600 hover:underline font-medium"
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                </td>
                <td className="px-4 py-2">
                  {(() => {
                    const statusColors: Record<string, string> = {
                      ORDERED: "bg-blue-100 text-blue-700",
                      CONFIRMED: "bg-green-100 text-green-700",
                      SHIPPED: "bg-yellow-100 text-yellow-700",
                      COMPLETED: "bg-emerald-100 text-emerald-700",
                      CANCELLED: "bg-red-100 text-red-700",
                      FEEDBACKED: "bg-purple-100 text-purple-700",
                    };
                    const colorClass = statusColors[order.orderStatus] || "bg-gray-100 text-gray-700";
                    return (
                      <span className={`px-2 py-1 text-xs font-medium rounded ${colorClass}`}>
                        {order.orderStatus}
                      </span>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedOrder && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50"
          onClick={() => setSelectedOrder(null)}
        >
          <div
            className="relative bg-white/70 backdrop-blur-lg rounded-2xl p-6 shadow-lg max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nút X đỏ */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl font-bold"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center">
              Order Detail
            </h3>

            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOrder.user.firstName}{" "}
              {selectedOrder.user.lastName}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.orderDate).toLocaleString()}
            </p>
            <p className="flex justify-between items-center mt-2">
              <span>
                <strong>Total:</strong> {totalBill.toLocaleString()} ₫
              </span>

              <button
                onClick={() => exportOrderToPDF(selectedOrder.id)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"

              >
                Export PDF
              </button>
            </p>


            <div className="border-t pt-3 mt-3">
              <h4 className="font-semibold mb-2 text-gray-700">Products:</h4>
              <ul className="space-y-2">
                {selectedOrder.orderItems.map((item: OrderItem, idx: number) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 border p-2 rounded-lg bg-white/60"
                  >
                    <img
                      src={item.product.listImage[0].imageProduct}
                      alt={item.product.productName}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {item.product.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Size: {item.size} | Quantity: {item.quantity}
                      </p>
                    </div>
                    <p className="font-semibold text-gray-700">
                      {(item.price * item.quantity).toLocaleString()} ₫
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
