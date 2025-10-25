"use client";
import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import Link from "next/link";
import { Search } from "lucide-react";
import { Info } from "lucide-react";
import "./productList.css"
interface ConfirmationModalProps {
  show: boolean;
  handleClose: () => void;
  handleConfirm: () => Promise<void>;
  message: string;
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  show,
  handleClose,
  handleConfirm,
  message,
}: ConfirmationModalProps) => {
  return (
<div
  className={`fixed inset-0 flex items-center justify-center z-50 transition-all ${show ? "" : "hidden"}`}
  style={{ zIndex: 9999 }} // Đảm bảo modal có z-index cao hơn các phần tử khác
>
  <div className="modal-overlay fixed inset-0 bg-black opacity-50"></div>
  <div className="modal-content bg-white p-8 rounded-lg shadow-lg max-w-lg w-full h-auto overflow-auto">
    <div className="modal-header flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-800">Xác Nhận</h3>
      <button className="text-gray-400 hover:text-gray-600" onClick={handleClose}>
        ✕
      </button>
    </div>
    <div className="modal-body mt-4">
      <p className="text-gray-600">{message}</p>
    </div>
    <div className="modal-footer flex justify-end gap-4 mt-6">
      <button
        className="px-6 py-2 rounded-md bg-gray-300 text-gray-700 hover:bg-gray-400 transition"
        onClick={handleClose}
      >
        Hủy
      </button>
      <button
        className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        onClick={handleConfirm}
      >
        Xác Nhận
      </button>
    </div>
  </div>
</div>



  );
};

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Quản lý searchTerm bằng useState
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
 const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(null);
  const [productStatusToChange, setProductStatusToChange] = useState<boolean>(true); // Status to change
// Hiển thị modal
  const handleShowModal = (productId: string, status: boolean) => {
    setProductIdToDelete(productId);
    setProductStatusToChange(status);
    setShowModal(true);
  };

  // Đóng modal
  const handleCloseModal = () => setShowModal(false);


  // Fetch dữ liệu từ backend
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:9090/api/products/all", {
      params: {
        page: currentPage,
        limit: 6,
        searchTerm: searchTerm,
        filterStatus: filterStatus,
      },
    });
    const list = response.data.products || [];
    setProducts(list);
    setFilteredProducts(list);
    setTotalPages(response.data.totalPages ?? 1);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Gọi lại mỗi khi thay đổi trang, lọc, hoặc tìm kiếm
useEffect(() => {
  fetchProducts();
}, [currentPage, filterStatus, searchTerm,totalPages]);

  // Hàm xóa hoặc mở bán lại sản phẩm
  const changeProductStatus = async (productId: string, status: boolean) => {
    try {
      const response = await axios.put(
        `http://localhost:9090/api/products/${productId}/status`,
        { status: !status } // Toggle the status
      );
      const updatedProduct = response.data.product;
      // Cập nhật lại danh sách sản phẩm sau khi cập nhật trạng thái
      await fetchProducts();
      setShowModal(false); // Đóng modal sau khi cập nhật
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái sản phẩm:", error);
      alert("Đã có lỗi xảy ra khi cập nhật trạng thái sản phẩm.");
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

  };

  const getStatusLabel = (status: boolean, quantity: number) => {
    if (!status)
      return {
        label: "Ngừng bán",
        cls: "bg-red-100 text-red-700 border border-red-300",
      };
    if (quantity === 0)
      return {
        label: "Hết hàng",
        cls: "bg-yellow-100 text-yellow-700 border border-yellow-300",
      };
    return {
      label: "Đang bán",
      cls: "bg-green-100 text-green-700 border border-green-300",
    };
  };

  const toArray = (val: any) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;
    if (typeof val === "string") {
      return val.split(/[,\/\s]+/).map((s) => s.trim()).filter(Boolean);
    }
    return [String(val)];
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header: Title + Search + Add Product */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
           Product List
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search box */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search product name..."
              suppressHydrationWarning={true}
              className="pl-9 pr-3 py-2 w-64 text-sm border border-gray-300 rounded-full focus:ring-2 focus:ring-orange-400 outline-none transition"
              value={searchTerm} // Đồng bộ giá trị của input với state
              onChange={(e) => setSearchTerm(e.target.value)} // Cập nhật giá trị khi người dùng nhập
            />
          </div>

          {/* Add product button */}
          <Link href="/products/add">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-full shadow-sm transition-all flex items-center"  suppressHydrationWarning={true}>
            <img src="/images/plus.png" alt="add" className="w-4 h-4 mr-3" /> Add Product
            </button>
          </Link>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {[
          { key: "all", label: "Tất cả" },
          { key: "selling", label: "Đang bán" },
          { key: "out", label: "Hết hàng" },
          { key: "stopped", label: "Ngừng bán" },
        ].map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilterStatus(btn.key)}
            suppressHydrationWarning={true}
            className={`px-4 py-2 rounded-full font-medium text-sm transition-all border ${
              filterStatus === btn.key
                ? "bg-blue-500 text-white border-blue-500 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Product Table */}
      <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
        <table className="min-w-full table-auto text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-4 pl-10 text-left">Image</th>
              <th className="px-4 py-3 text-left">Product Name</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-center">Piece</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Sizes</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No products found.
                </td>
              </tr>
            ) : (
              filteredProducts.map((product, index) => {
                const priceNumber = Number(product.price ?? 0);
                const status = getStatusLabel(product.status, product.quantity);

                const sizes =
                  product.productSizes && Array.isArray(product.productSizes)
                    ? product.productSizes
                        .map((s: any) => s.sizeName || s)
                        .filter(Boolean)
                    : toArray(product.sizes);

                return (
                  <tr
                    key={product.id ?? index}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-2 pl-0 ">
                      <div className="flex items-center justify-center">
                        <div className="w-14 h-14 bg-white-50 rounded-lg flex items-center justify-center overflow-hidden">
                          <img
                            src={product.imageProduct}
                            alt={product.productName}
                            className="w-12 h-12 object-contain rounded-md"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800">
                      {product.productName}
                    </td>
                    <td className="px-4 py-3">{product.categoryName}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {priceNumber.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td className="px-4 py-3 text-center">{product.quantity}</td>
                    <td className="px-4 py-3 text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full ${status.cls}`}
                      >
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center flex-wrap gap-2">
                        {sizes.length === 0 ? (
                          <span className="text-xs text-gray-400">—</span>
                        ) : (
                          sizes.map((s: string, i: number) => (
                            <span
                              key={i}
                              className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-full border border-gray-200"
                            >
                              {s}
                            </span>
                          ))
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center space-x-2">
                      <Link href={`/products/edit/${product.id}`}>
                        <button className="p-2 rounded-lg transition bg-blue-500">
                          <img src="/images/edit-icon.png" alt="Edit" className="w-6 h-6" />
                        </button>
                      </Link>
                      <button
                        className={`p-2 rounded-lg transition ${product.status ? "bg-red-500 hover:bg-red-500" : "bg-green-500 hover:bg-green-500"}`}
                        onClick={() => handleShowModal(product.id, product.status)}
                      >
                        <img 
                          src={product.status ? "/images/trash.png" : "/images/refresh.png"} 
                          alt={product.status ? "Delete" : "Reload"} 
                          className="w-6 h-6"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
    {/* Pagination */}
 {/* Pagination - Fixed at the bottom */}
  <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-md flex justify-center items-center gap-2 mt-6 z-10">
    <button
      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg disabled:opacity-50 transition"
      disabled={currentPage === 1}
      onClick={() => handlePageChange(currentPage - 1)}
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, i) => (
      <button
      suppressHydrationWarning={true}
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
   {/* Confirmation Modal */}
      <ConfirmationModal
        show={showModal}
        handleClose={handleCloseModal}
        handleConfirm={() => changeProductStatus(productIdToDelete!, productStatusToChange)}
        message={`Bạn có chắc chắn muốn ${productStatusToChange ? "ngừng bán" : "mở bán"} sản phẩm này?`}
      />
</div>
  );
};

export default ProductList;
