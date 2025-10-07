export default function UserStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-gray-100 text-gray-700",
    Banned: "bg-red-100 text-red-700",
    Pending: "bg-blue-100 text-blue-700",
    Suspended: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${
        colors[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}
