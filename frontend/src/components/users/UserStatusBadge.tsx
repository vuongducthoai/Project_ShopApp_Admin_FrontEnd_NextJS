export default function UserStatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Active: "bg-[#28A745] text-[#FFFFFF]",
    Banned: "bg-[#DC3545] text-[#FFFFFF]",
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
