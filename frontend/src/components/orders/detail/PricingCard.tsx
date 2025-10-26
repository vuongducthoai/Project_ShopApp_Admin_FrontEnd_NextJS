"use client";
import type { OrderDetail } from "@/types/order";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Calendar, CheckCircle, XCircle } from "lucide-react";

type PricingCardProps = {
  pricing: OrderDetail['pricing'];
  paymentInfo: OrderDetail['paymentInfo'];
};

const PricingCard = ({ pricing, paymentInfo }: PricingCardProps) => {
  // Xác định số tiền đã thanh toán - SỬA LẠI LOGIC
  const paidAmount = paymentInfo?.isPaid ? (pricing?.totalPrice || 0) : 0;
  
  // Tính số tiền còn lại
  const balanceDue = (pricing?.totalPrice || 0) - paidAmount;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border space-y-3">
      <h2 className="text-lg font-semibold mb-3 text-center text-gray-800 tracking-wider">
        PAYMENT METHOD
      </h2>
      <hr className="mb-4"/>
      
      {/* Payment Method */}
      <div className="flex justify-between text-sm items-center">
        <span className="text-gray-500 uppercase">METHOD</span>
        <span className="font-medium flex items-center gap-2 text-gray-800">
          <CreditCard size={16} className="text-gray-500" /> 
          {paymentInfo?.method || 'N/A'}
        </span>
      </div>

      {/* Payment Status */}
      <div className="flex justify-between text-sm items-center">
        <span className="text-gray-500">Status</span>
        <span className={`font-medium flex items-center gap-2 ${paymentInfo?.isPaid ? 'text-green-600' : 'text-orange-600'}`}>
          {paymentInfo?.isPaid ? (
            <>
              <CheckCircle size={16} /> Paid
            </>
          ) : (
            <>
              <XCircle size={16} /> UnPaid
            </>
          )}
        </span>
      </div>

      {/* Payment Date & Transaction No */}
      {paymentInfo?.paidAt && paymentInfo?.isPaid && (
        <>
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-500">Date Pay</span>
            <span className="font-medium flex items-center gap-2 text-gray-800">
              <Calendar size={16} className="text-gray-500" /> 
              {paymentInfo.paidAt}
            </span>
          </div>
          {paymentInfo.vnpTransactionNo && (
            <div className="flex justify-between text-sm items-center">
              <span className="text-gray-500">Trans Code</span>
              <span className="font-medium text-gray-800">
                {paymentInfo.vnpTransactionNo}
              </span>
            </div>
          )}
        </>
      )}

      <hr className="mt-4 mb-4"/>

      {/* Pricing Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-medium text-gray-800">
            {formatCurrency(pricing?.subTotal || 0)}
          </span>
        </div>

        {/* Discount from Coupon */}
        {pricing?.discountValue > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-500">
              Coupon Code{' '}
              <span className="font-semibold text-red-500">
                ({pricing?.couponCode || 'N/A'})
              </span>
            </span>
            <span className="font-medium text-red-500">
              - {formatCurrency(pricing.discountValue)}
            </span>
          </div>
        )}

        {/* Discount from Coins */}
        {pricing?.coinsApplied > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-500">
              Coin{' '}
              <span className="font-semibold text-red-500">
                ({pricing.coinsApplied} coins)
              </span>
            </span>
            <span className="font-medium text-red-500">
              - {formatCurrency(pricing.coinValue || 0)}
            </span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-500">Shipping fee</span>
          <span className="font-medium text-green-600">Free</span>
        </div>
      </div>

      <hr className="mt-4 mb-4"/>

      {/* Total Amount */}
      <div className="flex justify-between items-center font-semibold text-lg">
        <span className="text-gray-800">Total Amount</span>
        <span className="text-blue-600 font-bold">
          {formatCurrency(pricing?.totalPrice || 0)}
        </span>
      </div>

      {/* Paid Amount */}
      <div className="flex justify-between items-center text-lg">
        <span className="font-semibold text-gray-800">Paid</span>
        <span className={`font-bold ${paidAmount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
          {formatCurrency(paidAmount)}
        </span>
      </div>

      <hr className="mt-4"/>

      {/* Balance Due */}
      {balanceDue >= 0 && (
        <div className="flex justify-between items-center text-lg text-orange-600">
          <span className="font-semibold">Balance</span>
          <span className="font-bold">{formatCurrency(balanceDue)}</span>
        </div>
      )}
    </div>
  );
};

export default PricingCard;