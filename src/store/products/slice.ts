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
  },
});

export const { setComparison, addToComparison } = counterSlice.actions;

export default counterSlice.reducer;
