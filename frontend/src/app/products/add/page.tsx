// app/products/page.tsx
import AddProductPage from "@/components/products/addProduct";

export default async function ProductsPage() {
  // phần này vẫn là server component
  return (
    <div>
      <h1></h1>
      <AddProductPage /> {/* Client component */}
    </div>
  );
}
