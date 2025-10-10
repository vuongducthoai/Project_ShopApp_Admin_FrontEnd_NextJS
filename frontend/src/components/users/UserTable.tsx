"use client";
import { Edit, Trash2 } from "lucide-react";
import UserStatusBadge from "./UserStatusBadge";

const users = [
  {
    name: "John Smith",
    email: "john.smith@gmail.com",
    username: "jonny77",
    status: "Active",
    role: "Admin",
    joined: "March 12, 2023",
    lastActive: "1 minute ago",
  },
  {
    name: "Daniel Warren",
    email: "dwarren3@gmail.com",
    username: "dwarren3",
    status: "Banned",
    role: "User",
    joined: "Jan 8, 2024",
    lastActive: "4 days ago",
  },
];

export default function UserTable() {
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
              <td className="px-4 py-2">{u.name.split(" ")[0]}</td>

              <td className="px-4 py-2">{u.name.split(" ").slice(1).join(" ")}</td>

              <td className="px-4 py-2">{u.email}</td>

              <td className="px-4 py-2">-</td>

              <td className="px-4 py-2">-</td>

              <td className="px-4 py-2">{u.role}</td>

              <td className="px-4 py-2">-</td>

              <td className="px-4 py-2">
                <UserStatusBadge status={u.status} />
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <button suppressHydrationWarning className="p-1 hover:bg-gray-300 rounded-md">
                    <Edit size={16} />
                  </button>
                  <button suppressHydrationWarning className="p-1 hover:bg-gray-300 rounded-md text-red-500">
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