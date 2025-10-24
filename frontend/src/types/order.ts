export enum OrderStatus {
  ORDERED = 'ORDERED',
  CONFIRMED = 'CONFIRMED',
  SHIPPED = 'SHIPPED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  FEEDBACKED = 'FEEDBACKED',
}

export enum PaymentMethod {
  VNPAY = "VNPAY",
  COD = "COD",
  COIN = "COIN"
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export type Order = {
  id: string;
  orderDate: string;
  orderStatus: OrderStatus;
  total: number;
  addressDelivery: {
    address: string;
    phoneNumber: string;
  };
  payment: {
    paymentMethod: PaymentMethod;
    status: boolean;
  };
};


export type OrderItemDetail = {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  size: string;
  itemTotal: number;
};

export type OrderDetail = {
  id: string;
  orderDate: string;
  orderStatus: OrderStatus;
  customer: {
    fullName: string;
    phoneNumber: string;
  };
  delivery: {
    fullName: string;
    phoneNumber: string;
    address: string;
  };
  items: OrderItemDetail[];
  pricing: {
    subTotal: number;
    discountPercentage: number;
    discountAmount: number;
    couponCode: string;
    coinsUsed: number;
    coinsUsedValue: number;
    finalTotal: number;
    paymentAmount: number;
  };
  paymentInfo: {
    method: string;
    date: string;
  };
  nextStatuses: OrderStatus[];
};