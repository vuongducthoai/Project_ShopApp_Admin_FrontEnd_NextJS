"use client";

import { useState } from 'react';
import { KeyedMutator } from 'swr';
// Sửa lại đường dẫn import nếu cần
import { updateOrderStatus } from '@/services/order.service';
import { OrderStatus } from '@/types/order';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';

type OrderStatusUpdaterProps = {
  orderId: string;
  currentStatus: OrderStatus;
  nextStatuses: OrderStatus[];
  mainMutate: KeyedMutator<any>;
  detailMutate: KeyedMutator<any>;
};

export default function OrderStatusUpdater({
  orderId,
  currentStatus,
  nextStatuses,
  mainMutate,
  detailMutate
}: OrderStatusUpdaterProps) {

  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | ''>('');
  const [cancellationReason, setCancellationReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    // --- SỬA LỖI 1: KIỂM TRA LÝ DO HỦY ---
    if (!selectedStatus) {
      setError('Please select a new status.');
      return;
    }
    // Chỉ kiểm tra lý do khi trạng thái là CANCELLED
    if (selectedStatus === OrderStatus.CANCELLED && !cancellationReason.trim()) {
      setError('Please enter a reason for cancellation.');
      return;
    }
    // --- KẾT THÚC SỬA LỖI 1 ---

    setError(null);
    setIsSubmitting(true);

    try {
      // --- SỬA LỖI 2: CHUẨN BỊ PAYLOAD ĐÚNG ---
      const payload: { status: OrderStatus; cancellationReason?: string } = { status: selectedStatus };
      if (selectedStatus === OrderStatus.CANCELLED) {
        payload.cancellationReason = cancellationReason.trim();
      }
      
      // Gọi API với payload
      await updateOrderStatus(orderId, payload); 
      // --- KẾT THÚC SỬA LỖI 2 ---

      alert('Order status updated successfully!');
      
      await detailMutate();
      await mainMutate();

      setSelectedStatus('');
      setCancellationReason(''); // Reset cả lý do hủy

    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Logic hiển thị khi ở trạng thái cuối cùng (giữ nguyên)
  if (!Array.isArray(nextStatuses) || nextStatuses.length === 0) {
    // ... JSX hiển thị trạng thái cuối cùng ...
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

  // JSX hiển thị dropdown và nút (giữ nguyên)
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
      <h2 className="text-lg font-semibold">Update Status</h2>
      <div className="flex flex-col sm:flex-row items-start gap-4"> {/* Căn chỉnh items-start */}
        <select
          value={selectedStatus}
          onChange={(e) => {
            const newStatus = e.target.value as OrderStatus;
            setSelectedStatus(newStatus);
            if (newStatus !== OrderStatus.CANCELLED) {
              setCancellationReason(''); // Reset lý do khi chọn trạng thái khác
            }
          }}
          className="flex-grow w-full p-2 border rounded-lg text-sm bg-gray-50"
        >
          <option value="" disabled>Select next status...</option>
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

      {selectedStatus === OrderStatus.CANCELLED && (
        <div className="mt-4">
          <label htmlFor="cancellationReason" className="block text-sm font-medium text-gray-700 mb-1">
            Reason for Cancellation (Required)
          </label>
          <textarea
            id="cancellationReason"
            name="cancellationReason"
            rows={3}
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
            className="w-full p-2 border rounded-lg text-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the reason why this order is being cancelled..."
            required
          />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}