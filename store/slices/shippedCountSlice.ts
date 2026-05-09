import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ShippedCountState {
  count: number;
}

const initialState: ShippedCountState = {
  count: 0,
};

const shippedCountSlice = createSlice({
  name: "shippedCount",
  initialState,
  reducers: {
    setShippedCount(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
  },
});

export const { setShippedCount } = shippedCountSlice.actions;
export default shippedCountSlice.reducer;
