import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductInput } from "../types";

const initialState: Product[] = [
  { id: "1", name: "Смартфон Galaxy", category: "Електроніка", price: 18999, description: "6.5\" дисплей, 128 ГБ пам'яті" },
  { id: "2", name: "Бездротові навушники", category: "Електроніка", price: 2499, description: "Шумозаглушення, до 24 годин роботи" },
  { id: "3", name: "Худі оверсайз", category: "Одяг", price: 1299, description: "Бавовна, сірий колір" },
  { id: "4", name: "Джинси класичні", category: "Одяг", price: 1599, description: "Прямий крій, темно-синій колір" },
  { id: "5", name: "Кава в зернах 1 кг", category: "Продукти", price: 549, description: "100% арабіка, середнє обсмаження" },
  { id: "6", name: "Оливкова олія", category: "Продукти", price: 289, description: "Extra virgin, 500 мл" },
  { id: "7", name: "Чистий код", category: "Книги", price: 699, description: "Роберт Мартін про написання якісного коду" }
];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: {
      reducer: (state, action: PayloadAction<Product>) => {
        state.push(action.payload);
      },
      prepare: (input: ProductInput) => ({ payload: { id: nanoid(), ...input } })
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      return state.filter((p) => p.id !== action.payload);
    }
  }
});

export const { addProduct, updateProduct, deleteProduct } = productsSlice.actions;
export default productsSlice.reducer;
