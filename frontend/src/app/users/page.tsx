"use client"
import {useState} from "react"
import UserTable from "@/components/users/UserTable";
import UserFilter from "@/components/users/UserFilter";
import AddUserModal from "@/components/users/AddUserModal";

export default function UsersPage() {
  const [isModalopen, setIsModalOpen] = useState(false);
  return (
    <main className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">User Management</h1>
        <p className="text-gray-500">
          Manage all users in one place. Control access, assign roles, and monitor activity across your platform.
        </p>
      </div>

      <UserFilter onAddUserClick={() => setIsModalOpen(true)}/>
        <AddUserModal
          isOpen = {isModalopen}
          onClose={() => setIsModalOpen(false)}
        >
        </AddUserModal>
      <UserTable />
    </main>
  );
}
