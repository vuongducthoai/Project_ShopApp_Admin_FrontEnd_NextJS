"use client";

//Định dạng số thành tiền tệ VND
export const formatCurrency = (amount: number | null | undefined) => {
  if (amount === null || amount === undefined) return "0 ₫";
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

// Định dạng chuỗi ngày tháng
export const formatDate = (dateString: string | null | undefined) => {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleString('vi-VN', { dateStyle: 'medium', timeStyle: 'short' });
};