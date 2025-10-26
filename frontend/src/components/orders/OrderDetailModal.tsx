"use client";

import { useEffect } from 'react';
import useSWR, { KeyedMutator } from 'swr';
import { X } from 'lucide-react';
import { getOrderById } from '@/services/order.service';
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import InfoCard from './detail/InfoCard';
import ItemsTable from './detail/ItemsTable';
import PricingCard from './detail/PricingCard';
import OrderStatusUpdater from './detail/OrderStatusUpdate';
import { OrderDetail } from '@/types/order';


type OrderDetailModalProps = {
  orderId: string | null;
  onClose: () => void;
  mainMutate: KeyedMutator<any>;
};

const fetcher = (id: string): Promise<OrderDetail | null> => getOrderById(id);

export default function OrderDetailModal({ orderId, onClose, mainMutate }: OrderDetailModalProps) {
  const { data: order, error, isLoading, mutate: detailMutate } = useSWR(orderId, fetcher);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!orderId) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm z-40 flex justify-center items-center p-4">
      <div className="bg-gray-50 rounded-lg shadow-xl w-full max-w-5xl h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="sticky top-4 right-4 float-right p-2 bg-gray-200 hover:bg-gray-300 rounded-full z-20"
        >
          <X size={20} />
        </button>

        {isLoading && <div className="p-8 text-center text-gray-500">Loading order details...</div>}
        {error && <div className="p-8 text-center text-red-500">Failed to load order details.</div>}
        
        {order && (
          <main className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">ORDER DETAIL</h1>
            <div className="flex items-center justify-center flex-wrap gap-4 text-sm text-gray-500 mb-6">
              <span><span className="font-bold text-black">ORDERID: </span><span className="font-bold text-blue-600">#{order.id?.slice(-8).toUpperCase() || 'N/A'}</span></span>
              <span>•</span>
              <span className="text-black">{(order.orderDate)}</span>
              <OrderStatusBadge status={order.orderStatus} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoCard iconName="user" title="Customer" data={order.customer} />
                  <InfoCard iconName="mapPin" title="Recipient" data={order.delivery} />
                </div>
                <ItemsTable items={order.items} />
              </div>
              <div className="space-y-6">
                  <PricingCard 
                  pricing={order.pricing} 
                  paymentInfo={order.paymentInfo} 
                />
                <OrderStatusUpdater 
                  orderId={orderId} 
                  currentStatus={order.orderStatus}
                  nextStatuses={order.nextStatuses || []} 
                  mainMutate={mainMutate}
                  detailMutate={detailMutate}
                />
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}