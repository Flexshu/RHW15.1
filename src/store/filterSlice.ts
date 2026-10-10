import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryFilter } from "../types";

const initialState: { category: CategoryFilter } = { category: "Всі" };

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<CategoryFilter>) => {
      state.category = action.payload;
    }
  }
});

export const { setCategory } = filterSlice.actions;
export default filterSlice.reducer;
