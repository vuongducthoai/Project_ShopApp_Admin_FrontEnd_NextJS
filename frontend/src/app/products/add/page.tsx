// app/products/page.tsx
import AddProductPage from "@/components/products/addProduct";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function ProductsPage() {
  // phần này vẫn là server component
  return (
    <div>
      <h1></h1>
      <ProtectedRoute>
        <AddProductPage /> {/* Client component */}
      </ProtectedRoute>
    </div>
  );
}
