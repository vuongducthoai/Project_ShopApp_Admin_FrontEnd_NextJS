"use client";

import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { updateOrderStatus } from '@/services/order.service';
import type { OrderStatus } from '@/types/order';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';

type OrderStatusUpdaterProps = {
  orderId: string;
  currentStatus: OrderStatus;
  nextStatuses: OrderStatus[]; // <-- Nhận trực tiếp qua props
  mainMutate: KeyedMutator<any>; 
  detailMutate: KeyedMutator<any>; 
};

export default function OrderStatusUpdater({ 
  orderId, 
  currentStatus, 
  nextStatuses, // <-- Sử dụng prop này
  mainMutate, 
  detailMutate 
}: OrderStatusUpdaterProps) {
  
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (!selectedStatus) {
      setError('Please select a new status.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      await updateOrderStatus(orderId, selectedStatus);
      alert('Order status updated successfully!');
      
      await detailMutate(); 
      await mainMutate();

      setSelectedStatus('');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Logic kiểm tra đơn giản hơn dựa trên prop
  if (!nextStatuses || nextStatuses.length === 0) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border space-y-3">
            <h2 className="text-lg font-semibold">Current Status</h2>
            <div className='flex justify-center'>
                <OrderStatusBadge status={currentStatus} />
            </div>
            <p className="text-sm text-center text-gray-500">This order is in its final state.</p>
        </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <h2 className="text-lg font-semibold">Update Status</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
          className="flex-grow w-full p-2 border rounded-lg text-sm bg-gray-50"
        >
          <option value="" disabled>Select next status...</option>
          {/* Render trực tiếp từ props */}
          {nextStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
        <button
          onClick={handleUpdate}
          disabled={isSubmitting || !selectedStatus}
          className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </div>
       {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}