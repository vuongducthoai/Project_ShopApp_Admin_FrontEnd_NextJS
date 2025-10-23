"use client";
import { useState } from "react";
import AddCouponForm from "@/components/coupons/AddCouponForm";
import UpdateCouponForm from "@/components/coupons/UpdateCouponForm";
import CouponFilter from "@/components/coupons/CouponFilter";
import CouponTable from "@/components/coupons/CouponTable";

export interface Coupon {
  id?: string;
  code: string;
  discountValue: number;
  maxDiscount: number;
  startDate: string;
  endDate: string;
  isActive?: boolean;
  usedCount?: number;
}

export interface Filter {
  code?: string;
  isActive?: string;
  startDate?: string;
  endDate?: string;
  maxDiscountValue?: string;
}

export default function CouponsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [filters, setFilters] = useState<Filter>({
    code: "",
    isActive: "",
    startDate: "",
    endDate: "",
    maxDiscountValue: "",
  });

  let content;

  if (showAddForm) {
    content = <AddCouponForm onCancel={() => setShowAddForm(false)} />;
  } else if (showUpdateForm && selectedCoupon) {
    content = (
      <UpdateCouponForm
        coupon={selectedCoupon}
        onCancel={() => {
          setShowUpdateForm(false);
          setSelectedCoupon(null);
        }}
      />
    );
  } else {
    content = (
      <>
        <CouponFilter onAddCoupon={() => setShowAddForm(true)} onFilterChange={setFilters}/>
        <CouponTable
          onUpdateCoupon={(coupon) => {
            setSelectedCoupon(coupon);
            setShowUpdateForm(true);
          }}
          filters={filters}
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Coupon Management</h1>
        <p className="text-gray-500">
          Manage all coupons in one place. Control access, assign roles, and monitor activity across your platform.
        </p>
      </div>

      {content}
    </div>
  );
}
