// services/order.service.ts
import type { OrderDetail, OrderStatus } from '@/types/order';

export async function getOrderById(id: string): Promise<OrderDetail | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(`Failed to fetch order ${id}:`, error);
    return null;
  }
}

export async function updateOrderStatus(id: string, payload: { status: OrderStatus; cancellationReason?: string }): Promise<any> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    // Gửi toàn bộ payload lên API
    body: JSON.stringify(payload), 
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Failed to update order status.');
  }
  return res.json();
}