"use client"

export interface Filter {
    type?: string
}
"use client"

import AddNotificationForm from "@/components/notification/AddNotificationForm"
import NotificationTable from "@/components/notification/NotificationTable"
import NotificationFilter from "@/components/notification/NotificationFilter"
import { useState } from "react"
import ProtectedRoute from "@/components/ProtectedRoute"

export default function NotificationPage() {
    const [showAddForm, setShowAddForm] = useState(false)
    const [filter,setFilters] = useState<Filter>({type: ""})


    return (
        <ProtectedRoute>
        <div className="p-4">
            <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-10"
            >
                Gửi thông báo
            </button>
            <NotificationFilter onFilterChange={setFilters} />

            {showAddForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-200"
                        onClick={() => setShowAddForm(false)}
                    />

                    <div className="relative z-10 w-full max-w-2xl mx-4 animate-[fadeIn_0.2s_ease-out]">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-800">Thêm thông báo mới</h2>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="text-gray-500 hover:text-gray-700 transition"
                                    aria-label="Đóng"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                <AddNotificationForm onCancel={() => setShowAddForm(false)} />
                            </div>
                        </div>
                    </div>

                    <style jsx>{`
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.97);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
    `}</style>
                </div>
            )}
        <NotificationTable filters={filter}/>
        </div>
        </ProtectedRoute>
    )
}
