"use client";
import { Edit, Trash2 } from "lucide-react";
import UserStatusBadge from "./UserStatusBadge";
import type { User } from "@/types/user"
import { KeyedMutator } from "swr"; // Import type of mutate

type UserTableProps = {
   users: User[];
   isLoading: boolean;
   mutate: KeyedMutator<any>;
   onEdit: (user: User) => void;
};


export default function UserTable({users, isLoading, mutate, onEdit}: UserTableProps) {
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

  const handleDelete = async(userId: string) => {
    if(!window.confirm("Are you sure you want delete this user?")){
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error("Failed to delete user.");
      }

      alert("User deleted successfully!");

      mutate();
    } catch (error) {
      console.error(error);
      alert("An error occurred while deleting the user.");
    }
  };
  
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
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        
       <tbody>
          {users.map((u, i) => {
          const isBanned = !(String(u.status) === 'true');
          return(
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


              <td className="px-4 py-2">
                <UserStatusBadge status={u.status ? 'Active' : 'Banned'} />
              </td>
              <td className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <button 
                      suppressHydrationWarning
                      onClick={() => onEdit(u)} 
                      className="p-1 hover:bg-gray-300 rounded-md cursor-pointer">
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(u.id)}
                     disabled={isBanned}
                    suppressHydrationWarning 
                    className="p-1 hover:bg-gray-300 rounded-md text-red-500 cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
}