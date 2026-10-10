import { useState } from "react";
import CategoryFilter from "./components/CategoryFilter";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import { Product } from "./types";

export default function App() {
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">Довідник товарів</h1>
          <button
            onClick={openCreate}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
          >
            + Додати товар
          </button>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-5 py-8">
        <div className="mb-6">
          <CategoryFilter />
        </div>
        <ProductList onEdit={openEdit} />
      </main>
      {formOpen && <ProductForm product={editing} onClose={() => setFormOpen(false)} />}
    </div>
  );
}
