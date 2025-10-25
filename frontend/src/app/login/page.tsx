"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login, getMyInfo } from "../../services/authService";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // Gọi API đăng nhập
      const loginData = await login({ email, password });
      const token = loginData.token;

      // Gọi API lấy thông tin người dùng
      const infoData = await getMyInfo(token);

      // Kiểm tra quyền
      if (infoData.role === "Admin") {
        localStorage.setItem("token", token);
        setSuccessMsg("Đăng nhập thành công! Đang chuyển hướng...");
        setTimeout(() => {
          router.push("/dashboard");
        }, 700);
      } else {
        throw new Error("Tài khoản này không có quyền truy cập Admin");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Lỗi đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/hcmuteAdmin.png')" }} 
    >
      {/* Lớp phủ mờ nhẹ */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Form login */}
      <div className="relative z-10 w-full max-w-md bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/30">
        <h1 className="text-3xl font-extrabold text-white text-center mb-2 tracking-wide">
          WELCOME BACK ADMIN
        </h1>
        <p className="text-center text-gray-200 mb-8 text-sm">
          Hãy đăng nhập để tiếp tục truy cập bảng điều khiển
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email..."
              required
              className="w-full px-4 py-2 rounded-lg bg-white/40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-1">
              Mật khẩu <span className="text-red-400">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              required
              className="w-full px-4 py-2 rounded-lg bg-white/40 text-black placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>

          {/*Hiển thị thông báo lỗi hoặc thành công */}
          {errorMsg && (
            <p className="text-red-300 text-center text-sm">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-300 text-center text-sm">{successMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
