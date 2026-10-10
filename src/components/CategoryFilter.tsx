import { setCategory } from "../store/filterSlice";
import { useAppDispatch, useAppSelector } from "../store";
import { CATEGORIES, CategoryFilter as CategoryFilterType } from "../types";

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.filter.category);

  return (
    <div className="flex items-center gap-3">
      <label htmlFor="category" className="text-sm font-medium text-slate-600">
        Категорія
      </label>
      <select
        id="category"
        value={selected}
        onChange={(e) => dispatch(setCategory(e.target.value as CategoryFilterType))}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
      >
        <option value="Всі">Всі</option>
        {CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}
