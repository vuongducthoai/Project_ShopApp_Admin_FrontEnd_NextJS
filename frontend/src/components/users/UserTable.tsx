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
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Full Name</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Username</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Role</th>
            <th className="px-4 py-2 text-left">Joined</th>
            <th className="px-4 py-2 text-left">Last Active</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, i) => (
            <tr key={i} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{u.name}</td>
              <td className="px-4 py-2">{u.email}</td>
              <td className="px-4 py-2">{u.username}</td>
              <td className="px-4 py-2">
                <UserStatusBadge status={u.status} />
              </td>
              <td className="px-4 py-2">{u.role}</td>
              <td className="px-4 py-2">{u.joined}</td>
              <td className="px-4 py-2">{u.lastActive}</td>
              <td className="px-4 py-2 flex gap-2">
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Edit size={16} />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded text-red-500">
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
