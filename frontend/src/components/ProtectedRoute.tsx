"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMyInfo } from "@/services/authService";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      try {
        // Gọi API kiểm tra token
        const user = await getMyInfo(token);
        if (user && user.status === true) {
          setAuthorized(true);
        } else {
          throw new Error("Token invalid");
        }
      } catch (error) {
        // Nếu token hết hạn / sai → xóa token + chuyển hướng
        localStorage.removeItem("token");
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-gray-600">
        Đang kiểm tra quyền truy cập...
      </div>
    );
  }

  if (!authorized) return null; // Đang redirect nên không render gì cả

  return <>{children}</>;
}
