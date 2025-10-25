import EditProductPage from "@/components/products/editProduct";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ProductsPage() {
  return (
    <ProtectedRoute>
    <EditProductPage />
    </ProtectedRoute>)
}
