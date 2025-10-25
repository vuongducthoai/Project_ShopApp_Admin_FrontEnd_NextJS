"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import CategoryForm from "./CategoryForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToggleOn, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import ProtectedRoute from "@/components/ProtectedRoute";
interface Category {
  id: string;
  categoryName: string;
  isActive: boolean;
}
export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOn, setIsOn] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleActive = async (id: string) => {
    try {
      setIsOn((prev)=> !prev)
      await api.patch(`/categories/${id}/state`);
      await fetchCategories();
    } catch (error) {
      console.error("Error toggling category state:", error);
      alert("Không thể thay đổi trạng thái category!");
    }
  };



  return (
    <ProtectedRoute>
    <div style={{
      padding: "2rem",
      backgroundColor: "#f9fafb",
      minHeight: "100vh"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto"
      }}>
        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          marginBottom: "2rem",
          color: "#111827",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem"
        }}>
          📁 Quản lý Category
        </h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "2rem",
          alignItems: "start"
        }}>
          <CategoryForm
            onSuccess={fetchCategories}
            editingCategory={editingCategory}
            onCancel={() => setEditingCategory(null)}
          />

          <div style={{
            backgroundColor: "white",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            border: "1px solid #e5e7eb"
          }}>
            <h2 style={{
              fontSize: "1.5rem",
              fontWeight: "700",
              marginBottom: "1.5rem",
              color: "#1f2937",
              borderBottom: "3px solid #10b981",
              paddingBottom: "0.5rem"
            }}>
              📋 Danh sách Categories
            </h2>

            {loading ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
                <div style={{
                  fontSize: "3rem",
                  marginBottom: "1rem",
                  animation: "spin 1s linear infinite"
                }}>⏳</div>
                <p style={{ fontSize: "1.125rem" }}>Đang tải dữ liệu...</p>
              </div>
            ) : categories.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "3rem",
                color: "#9ca3af"
              }}>
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>📭</div>
                <p style={{ fontSize: "1.125rem", fontWeight: "500" }}>Chưa có category nào</p>
                <p style={{ fontSize: "0.875rem", marginTop: "0.5rem" }}>Hãy thêm category đầu tiên!</p>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: "0"
                }}>
                  <thead>
                    <tr style={{ backgroundColor: "#f3f4f6" }}>
                      <th style={{
                        padding: "1rem",
                        textAlign: "center",
                        fontWeight: "700",
                        color: "#374151",
                        borderBottom: "2px solid #e5e7eb",
                        fontSize: "0.875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        STT
                      </th>
                      <th style={{
                        padding: "1rem",
                        textAlign: "left",
                        fontWeight: "700",
                        color: "#374151",
                        borderBottom: "2px solid #e5e7eb",
                        fontSize: "0.875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        Tên Category
                      </th>
                      <th style={{
                        padding: "1rem",
                        textAlign: "center",
                        fontWeight: "700",
                        color: "#374151",
                        borderBottom: "2px solid #e5e7eb",
                        fontSize: "0.875rem",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em"
                      }}>
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat, index) => (
                      <tr
                        key={cat.id}
                        style={{
                          backgroundColor: index % 2 === 0 ? "white" : "#f9fafb",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#eff6ff"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "white" : "#f9fafb"}
                      >
                        <td style={{
                          padding: "1rem",
                          textAlign: "center",
                          borderBottom: "1px solid #f3f4f6",
                          fontWeight: "600",
                          color: "#6b7280"
                        }}>
                          {index + 1}
                        </td>
                        <td style={{
                          padding: "1rem",
                          borderBottom: "1px solid #f3f4f6",
                          fontSize: "1rem",
                          color: "#1f2937",
                          fontWeight: "500"
                        }}>
                          {cat.categoryName}
                        </td>
                        <td style={{
                          padding: "1rem",
                          textAlign: "center",
                          borderBottom: "1px solid #f3f4f6"
                        }}>
                          <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                            <button
                              onClick={() => setEditingCategory(cat)}
                              style={{
                                backgroundColor: "#fbbf24",
                                color: "#78350f",
                                padding: "0.5rem 1rem",
                                borderRadius: "0.5rem",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                                fontSize: "0.875rem",
                                transition: "all 0.2s",
                                boxShadow: "0 2px 4px rgba(251, 191, 36, 0.3)"
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#f59e0b";
                                e.currentTarget.style.transform = "translateY(-2px)";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(245, 158, 11, 0.4)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "#fbbf24";
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = "0 2px 4px rgba(251, 191, 36, 0.3)";
                              }}
                            >
                              ✏️ Sửa
                            </button>
                            <div style={{maxWidth: "30px", maxHeight: "30px"}} onClick={() => handleToggleActive(cat.id)}>
                              {cat.isActive ?
                                <img style={{maxWidth: "30px", maxHeight: "30px"}} src="https://cdn-icons-png.flaticon.com/512/5720/5720464.png"/>

                                : <img style={{maxWidth: "30px", maxHeight: "30px"}} src="https://static.thenounproject.com/png/1217303-200.png"/>

                              }
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div >
    </ProtectedRoute>
  );
}
