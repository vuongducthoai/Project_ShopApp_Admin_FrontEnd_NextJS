const BASE_URL = "http://localhost:8088/api";

export interface LoginPayload {
  email: string;
  password: string;
}

export async function login(payload: LoginPayload) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Đăng nhập thất bại");
  }

  const data = await res.json();
  return data; // { token: "..." }
}

export async function getMyInfo(token: string) {
  const res = await fetch(`${BASE_URL}/myinfo`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    throw new Error("Không thể lấy thông tin người dùng");
  }

  const data = await res.json();
  return data; // { email, role, ... }
}

export async function logout(token: string) {
  try {
    const res = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Đăng xuất thất bại");
    }

    // API chỉ trả về message
    const data = await res.json();
    return data.message || "Đăng xuất thành công";
  } catch (err: any) {
    console.error("Logout error:", err);
    throw new Error(err.message || "Không thể đăng xuất");
  }
}
