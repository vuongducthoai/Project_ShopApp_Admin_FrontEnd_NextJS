const BASE_URL = "http://localhost:9090/api/coupons";
import { Coupon } from "@/app/coupons/page";

/**
 * Lấy danh sách coupon có lọc và phân trang
 * @param query Object chứa các tham số lọc và phân trang
 */
export async function getCoupons(query: {
  isActive?: string;
  startDate?: string;
  endDate?: string;
  code?: string;
  maxDiscountValue?: string;
  page?: string;
  limit?: string;
}) {
  // Chuyển object query thành chuỗi query string, bỏ qua field undefined
  const queryString = new URLSearchParams(
    Object.entries(query).filter(([_, v]) => v !== undefined && v !== "")
  ).toString();

  // Gọi API kèm query string
  const res = await fetch(`${BASE_URL}?${queryString}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch coupons");
  }

  return res.json() as Promise<{
    data: Coupon[];
    total: number;
    page: number;
    limit: number;
  }>;
}


export async function createCoupon(couponData: Coupon): Promise<Coupon> {
  const res = await fetch(`${BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(couponData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Lỗi khi tạo mã khuyến mãi");
  }

  return res.json();
}

export async function updateCoupon(couponData: Coupon, id: string): Promise<Coupon> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(couponData),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Lỗi khi cập nhật mã khuyến mãi");
  }

  return res.json();
}

export async function hideCoupon(id: string): Promise<Coupon> {
  const res = await fetch(`${BASE_URL}/soft-delete/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Lỗi khi ẩn mã khuyến mãi");
  }

  return res.json();
}

export async function toggleStatusCoupon(id: string): Promise<Coupon> {
  const res = await fetch(`${BASE_URL}/toggle-status/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Lỗi khi thay đổi trạng thái mã khuyến mãi");
  }

  return res.json();
}

