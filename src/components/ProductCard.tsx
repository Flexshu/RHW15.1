import { deleteProduct } from "../store/productsSlice";
import { useAppDispatch } from "../store";
import { Product } from "../types";

interface Props {
  product: Product;
  onEdit: (product: Product) => void;
}

export default function ProductCard({ product, onEdit }: Props) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    if (window.confirm(`Видалити товар "${product.name}"?`)) {
      dispatch(deleteProduct(product.id));
    }
  };

  return (
    <div className="flex flex-col rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <span className="mb-3 w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600">
        {product.category}
      </span>
      <h3 className="text-lg font-semibold text-slate-800">{product.name}</h3>
      <p className="mt-1 flex-1 text-sm text-slate-500">{product.description || "Без опису"}</p>
      <p className="mt-4 text-xl font-bold text-slate-900">{product.price.toLocaleString("uk-UA")} ₴</p>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 rounded-lg border border-indigo-200 px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
        >
          Редагувати
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          Видалити
        </button>
      </div>
    </div>
  );
}
