const BASE_URL = "http://localhost:9090/api/statistics";

export async function getStatistics() {
  const res = await fetch(`${BASE_URL}`, { cache: "no-store" });
  console.log("Response status:", res.status);
  
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed to fetch statistics");
  }

  const data = await res.json();
  return data;
}



export async function getStatisticsSale(year: number) {
    const res = await fetch(`${BASE_URL}/sale/${year}`, {cache: "no-store"});
    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to fetch sale statistics");
    }

    return res.json()
}


export async function getOrders(month: string, year: string) {
  const res = await fetch(`${BASE_URL}/orders?month=${month}&year=${year}`, {
    cache: "no-store"
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch orders");
  }

  return res.json();
}

export async function exportOrderToPDF(id: string) {
  const res = await fetch(`${BASE_URL}/export-pdf/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to export PDF");
  }

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `order_${id}.pdf`;
  a.click();
  window.URL.revokeObjectURL(url);
}

