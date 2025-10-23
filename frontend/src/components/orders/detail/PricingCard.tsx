"use client";
import type { OrderDetail } from "@/types/order";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Calendar } from "lucide-react";

type PricingCardProps = {
  pricing: OrderDetail['pricing'];
  payment: OrderDetail['paymentInfo'] & { status?: boolean }; // Thêm status vào đây
};

const PricingCard = ({ pricing, payment }: PricingCardProps) => {
  // Xác định số tiền đã thanh toán dựa trên payment.status
  const paidAmount = payment?.status ? pricing?.paymentAmount : 0;
  // Tính số tiền còn lại
  const balanceDue = (pricing?.finalTotal || 0) - (paidAmount || 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-3">
      {/* ... (Phần đầu của card giữ nguyên) ... */}
      <h2 className="text-lg font-semibold mb-3 text-center text-gray-800 tracking-wider">
        PAYMENT METHOD
      </h2>
      <hr className="mb-4"/>
      <div className="flex justify-between text-sm items-center">
        <span className="text-gray-500 uppercase">METHOD</span>
        <span className="font-medium flex items-center gap-2 text-gray-800">
          <CreditCard size={16} className="text-gray-500" /> {payment?.method || 'N/A'}
        </span>
      </div>
      {payment?.date && (
        <div className="flex justify-between text-sm items-center">
          <span className="text-gray-500">Ngày thanh toán</span>
          <span className="font-medium flex items-center gap-2 text-gray-800">
            <Calendar size={16} className="text-gray-500" /> {(payment.date)}
          </span>
        </div>
      )}
      <hr className="mt-4 mb-4"/>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-800">{formatCurrency(pricing?.subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Coupon Code <span className="font-semibold text-red-500">({pricing?.couponCode || 'N/A'})</span></span>
          <span className="font-medium text-red-500">- {formatCurrency(pricing?.discountAmount || 0)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Coin <span className="font-semibold text-red-500">({pricing?.coinsUsed || 0} coins)</span></span>
          <span className="font-medium text-red-500">- {formatCurrency(pricing?.coinsUsedValue)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Shipping fee</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
      </div>
      <hr className="mt-4 mb-4"/>

      <div className="flex justify-between items-center font-semibold text-lg">
        <span className="text-gray-800">Total Amount</span>
        <span className="text-blue-600 font-bold">{formatCurrency(pricing?.finalTotal)}</span>
      </div>
      <div className="flex justify-between items-center text-lg">
        <span className="font-semibold text-gray-800">Paid</span>
        <span className={`font-bold ${paidAmount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
          {formatCurrency(paidAmount)}
        </span>
      </div>
        <hr className="mt-4"/>
      {balanceDue > 0 && (
        <div className="flex justify-between items-center text-lg text-orange-600">
          <span className="font-semibold">Balance Due</span>
          <span className="font-bold">{formatCurrency(balanceDue)}</span>
        </div>
      )}
    </div>
  );
};

export default PricingCard;