"use client";
import { Edit, Trash2 } from "lucide-react";
import UserStatusBadge from "./UserStatusBadge";
import type { User } from "@/types"

type UserTableProps = {
  users: User[];
   isLoading: boolean;
};


export default function UserTable({users, isLoading}: UserTableProps) {
   if (isLoading) {
    return (
      <div className="bg-white p-8 text-center text-gray-500">
        <p>Loading data...</p>
      </div>
    );
  }

  if(!users || users.length === 0){
    return (
      <div className="bg-white border rouded-lg p-8 text-center text-gray-500">
        <p>No user found or data is loading...</p>
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto bg-white border rounded-lg">
      <table className="min-w-full text-sm">
        <thead className="bg-[#2E4258] text-[#F3F8FF]">
          <tr>
            <th className="px-4 py-2 text-left">First Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Phone Number</th>
            <th className="px-4 py-2 text-left">Gender</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        
       <tbody>
          {users.map((u, i) => (
            <tr
              key={i}
              className={`border-t ${
                i % 2 === 0 ? "bg-[#F3F8FF]" : "bg-[#F9FAFB]"
              } hover:bg-gray-200`}
            >
              <td className="px-4 py-2">{u.firstName}</td>

              <td className="px-4 py-2">{u.lastName}</td>

              <td className="px-4 py-2">{u.email}</td>

              <td className="px-4 py-2">{u.phoneNumber}</td>

              <td className="px-4 py-2">{u.gender ? 'Male' : 'Female'}</td>

              <td className="px-4 py-2">{u.role}</td>

              <td className="px-4 py-2">{u.Image}</td>

              <td className="px-4 py-2">
                <UserStatusBadge status={u.status ? 'Active' : 'Banned'} />
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <button suppressHydrationWarning className="p-1 hover:bg-gray-300 rounded-md cursor-pointer">
                    <Edit size={16} />
                  </button>
                  <button suppressHydrationWarning className="p-1 hover:bg-gray-300 rounded-md text-red-500 cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}