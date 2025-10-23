"use client";
import type { OrderItemDetail } from "@/types/order";
import { formatCurrency } from "@/lib/utils";

type ItemsTableProps = {
  items: OrderItemDetail[];
};

const ItemsTable = ({ items }: ItemsTableProps) => (
  <div className="bg-white p-6 rounded-lg shadow-md border-gray-100">
    {/* 1. Bọc bảng trong một div có thể cuộn */}
    <div className="max-h-[300px] overflow-y-auto relative border rounded-lg">
      {/* 2. Dùng một thẻ <table> duy nhất */}
      <table className="w-full text-sm">
        {/* 3. Dùng "sticky" để cố định thead */}
        <thead className="sticky top-0 bg-gray-50 z-10 ">
          <tr className="border-b bg-[#2E4258] text-[#F3F8FF]">
            <th className="py-3 px-4 text-left font-bold">ProductName</th>
            <th className="py-3 px-4 text-center font-bold">Quantity</th>
            <th className="py-3 px-4 text-center font-bold">Price</th>
            <th className="py-3 px-4 text-center font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <tr key={index} className="border-b last:border-b-0 hover:bg-gray-50">
              {/* 4. Xóa width khỏi <td>, trình duyệt sẽ tự căn chỉnh thẳng hàng với <th> */}
           <td className="py-3 px-4">
            <div>
              <span className="font-medium text-gray-800">{item.productName}</span>
              <span className="text-[#1473CC] font-medium"> ({item.size})</span>
            </div>

            <div className="text-xs text-gray-500 mt-1">
              Barcode : {item.productId}
            </div>
          </td>
            <td className="py-3 px-4 text-center text-gray-800 font-medium">x{item.quantity}</td>
              <td className="py-3 px-4 text-right text-gray-800 font-medium">{formatCurrency(item.price)}</td>
              <td className="py-3 px-4 text-right font-semibold">{formatCurrency(item.itemTotal)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ItemsTable;