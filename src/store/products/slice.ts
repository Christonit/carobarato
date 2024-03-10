import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product, Price } from "../../types";

export interface CounterState {
  comparissons: {
    [key: string]: Product[];
  };
  sidebarOpen: boolean;
}

const initialState: CounterState = {
  comparissons: {},
  sidebarOpen: false,
};

export const counterSlice = createSlice({
  name: "comparisons",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setComparison: (
      state,
      action: PayloadAction<{ key: string; products: Product[] }>
    ) => {
      state.comparissons[action.payload.key] = action.payload.products;
    },
    addToComparison: (
      state,
      action: PayloadAction<{ key: string; product: Product }>
    ) => {
      state.comparissons[action.payload.key].push(action.payload.product);
    },
    removeFromComparison: (
      state,
      action: PayloadAction<{ list: string; product_name: string }>
    ) => {
      const newItems = state.comparissons[action.payload.list].filter(
        (product: Product) =>
          product.product_name !== action.payload.product_name
      );

      if (newItems.length > 0) {
        state.comparissons[action.payload.list] = newItems;
      } else {
        delete state.comparissons[action.payload.list];
      }
    },
  },
});

export const {
  setComparison,
  addToComparison,
  removeFromComparison,
  toggleSidebar,
} = counterSlice.actions;

export default counterSlice.reducer;
