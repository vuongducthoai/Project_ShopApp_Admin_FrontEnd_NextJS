"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useRouter ,useParams} from "next/navigation";
import { Info } from "lucide-react";

type Category = { id: string; categoryName: string };
type ProductImage = { id: string; imageProduct: string };
const ALL_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
type SizeKey = typeof ALL_SIZES[number];

const MAX_FILES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function EditProductPage() {
  const router = useRouter();  
    const params = useParams(); // 🟢 lấy id từ URL
  const id = params?.id as string; // ép kiểu cho chắc chắn// Lấy id từ query parameters
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);

  const [checked, setChecked] = useState<Record<SizeKey, boolean>>({
    S: false, M: false, L: false, XL: false, XXL: false,
  });
  const [qty, setQty] = useState<Record<SizeKey, number>>({
    S: 0, M: 0, L: 0, XL: 0, XXL: 0,
  });

  // 🟡 Ảnh cũ từ DB
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  // 🟢 Ảnh mới upload
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 🟢 Load dữ liệu sản phẩm
  useEffect(() => {
    (async () => {
      
      try {
        
        const res = await fetch(`http://localhost:9090/api/products/${id}`);
        const data = await res.json();

        if (data) {
          setProductName(data.productName);
          setPrice(data.price);
          setCategoryId(data.category.id);
          setDescription(data.description);

          // Size
          const productSizes = data.productSizes || [];
          const checkedSizes: Record<SizeKey, boolean> = { S: false, M: false, L: false, XL: false, XXL: false };
          const qtySizes: Record<SizeKey, number> = { S: 0, M: 0, L: 0, XL: 0, XXL: 0 };
          productSizes.forEach((size: any) => {
            checkedSizes[size.size as SizeKey]  = true;
            qtySizes[size.size as SizeKey] = size.quantity;
          });
          setChecked(checkedSizes);
          setQty(qtySizes);

          // Ảnh
          const imagesList = data.listImage || [];
          const formattedImages = imagesList.map((img: any) => ({
            id: img.id,
            imageProduct: img.imageProduct,
          }));
          setProductImages(formattedImages);
        }

        // Lấy categories
        setLoadingCats(true);
        const categoryRes = await fetch("http://localhost:9090/api/categories/all");
        const categoryData = await categoryRes.json();
        setCategories(categoryData?.categories || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCats(false);
      }
    })();
  }, [id]);

  // 🟢 Cleanup preview URL khi unmount
  useEffect(() => {
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
  }, [previews]);

  const formatBytes = (n: number) => {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  };

  const totalSize = useMemo(() => images.reduce((s, f) => s + f.size, 0), [images]);

  const productSizesPayload = useMemo(() => {
    const arr: { size: SizeKey; quantity: number }[] = [];
    for (const s of ALL_SIZES)
      if (checked[s]) arr.push({ size: s, quantity: Number(qty[s]) || 0 });
    return arr;
  }, [checked, qty]);

  // 🟢 Xử lý thêm ảnh mới
  const pushFiles = (files: File[]) => {
    setErrorMsg(null);
    const next = [...images];
    for (const f of files) {
      if (!f.type.startsWith("image/")) { setErrorMsg("Chỉ cho phép file ảnh."); continue; }
      if (f.size > MAX_FILE_SIZE) { setErrorMsg(`"${f.name}" vượt 5MB.`); continue; }
      if (next.length >= MAX_FILES) { setErrorMsg(`Tối đa ${MAX_FILES} ảnh.`); break; }
      next.push(f);
    }
    previews.forEach((u) => URL.revokeObjectURL(u));
    setImages(next);
    setPreviews(next.map(f => URL.createObjectURL(f)));
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    pushFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  };

  // 🟢 Xóa ảnh mới
  const removeNewImage = (idx: number) => {
    const nextImgs = images.filter((_, i) => i !== idx);
    const nextPrev = previews.filter((_, i) => i !== idx);
    URL.revokeObjectURL(previews[idx]);
    setImages(nextImgs);
    setPreviews(nextPrev);
  };

  // 🟢 Xóa ảnh cũ
  const removeOldImage = (id: string) => {
    setDeletedImageIds((prev) => [...prev, id]);
    setProductImages((imgs) => imgs.filter((img) => img.id !== id));
  };

  // 🟢 Submit form
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!productName.trim()) return setErrorMsg("Nhập tên sản phẩm.");
    if (!categoryId) return setErrorMsg("Chọn category.");
    if (price < 0) return setErrorMsg("Giá không hợp lệ.");

    const form = new FormData();
    form.append("productName", productName);
    form.append("price", String(price));
    form.append("categoryId", categoryId);
    form.append("description", description);
    form.append("productSizes", JSON.stringify(productSizesPayload));
    form.append("deletedImageIds", JSON.stringify(deletedImageIds));

    images.forEach((f) => form.append("images", f));

    const res = await fetch(`http://localhost:9090/api/products/${params.id}`, {
      method: "PUT",
      body: form,
    });

    if (!res.ok) {
      const t = await res.text();
      setErrorMsg(t || "Cập nhật sản phẩm thất bại");
      return;
    }

    alert("Cập nhật sản phẩm thành công!");
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-800">
            Edit Product
          </h1>
          <div className="border-t border-gray-200 mt-3" />
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Basic Information */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
            <div className="border-t border-gray-200 mt-4 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Product Name</span>
                <input
                  value={productName}
                  suppressHydrationWarning={true}
                  onChange={(e) => setProductName(e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Price (VND)</span>
                <input
                suppressHydrationWarning={true}
                  type="number"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Category</span>
                <select
                suppressHydrationWarning={true}
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Choose Category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.categoryName}
                    </option>
                  ))}
                </select>
                {loadingCats && (
                  <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Info size={14} /> Loading categories...
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1 md:col-span-2">
                <span className="text-sm font-medium text-gray-700">Description</span>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </label>
            </div>
          </section>

          {/* Product Sizes */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800">Product Sizes</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
              {ALL_SIZES.map((size) => (
                <div key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked[size]}
                    onChange={(e) => {
                      setChecked((prev) => ({
                        ...prev,
                        [size]: e.target.checked,
                      }));
                    }}
                    className="rounded"
                  />
                  <span className="w-8 font-medium text-gray-700">{size}</span>
                  <input
                    type="number"
                    min={0}
                    value={qty[size]}
                    onChange={(e) => {
                      setQty((prev) => ({
                        ...prev,
                        [size]: Number(e.target.value),
                      }));
                    }}
                    className="border border-gray-300 rounded-lg px-2 py-1 w-20 focus:ring-2 focus:ring-blue-500"
                    disabled={!checked[size]}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Product Images */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800">Product Images</h2>
            <div className="border-t border-gray-200 mt-4 pt-4 space-y-3">
              {/* Ảnh cũ */}
              <div className="flex items-start gap-4 overflow-x-auto no-scrollbar">
                {productImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-200 bg-white shrink-0"
                  >
                    <img src={img.imageProduct} alt="old" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeOldImage(img.id)}
                      className="absolute top-1 left-1 bg-white/80 text-red-600 rounded-full px-1.5 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              {/* Ảnh mới */}
              {previews.length > 0 && (
                <div className="flex items-start gap-4 overflow-x-auto no-scrollbar">
                  {previews.map((src, i) => (
                    <div
                      key={`new-${i}`}
                      className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-200 bg-white shrink-0"
                    >
                      <img src={src} alt={`new-${i}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewImage(i)}
                        className="absolute top-1 left-1 bg-white/80 text-red-600 rounded-full px-1.5 text-xs font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Nút thêm ảnh */}
              <label className="inline-flex items-center justify-center px-3 py-2 rounded-lg border-2 border-dashed border-blue-400 text-blue-600 bg-blue-50/40 hover:bg-blue-50 cursor-pointer text-sm font-medium transition">
                + Thêm hình ảnh
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={onFileInputChange}
                  className="hidden"
                />
              </label>

              <div className="text-xs text-gray-500 mt-2">
                {images.length > 0
                  ? <>Đã chọn <b>{images.length}</b> ảnh • Tổng dung lượng <b>{formatBytes(totalSize)}</b></>
                  : <>PNG/JPG ≤ 5MB • Tối đa {MAX_FILES} ảnh</>}
              </div>
            </div>
          </section>

          {errorMsg && (
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="flex gap-3">
            <button type="submit" className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition">
              Update
            </button>
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="px-5 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
