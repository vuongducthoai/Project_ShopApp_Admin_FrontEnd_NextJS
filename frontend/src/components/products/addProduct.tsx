//// app/products/add/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Info } from "lucide-react";

type Category = { id: string; categoryName: string };
const ALL_SIZES = ["S", "M", "L", "XL", "XXL"] as const;
type SizeKey = typeof ALL_SIZES[number];

const MAX_FILES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function AddProductPage() {
  const router = useRouter();

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

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoadingCats(true);
      try {
        const res = await fetch("http://localhost:9090/api/categories/all");
        const data = await res.json();
        setCategories(data?.categories || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoadingCats(false);
      }
    })();
  }, []);

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
    for (const s of ALL_SIZES) if (checked[s]) arr.push({ size: s, quantity: Number(qty[s]) || 0 });
    return arr;
  }, [checked, qty]);

  const pushFiles = (files: File[]) => {
    setErrorMsg(null);
    const next = [...images];

    for (const f of files) {
      if (!f.type.startsWith("image/")) { setErrorMsg("Chỉ cho phép file ảnh."); continue; }
      if (f.size > MAX_FILE_SIZE) { setErrorMsg(`"${f.name}" vượt 5MB.`); continue; }
      const dup = next.some(x => x.name === f.name && x.size === f.size);
      if (dup) continue;
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

  const removeImage = (idx: number) => {
    const nextImgs = images.filter((_, i) => i !== idx);
    const nextPrev = previews.filter((_, i) => i !== idx);
    URL.revokeObjectURL(previews[idx]);
    setImages(nextImgs);
    setPreviews(nextPrev);
  };

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
    images.forEach((f) => form.append("images", f));
    // Debug xem FormData trước khi gửi
    for (const [key, value] of form.entries()) {
      if (value instanceof File) {
        console.log(`📷 FILE FIELD: ${key}`);
        console.log(`   → name: ${value.name}`);
        console.log(`   → size: ${value.size} bytes`);
        console.log(`   → type: ${value.type}`);
      } else {
        console.log(`🧾 FIELD: ${key} = ${value}`);
      }
    }

    const res = await fetch("http://localhost:9090/api/products", {
      method: "POST",
      body: form,
    });

    if (!res.ok) {
      const t = await res.text();
      setErrorMsg(t || "Tạo sản phẩm thất bại");
      return;
    }
    alert("Tạo sản phẩm thành công!");
    router.push("/products");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-5 py-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-800">
            Add Product
          </h1>
          <div className="border-t border-gray-200 mt-3" />
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          {/* Info */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800">Basic Information</h2>
            <div className="border-t border-gray-200 mt-4 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Product Name</span>
                <input
                  value={productName}
                  suppressHydrationWarning={true}
                  onChange={(e) => setProductName(e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tên sản phẩm"
                  required
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Price (VND)</span>
                <input
                  type="number"
                  min={0}
                  suppressHydrationWarning={true}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Giá..."
                  required
                />
              </label>

              <label className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-700">Category</span>
                <select
                  value={categoryId}
                  suppressHydrationWarning={true}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">-- Chọn category --</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.categoryName}</option>
                  ))}
                </select>
                {loadingCats && (
                  <span className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Info size={14} /> Đang tải categories…
                  </span>
                )}
              </label>

              <label className="flex flex-col gap-1 md:col-span-2">
                <span className="text-sm font-medium text-gray-700">Description</span>
                <textarea
                  value={description}
                  suppressHydrationWarning={true}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Mô tả…"
                />
              </label>
            </div>
          </section>

          {/* Sizes */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800">Sizes & Quantity</h2>
            <div className="border-t border-gray-200 mt-4 pt-4 grid grid-cols-2 md:grid-cols-5 gap-3">
              {ALL_SIZES.map((s) => (
                <div key={s} className="flex items-center gap-2 border border-gray-200 rounded-xl p-2 hover:shadow-sm transition">
                  <input
                    type="checkbox"
                    suppressHydrationWarning={true}
                    checked={checked[s]}
                    onChange={(e) => setChecked((st) => ({ ...st, [s]: e.target.checked }))}
                    className="rounded"
                  />
                  <span className="w-8 font-medium text-gray-700">{s}</span>
                  <input
                    type="number"
                    min={0}
                    value={qty[s]}
                    suppressHydrationWarning={true}
                    onChange={(e) => setQty((st) => ({ ...st, [s]: Number(e.target.value) || 0 }))}
                    className="border border-gray-300 rounded-lg px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!checked[s]}
                    placeholder="0"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Images row + chip */}
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6">
            <h2 className="text-lg font-semibold text-gray-800">Product Images</h2>

            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="flex items-start gap-4 overflow-x-auto no-scrollbar">
                {previews.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-200 bg-white shrink-0"
                  >
                    <button
                      type="button"
                      suppressHydrationWarning={true}
                      onClick={() => removeImage(i)}
                      className="absolute -left-2 -top-2 w-7 h-7 rounded-full bg-rose-100 text-rose-700 
                                 hover:bg-rose-200 shadow-sm flex items-center justify-center transition"
                      title="Xóa ảnh"
                    >
                      ×
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt={`preview-${i}`} className="w-full h-full object-cover" />
                  </div>
                ))}

                <label
                  className="shrink-0 inline-flex items-center justify-center 
                             px-3 py-2 rounded-lg border-2 border-dashed border-amber-400
                             text-amber-600 bg-amber-50/40 hover:bg-amber-50 cursor-pointer
                             text-sm font-medium transition"
                >
                  + Thêm hình ảnh
                  <input
                    ref={inputRef}
                    suppressHydrationWarning={true}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={onFileInputChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="text-xs text-gray-500 mt-3">
                {images.length > 0 ? (
                  <>Đã chọn <b>{images.length}</b> ảnh • Tổng dung lượng <b>{formatBytes(totalSize)}</b></>
                ) : (
                  <>PNG/JPG ≤ 5MB • Tối đa {MAX_FILES} ảnh</>
                )}
              </div>
            </div>
          </section>

          {errorMsg && (
            <div className="rounded-xl border border-red-200 bg-red-50 text-red-700 px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}

          <div className="flex gap-3">
            <button
              suppressHydrationWarning={true}
              type="submit"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm transition"
            >
              Create
            </button>
            <button
              type="button"
              suppressHydrationWarning={true}
              //onClick={() => router.push("/products")}
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
