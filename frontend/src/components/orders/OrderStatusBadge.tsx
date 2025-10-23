import { Order, OrderStatus } from "@/types/order";

type BadgeProps = {
    status: OrderStatus;
}


const statusColors: Record<OrderStatus, string> = {
    [OrderStatus.ORDERED]:   'bg-blue-100 font-medium text-blue-800',
    [OrderStatus.CONFIRMED]: 'bg-blue-100 text-blue-800',
    [OrderStatus.SHIPPED]:   'bg-amber-100 text-amber-800 font-medium',
    [OrderStatus.COMPLETED]: 'bg-green-100 text-green-800 font-medium',
    [OrderStatus.CANCELLED]: 'bg-red-100 text-red-800 font-medium',
    [OrderStatus.FEEDBACKED]:'bg-purple-100 text-purple-800 font-medium',
};

export default function OrderStatusBadge({ status }: BadgeProps) {
  const colorClass = statusColors[status] || 'bg-gray-100 text-gray-700';

  return (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${colorClass}`}>
      {status}
    </span>
  );
}