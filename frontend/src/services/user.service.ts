import type { User } from "@/types/user"

type NewUserData = Omit<User, 'id' | 'status'> & { password?: string };

export async function addUser(userData: NewUserData) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to add user.");
  }
  return res.json();
}


export async function updateUser(userId: string, userData: any){
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`, {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userData),
  });

  if(!res.ok){
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to update user.");  
  }
  return res.json();
}