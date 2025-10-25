// app/products/page.tsx
import ProductList from "@/components/products/productList";
import ProtectedRoute from "@/components/ProtectedRoute";

export default async function ProductsPage() {
  // phần này vẫn là server component
  return (
    <ProtectedRoute>
    <div>
      <h1></h1>
      <ProductList /> {/* Client component */}
    </div>
    </ProtectedRoute>
  );
}
