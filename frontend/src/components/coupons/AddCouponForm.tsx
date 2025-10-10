"use client";

import { createCoupon } from "@/services/couponService";
import { useEffect, useState } from "react";

interface AddCouponFormProps {
  onCancel: () => void;
}

export default function AddCouponForm({ onCancel }: AddCouponFormProps) {
  const [formData, setFormData] = useState({
    code: "",
    discountValue: "",
    maxDiscount: "",
    startDate: "",
    endDate: "",
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
      await createCoupon({
        code: formData.code.trim(),
        discountValue: Number(formData.discountValue),
        maxDiscount: Number(formData.maxDiscount),
        startDate: formData.startDate,
        endDate: formData.endDate,
      });

      setSuccess("Tạo khuyến mãi thành công !");
    } catch (err: any) {
      setError(err.message);
    }
  };


  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Coupon</h2>

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
              value={formData.startDate}
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
              value={formData.endDate}
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
            Add Coupon
          </button>
        </div>
      </form>
    </div>
  );
}
