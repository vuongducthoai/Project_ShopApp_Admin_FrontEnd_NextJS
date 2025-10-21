// app/products/page.tsx
import ProductList from "@/components/products/productList";

export default async function ProductsPage() {
  // phần này vẫn là server component
  return (
    <div>
      <h1></h1>
      <ProductList /> {/* Client component */}
    </div>
  );
}
