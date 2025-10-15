import DashboardSummary from "@/components/dashboard/DashboardSummary";
import SalesChart from "@/components/dashboard/SalesChart";


export default function DashboardPage() {
  return (
    <div className="space-y-6 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <DashboardSummary />
      <SalesChart />
    </div>
  );
}
