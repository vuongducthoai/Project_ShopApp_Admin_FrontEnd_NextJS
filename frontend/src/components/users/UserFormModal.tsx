"use client"
import { useState, useEffect } from "react";
import { X } from "lucide-react"
import { addUser, updateUser } from '@/services/user.service';
import { KeyedMutator } from "swr";
import type { User } from "@/types/user"

type UserFormModalProps = {
  isOpen: boolean;
  onClose: () => void;
  initialData: User | null;  //null = Add mode, User object = Edit mode
  mutate: KeyedMutator<any>;
};

//State ban dau cho form
type FormDataState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  gender: string;
  role: string;
  status: string;
};

const initialState: FormDataState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  phoneNumber: "",
  gender: "Male",
  role: "Customer",
  status: "Active"
};


export default function UserFormModal({ isOpen, onClose, initialData, mutate }: UserFormModalProps) {
  // Xác định chế độ Add hay Edit
  const isEditMode = initialData !== null;

  // State để lưu trữ dữ liệu của form và lỗi
  const [formData, setFormData] = useState<FormDataState>(initialState);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  // useEffect để điền dữ liệu vào form khi ở chế độ Edit
  useEffect(() => {
    if (isOpen) {
      if (isEditMode) {
        setFormData({
          firstName: initialData.firstName || '',
          lastName: initialData.lastName || '',
          email: initialData.email || '',
          password: '', // Password không cần điền khi edit
          phoneNumber: initialData.phoneNumber || '',
          gender: initialData.gender ? 'Male' : 'Female',
          role: initialData.role || 'Customer',
          status: initialData.status ? 'Active' : 'Banned'
        });
      } else {
        setFormData(initialState); // Reset form khi ở chế độ Add
      }
    }
  }, [initialData, isOpen, isEditMode]);



  // 3. Hàm xử lý chung khi giá trị của input thay đổi
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // 4. Hàm xử lý khi người dùng submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang
    setError(null);
    setIsSubmitting(true);

    try {
      if (isEditMode) {
        //Che do edit: Goi API PATCH
        const { email, password, ...updateData } = formData; // Ignore email && password
        await updateUser(initialData.id, {
          ...updateData,
          gender: formData.gender === 'Male',
          status: formData.status === 'Active'
        });
        alert("User updated successfully!");
      } else {
        await addUser({
          ...formData,
          gender: formData.gender === 'Male',
        });
        alert("User added successfully!");
      }
      mutate(); // Yêu cầu SWR fetch lại danh sách user
      onClose(); // Đóng modal
    } catch (err) {
      setError((err as Error).message);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  //If Modal no open, no render 
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-[2px] z-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Add New User</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full cursor-pointer">
            <X size={20} />
          </button>
        </div>

        {/* Form add user */}
        {/* 5. Gắn hàm handleSubmit vào form và kết nối state với các input */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÀ-ỹ\s]*$/.test(value)) {
                  handleChange(e);
                }
              }} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={(e) => {
                const value = e.target.value;
                if (/^[A-Za-zÀ-ỹ\s]*$/.test(value)) {
                  handleChange(e);
                }
              }} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone</label>
              <input type="text" minLength={10} id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) {
                  handleChange(e);
                }
              }} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            {
              !isEditMode && (
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
              )
            }
            {
              !isEditMode && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required minLength={6} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
              )}

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
              <select id="role" name="role" value={formData.role} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                <option>Admin</option>
                <option>Customer</option>
              </select>
            </div>

            {
              isEditMode && (
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                  <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option>Active</option>
                    <option>Banned</option>
                  </select>
                </div>
              )
            }
          </div>

          {/* Hiển thị lỗi nếu có */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer">
              {isSubmitting ? 'Saving...' : (isEditMode ? 'Update' : 'Add User')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}