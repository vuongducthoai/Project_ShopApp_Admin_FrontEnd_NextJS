"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Modal Create
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [error, setError] = useState("");

  // Modal Edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);
  const [editName, setEditName] = useState("");

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9090/api/categories?page=${currentPage}&limit=7`
      );
      const list = response.data.categories || [];
      setCategories(list);
      setFilteredCategories(list);
      setTotalPages(response.data.totalPages ?? 1);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  // ✅ Search (Fuse.js)
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCategories(categories);
    } else {
      const fuse = new Fuse(categories, {
        keys: ["categoryName"],
        threshold: 0.3,
      });
      const results = fuse.search(searchTerm);
      setFilteredCategories(results.map((r) => r.item));
    }
  }, [searchTerm, categories]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // ✅ Validation
  const validateCategory = (name: string) => {
    if (!name.trim()) return "Category name cannot be empty.";
    const regex = /^[a-zA-Z0-9\sÀ-ỹ]+$/;
    if (!regex.test(name)) return "Category name contains invalid characters.";
    return "";
  };

  // ✅ CREATE category
  const handleCreateCategory = async () => {
    const err = validateCategory(newCategory);
    if (err) {
      setError(err);
      return;
    }

    const nameToCheck = newCategory.trim().toLowerCase();
    const exists = categories.some(
      (cat) => cat.categoryName.trim().toLowerCase() === nameToCheck
    );
    if (exists) {
      setError("Category already exists!");
      return;
    }

    try {
      await axios.post("http://localhost:9090/api/categories", {
        categoryName: newCategory.trim(),
      });
      setNewCategory("");
      setError("");
      setIsModalOpen(false);
      fetchCategories();
    } catch (error: any) {
      console.error("Error creating category:", error);
      setError(error.response?.data?.message || "Error creating category");
    }
  };

  // ✅ UPDATE category
  const handleUpdateCategory = async () => {
    const err = validateCategory(editName);
    if (err) {
      setError(err);
      return;
    }

    if (
      editName.trim().toLowerCase() ===
      editCategory.categoryName.trim().toLowerCase()
    ) {
      setError("Category name is unchanged.");
      return;
    }

    const exists = categories.some(
      (cat) =>
        cat.categoryName.trim().toLowerCase() === editName.trim().toLowerCase() &&
        cat.id !== editCategory.id
    );
    if (exists) {
      setError("Category name already exists!");
      return;
    }

    try {
      await axios.patch(
        `http://localhost:9090/api/categories/${editCategory.id}`,
        { categoryName: editName.trim() }
      );
      setIsEditModalOpen(false);
      setError("");
      fetchCategories();
    } catch (error: any) {
      console.error("Error updating category:", error);
      setError(error.response?.data?.message || "Error updating category");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Category List</h1>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search category..."
            className="pl-9 pr-3 py-2 w-64 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-full shadow-sm transition-all flex items-center"
          >
            <img src="/images/plus.png" alt="add" className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100 mb-16 ml-15 mr-15">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 pl-10 text-left">STT</th>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Category Name</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredCategories.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-gray-500">
                  No categories found.
                </td>
              </tr>
            ) : (
              filteredCategories.map((category, index) => (
                <tr
                  key={category.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-12 py-3 text-left">{index + 1}</td>
                  <td className="px-4 py-3 text-left">
                    <img
                      src={category.image || "/images/wardrobe.png"}
                      alt={category.categoryName}
                      className="w-10 h-10 object-cover rounded-full"
                    />
                  </td>
                  <td className="px-4 py-3">{category.categoryName}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
                      onClick={() => {
                        setEditCategory(category);
                        setEditName(category.categoryName);
                        setError("");
                        setIsEditModalOpen(true);
                      }}
                    >
                      <img
                        src="/images/edit-icon.png"
                        alt="Edit"
                        className="w-6 h-6"
                      />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex justify-center items-center gap-2 z-10">
        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 transition"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`w-9 h-9 rounded-lg font-medium transition-all ${
              currentPage === i + 1
                ? "bg-blue-500 text-white shadow-md"
                : "bg-white border border-gray-300 hover:bg-blue-100"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 transition"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      {/* ✅ Modal Create */}
      {isModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/25 z-40"></div>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-96 p-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Add New Category
              </h2>

              <input
                type="text"
                placeholder="Enter category name"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  error ? "border-red-400" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-orange-400 outline-none`}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setError("");
                    setNewCategory("");
                  }}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreateCategory}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ✅ Modal Edit */}
      {isEditModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/25 z-40"></div>
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-96 p-6 animate-fadeIn">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Edit Category
              </h2>

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className={`w-full px-4 py-2 border ${
                  error ? "border-red-400" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-400 outline-none`}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setError("");
                  }}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateCategory}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryList;
