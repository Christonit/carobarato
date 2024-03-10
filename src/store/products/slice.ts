import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Product, Price } from "../../types";

export interface CounterState {
  comparissons: {
    [key: string]: Product[];
  };
}

const initialState: CounterState = {
  comparissons: {},
};

export const counterSlice = createSlice({
  name: "comparisons",
  initialState,
  reducers: {
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
      console.log(
        "removing",
        action.payload,
        ...state.comparissons[action.payload.list]
      );

      state.comparissons[action.payload.list] = state.comparissons[
        action.payload.list
      ].filter(
        (product: Product) =>
          product.product_name !== action.payload.product_name
      );
      // delete state.comparissons[action.payload];
    },
  },
});

export const { setComparison, addToComparison, removeFromComparison } =
  counterSlice.actions;

export default counterSlice.reducer;
