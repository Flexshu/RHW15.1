export const CATEGORIES = ["Електроніка", "Одяг", "Продукти", "Книги"] as const;

export type Category = (typeof CATEGORIES)[number];

export type CategoryFilter = Category | "Всі";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
}

export type ProductInput = Omit<Product, "id">;
