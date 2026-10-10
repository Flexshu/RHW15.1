import { FormEvent, useState } from "react";
import { addProduct, updateProduct } from "../store/productsSlice";
import { useAppDispatch } from "../store";
import { CATEGORIES, Category, Product } from "../types";

interface Props {
  product: Product | null;
  onClose: () => void;
}

interface Errors {
  name?: string;
  price?: string;
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200";

export default function ProductForm({ product, onClose }: Props) {
  const dispatch = useAppDispatch();
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState<Category>(product?.category ?? CATEGORIES[0]);
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Errors = {};
    if (name.trim().length < 2) nextErrors.name = "Введіть назву (мінімум 2 символи)";
    const priceNumber = Number(price);
    if (!price || Number.isNaN(priceNumber) || priceNumber <= 0) nextErrors.price = "Ціна має бути більшою за 0";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const data = { name: name.trim(), category, price: priceNumber, description: description.trim() };
    if (product) dispatch(updateProduct({ id: product.id, ...data }));
    else dispatch(addProduct(data));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center bg-slate-900/40 p-4">
      <form onSubmit={handleSubmit} noValidate className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="mb-5 text-xl font-bold text-slate-800">
          {product ? "Редагувати товар" : "Новий товар"}
        </h2>

        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Назва</span>
          <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
          {errors.name && <span className="text-xs text-red-600">{errors.name}</span>}
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Категорія</span>
          <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="mb-4 block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Ціна, ₴</span>
          <input className={inputClass} type="number" min="0" value={price} onChange={(e) => setPrice(e.target.value)} />
          {errors.price && <span className="text-xs text-red-600">{errors.price}</span>}
        </label>

        <label className="mb-6 block">
          <span className="mb-1 block text-sm font-medium text-slate-600">Опис</span>
          <textarea className={inputClass} rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Скасувати
          </button>
          <button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Зберегти
          </button>
        </div>
      </form>
    </div>
  );
}
