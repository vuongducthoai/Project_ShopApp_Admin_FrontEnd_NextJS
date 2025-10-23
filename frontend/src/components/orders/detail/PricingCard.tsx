"use client";
import type { OrderDetail } from "@/types/order";
import { formatCurrency } from "@/lib/utils";
import { CreditCard, Calendar } from "lucide-react";

type PricingCardProps = {
  pricing: OrderDetail['pricing'];
  payment: OrderDetail['paymentInfo'];
};

const PricingCard = ({ pricing, payment }: PricingCardProps) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border-gray-100 space-y-3">
    <h2 className="text-lg font-semibold mb-2 text-center">PAYMENT METHOD</h2>
    <hr/>
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">METHOD</span>
      <span className="font-medium flex items-center gap-2">
        <CreditCard size={16} /> {payment?.method || 'N/A'}
      </span>
    </div>
      {payment?.date && (
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Ngày thanh toán</span>
        <span className="font-medium flex items-center gap-2">
          <Calendar size={16} /> {(payment.date)}
        </span>
      </div>
    )}
    <hr/>
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">Subtotal</span>
      <span className="font-medium">{formatCurrency(pricing?.subTotal)}</span>
    </div>
    
    <div className="flex justify-between text-sm text-red-500">
      <span>  
            <span className="text-gray-500">Coupon Code  </span> 
            <span className="font-semibold">({pricing?.couponCode || ''})   </span> 
        </span>
      <span className="font-medium">- {formatCurrency(pricing?.discountAmount || 0)}</span>
    </div>
    <div className="flex justify-between text-sm text-red-500">
      <span>  
            <span className="text-gray-500">Coin </span> 
           <span className="font-semibold"> ({pricing?.coinsUsed || 0} coins)</span>
        </span>
      <span className="font-medium">- {formatCurrency(pricing?.coinsUsedValue)}</span>
    </div>
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">Shipping fee</span>
      <span className="font-medium text-green-600">Free</span>
    </div>
    <hr/>
    <div className="flex justify-between font-semibold text-lg">
      <span>Total Amount</span>
      <span className="text-blue-600">{formatCurrency(pricing?.finalTotal)}</span>
    </div>
   
    <div className="flex justify-between font-semibold text-lg">
      <span>Paid</span>
      <span className="text-blue-600">{formatCurrency(pricing?.paymentAmount)}</span>
    </div>
     <hr/>
  </div>

);

export default PricingCard;