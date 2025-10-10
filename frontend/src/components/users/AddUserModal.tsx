"use client"
import { X } from "lucide-react"

type AddUserModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export default function AddUserModal({isOpen, onClose} : AddUserModalProps){
    //If Modal no open, no render 
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-[2px] z-40 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Add New User</h3>
                <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full cursor-pointer">
                    <X size={20}/>
                </button>
            </div>

            {/* Form add user */}
            <form>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                         <input suppressHydrationWarning type="text" id="firstName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                     <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                         <input suppressHydrationWarning type="text" id="lastName" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>

                     <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                    </div>

                    <div>
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                         <select id="gender" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>

                     <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                        <select id="role" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                            <option>Admin</option>
                            <option>Customer</option>
                        </select>
                     </div>
                </div>

                {/* Footer with actions */}

                <div className="mt-6 flex justify-end gap-3">
                    <button 
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer" 
                   
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer" 
                        >
                        Add User
                    </button>
                </div>
            </form>
        </div>
    </div>
    )
}