"use client";

import React, { useState } from "react";

export default function UploadImage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setUrl(null);
    setErr(null);
    if (f) {
      const objectUrl = URL.createObjectURL(f);
      setPreview(objectUrl);
    } else {
      setPreview(null);
    }
  };

  const onUpload = async () => {
    if (!file) return;
    setUploading(true);
    setErr(null);
    setUrl(null);

    try {
      const form = new FormData();
      form.append("file", file);

      // Gọi trực tiếp NestJS (chạy cổng 9090) — nhớ bật CORS ở Nest
      const res = await fetch("http://localhost:9090/api/upload", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }
      const data = await res.json();
      setUrl(data.url);
    } catch (e: any) {
      setErr(e.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-xl max-w-md">
      <input
        type="file"
        accept="image/*"
        onChange={onChange}
        className="block w-full text-sm"
      />

      {preview && (
        <div className="w-40 h-40 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
          {/* Preview thô; bạn có thể dùng next/image nếu ảnh là URL remote */}
          <img src={preview} alt="preview" className="max-w-full max-h-full object-contain" />
        </div>
      )}

      <button
        disabled={!file || uploading}
        onClick={onUpload}
        className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {url && (
        <p className="text-sm">
          ✅ Uploaded:{" "}
          <a href={url} target="_blank" className="text-blue-600 underline">
            {url}
          </a>
        </p>
      )}
      {err && <p className="text-sm text-red-600">⛔ {err}</p>}
    </div>
  );
}
