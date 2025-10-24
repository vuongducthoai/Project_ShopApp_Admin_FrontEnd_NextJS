"use client"
import React, { useState, useEffect } from "react";
import api from "@/lib/api";

interface CategoryFormProps {
    onSuccess: () => void;
    editingCategory?: { id: string; categoryName: string } | null;
    onCancel?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess, editingCategory, onCancel }) => {
    const [categoryName, setCategoryName] = useState("");
    
    useEffect(() => {
        if (editingCategory) setCategoryName(editingCategory.categoryName)
        else setCategoryName("")
    }, [editingCategory])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCategory) {
                await api.patch(`/categories/${editingCategory.id}`, { categoryName })
            } else {
                await api.post("/categories", { categoryName });
            }
            onSuccess();
            setCategoryName("");
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Lỗi khi lưu category!");
        }
    }
    
    return (
        <form 
            onSubmit={handleSubmit} 
            style={{
                backgroundColor: "white",
                padding: "2rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "28rem",
                border: "1px solid #e5e7eb"
            }}
        >
            <h2 style={{ 
                fontSize: "1.5rem", 
                fontWeight: "700", 
                marginBottom: "1.5rem",
                color: "#1f2937",
                borderBottom: "3px solid #3b82f6",
                paddingBottom: "0.5rem"
            }}>
                {editingCategory ? "✏️ Sửa Category" : "➕ Thêm Category"}
            </h2>
            
            <div style={{ marginBottom: "1.5rem" }}>
                <label style={{
                    display: "block",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#374151",
                    marginBottom: "0.5rem"
                }}>
                    Tên Category
                </label>
                <input 
                    type="text" 
                    placeholder="Nhập tên category..."
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    required
                    style={{
                        border: "2px solid #e5e7eb",
                        padding: "0.75rem",
                        maxWidth:"94%",
                        width: "100%",
                        borderRadius: "0.5rem",
                        outline: "none",
                        fontSize: "1rem",
                        transition: "all 0.2s"
                    }}
                    onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#3b82f6";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
                    }}
                    onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                    }}
                />
            </div>
            
            <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#3b82f6",
                        color: "white",
                        padding: "0.75rem 1.5rem",
                        borderRadius: "0.5rem",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: "600",
                        fontSize: "1rem",
                        flex: 1,
                        transition: "all 0.2s",
                        boxShadow: "0 2px 4px rgba(59, 130, 246, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#2563eb";
                        e.currentTarget.style.transform = "translateY(-2px)";
                        e.currentTarget.style.boxShadow = "0 4px 8px rgba(59, 130, 246, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#3b82f6";
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(59, 130, 246, 0.3)";
                    }}
                >
                    {editingCategory ? "💾 Cập nhật" : "✨ Thêm mới"}
                </button>
                
                {editingCategory && onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        style={{
                            backgroundColor: "#6b7280",
                            color: "white",
                            padding: "0.75rem 1.5rem",
                            borderRadius: "0.5rem",
                            border: "none",
                            cursor: "pointer",
                            fontWeight: "600",
                            fontSize: "1rem",
                            transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#4b5563";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#6b7280";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                    >
                        ❌ Huỷ
                    </button>
                )}
            </div>
        </form>
    )
}

export default CategoryForm;