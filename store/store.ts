import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./slices/authSlice";
import CartSlice from "./slices/cartSlice";
import ShippedCountSlice from "./slices/shippedCountSlice";

export const store = configureStore({
  reducer: {
    Auth: AuthSlice,
    ShippedCount: ShippedCountSlice,
    Cart: CartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
