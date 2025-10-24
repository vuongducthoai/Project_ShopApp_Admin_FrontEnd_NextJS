import UploadImage from "@/components/UploadImage";

export default function Page() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Upload ảnh → GCS</h1>
      <UploadImage />
    </main>
  );
}
