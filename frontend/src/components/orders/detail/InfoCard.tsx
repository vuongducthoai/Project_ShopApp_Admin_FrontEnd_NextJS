"use client";
import { User, MapPin } from "lucide-react"; // Import tất cả các icon có thể dùng ở đây

const iconMap = {
  user: User,
  mapPin: MapPin,
};

type InfoCardProps = {
  iconName: keyof typeof iconMap; // Prop mới: nhận vào 'user' hoặc 'mapPin'
  title: string;
  data: {
    fullName: string;
    phoneNumber: string;
    address?: string;
  };
};

const InfoCard = ({ iconName, title, data }: InfoCardProps) => {
  const Icon = iconMap[iconName]; // Tra cứu component Icon từ tên

  if (!Icon) return null; // An toàn hơn nếu tên icon không hợp lệ

  return (
   <div className="bg-white p-4 rounded-md border-gray-100 h-full">
    {/* Phần Header */}
    <div className="border-b pb-2 mb-3">
        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
        {title}
        </h3>
    </div>

    {/* Phần Body */}
    <div className="space-y-1 text-sm">
        <p className="font-bold text-gray-900">{data?.fullName || 'N/A'}</p>
        <p className="text-gray-600">{data?.phoneNumber || 'N/A'}</p>
        {data?.address && <p className="text-gray-600">{data.address}</p>}
    </div>
    </div>
  );
};

export default InfoCard;