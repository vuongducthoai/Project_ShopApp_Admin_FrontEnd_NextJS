"use client";

import DashboardSummary from "@/components/dashboard/DashboardSummary";
import DealDetail from "@/components/dashboard/DealDetail";
import SalesChart from "@/components/dashboard/SalesChart";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";


export default function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState<number>(2025);
  return (
    <ProtectedRoute>
      <div className="space-y-6 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <DashboardSummary />
        <SalesChart selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
        <DealDetail selectedYear={selectedYear} />
      </div>
    </ProtectedRoute>
  );
}
