"use client";

import { useState } from "react";
import { Coupon } from "@/app/coupons/page";
import { updateCoupon } from "@/services/couponService";

interface UpdateCouponFormProps {
  onCancel: () => void;
  coupon: Coupon;
}

export default function UpdateCouponForm({ onCancel, coupon }: UpdateCouponFormProps) {
  const [formData, setFormData] = useState({
    id: coupon.id || "",
    code: coupon.code || "",
    discountValue: coupon.discountValue || "",
    maxDiscount: coupon.maxDiscount || "",
    startDate: coupon.startDate || "",
    endDate: coupon.endDate || "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(""); // reset lỗi cũ
  
      try {
        await updateCoupon({
          code: formData.code.trim(),
          discountValue: Number(formData.discountValue),
          maxDiscount: Number(formData.maxDiscount),
          startDate: formData.startDate,
          endDate: formData.endDate,
        }, formData.id);
  
        setSuccess("Update khuyến mãi thành công !");
      } catch (err: any) {
        setError(err.message);
      }
    };
  

  const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
};


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Coupon</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="fixed top-15 right-5 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-80 animate-slide-in">
            <span className="font-medium">{error}</span>
            <button
              onClick={() => setError("")}
              className="ml-3 text-white font-bold hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}
        {success && (
          <div className="fixed top-15 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-80 animate-slide-in">
            <span className="font-medium">{success}</span>
            <button
              onClick={() => setSuccess("")}
              className="ml-3 text-white font-bold hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
            <input
              type="number"
              name="discountValue"
              value={formData.discountValue}
              min={0}
              max={100}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount (VND)</label>
            <input
              type="number"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formatDateForInput(formData.startDate)}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formatDateForInput(formData.endDate)}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Update Coupon
          </button>
        </div>
      </form>
    </div>
  );
}
