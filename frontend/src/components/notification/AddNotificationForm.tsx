"use client"

import { useEffect, useState } from "react"
import { createNotificaton } from "@/services/notificationService"

interface AddNotificationFormProps {
    onCancel: () => void
}

export default function AddNotificationForm({ onCancel }: AddNotificationFormProps) {
    const [formData, setFormData] = useState({
        title: "",
        message: "",
        type: ""
    })
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault
        setError("");
        try {
            await createNotificaton({
                title: formData.title.trim(),
                message: formData.message.trim(),
                type: formData.type.trim(),
                createdAt: new Date().toDateString()
            })
            setSuccess("Tạo thông báo thành công")

        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="p-6">
            {error && (
                <div className="fixed top-15 right-5 bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-80 animate-slide-in">
                    <span className="font-medium">{error}</span>
                    <button
                        onClick={() => setError("")}
                        className="ml-3 text-white font-bold hover:text-gray-200"
                    >
                        ×
                    </button>
                </div>
            )}
            {success && (
                <div className="fixed top-15 right-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between w-80 animate-slide-in">
                    <span className="font-medium">{success}</span>
                    <button
                        onClick={() => setSuccess("")}
                        className="ml-3 text-white font-bold hover:text-gray-200"
                    >
                        ×
                    </button>
                </div>
            )}
            <form>
                <label className="block mb-2 font-bold">Title</label>
                <input type="text" className="border px-4 py-2 rounded w-full" placeholder="Title"
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} />

                <label className="block mb-2 font-bold mt-5">Message</label>
                <input type="text" className="border px-4 py-2 rounded w-full" placeholder="Message"
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })} />

                <label className="block mb-2 font-bold mt-5">Type</label>
                <select
                    className="border px-4 py-2 rounded w-full"
                    value={formData.type}
                    onChange={(e) => { setFormData({ ...formData, type: e.target.value }) }}
                >
                    <option value="">All</option>
                    <option value="coupon">Coupon</option>
                    <option value="info">Information</option>
                </select>
                <div className="w-full flex justify-around">
                    <button type="submit" className="block bg-gray-500 px-7 py-3 rounded mt-5 text-white">
                        Huỷ
                    </button>
                    <button type="submit" className="block bg-green-500 px-7 py-3 rounded mt-5 text-white"
                    onClick={handleSubmit}>
                        Thêm
                    </button>
                </div>
            </form>

        </div>
    )
}


