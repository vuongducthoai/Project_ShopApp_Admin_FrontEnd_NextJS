"use client";
import type { Order, OrderStatus } from '@/types/order'; 
import OrderStatusBadge from './OrderStatusBadge';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type OrderTableProps = {
  orders: Order[];
  isLoading: boolean;
  onViewDetails: (orderId: string) => void;
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

export default function OrderTable({ orders, isLoading, onViewDetails }: OrderTableProps) {
  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading orders...</div>;
  if (!orders || orders.length === 0) return <div className="p-8 text-center text-gray-500">No orders found.</div>;

  return (
    <div className="overflow-x-auto bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-[#2E4258] text-[#F3F8FF]">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Customer (Phone)</th>
            <th className="px-4 py-3 text-left">Address</th>
            <th className="px-4 py-3 text-left">Order Date</th>
            <th className="px-4 py-3 text-center">Payment Method</th>
            <th className="px-4 py-3 text-center">Payment Status</th>
            <th className="px-4 py-3 text-center">Total</th>
            <th className="px-4 py-3 text-center">Order Status</th>
             <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-mono text-gray-700">#{order.id.slice(-6)}</td>
              <td className="px-4 py-3 font-medium text-gray-900">{order.addressDelivery?.phoneNumber}</td>
              <td className="px-4 py-3 text-gray-700">{order.addressDelivery?.address}</td>
              <td className="px-4 py-3 text-gray-700">{order.orderDate}</td>
              <td className="px-4 py-3 text-gray-700 text-center align-middle">{order.payment?.paymentMethod}</td>
              <td className="px-4 py-3 text-center align-middle">
                <span className={`font-medium  ${order.payment?.status ? 'text-green-600' : 'text-yellow-600'}`}>
                  {order.payment?.status ? 'Paid' : 'Pending'}
                </span>
              </td>
              <td className="px-4 py-3 font-medium text-center align-middle text-gray-900">{formatCurrency(order.total || 0)}</td>
              <td className="px-4 py-3 text-center align-m iddle">
                <OrderStatusBadge status={order.orderStatus} />
              </td>
              <td className="px-4 py-3">
               <button 
                  onClick={() => onViewDetails(order.id)} 
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight size={16} className="text-gray-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}