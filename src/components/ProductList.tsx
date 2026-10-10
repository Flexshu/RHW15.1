import { selectVisibleProducts, useAppSelector } from "../store";
import { Product } from "../types";
import ProductCard from "./ProductCard";

export default function ProductList({ onEdit }: { onEdit: (product: Product) => void }) {
  const products = useAppSelector(selectVisibleProducts);

  if (products.length === 0) {
    return <p className="rounded-2xl bg-white p-10 text-center text-slate-500">Товарів не знайдено</p>;
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onEdit={onEdit} />
      ))}
    </div>
  );
}
