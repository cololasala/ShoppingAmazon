import { Product } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  subtotal: number;
}

const initialState: CartState = {
  items: [],
  subtotal: 0,
};

const calculateSubtotal = (items: CartItem[]) => {
  return Number(
    items
      .reduce((acc, item) => acc + item.product.currentPrice + item.quantity, 0)
      .toFixed(2),
  );
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItem(state, action: PayloadAction<CartItem>) {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        //state.items.push(action.payload);
        state.items = [...state.items, action.payload];
      }
      state.subtotal = calculateSubtotal(state.items);
    },
    removeCartItem(state, action: PayloadAction<CartItem>) {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );
      if (!existingItem) return;

      if (existingItem.quantity > quantity) {
        existingItem.quantity -= quantity;
      } else {
        state.items = state.items.filter(
          (item) => item.product.id === product.id,
        );
      }
      state.subtotal = calculateSubtotal(state.items);
    },
    clearCart(state) {
      state.items = [];
      state.subtotal = 0;
    },
  },
});

export const { addCartItem, removeCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
