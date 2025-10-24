const BASE_URL = "http://localhost:9090/api/notifications";

export interface Notification {
    title: string,
    message: string,
    type: string,
    createdAt: string;
}

export async function createNotificaton(notification: Notification): Promise<Notification> {
    const res = await fetch(`${BASE_URL}/send-notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Lỗi khi tạo thông báo");
    }

    return res.json();
}

export async function getAllNotification(query: {
    page?: string;
    limit?: string;
    type?: string
}) {
    const queryString = new URLSearchParams(
        Object.entries(query).filter(([_, v]) => v !== undefined && v !== "")
    ).toString();

    // Gọi API kèm query string
    const res = await fetch(`${BASE_URL}?${queryString}`, {
        cache: "no-store",
    });
    if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch notification");
  }
  return res.json() as Promise<{
      data: Notification[];
      total: number;
      page: number;
      limit: number;
    }>;
}
