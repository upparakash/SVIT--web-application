import { createSlice } from "@reduxjs/toolkit";

const CART_KEY = "cart";

/* =======================
   Helpers
======================= */
const loadCart = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data
      ? JSON.parse(data)
      : { items: [] };
  } catch {
    return { items: [] };
  }
};

const saveCart = (state) => {
  localStorage.setItem(CART_KEY, JSON.stringify(state));
};

const calculateTotals = (items) => {
  const totalQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  return { totalQuantity, totalPrice };
};

/* =======================
   Initial State
======================= */
const initialState = {
  items: loadCart().items,
  totalQuantity: 0,
  totalPrice: 0
};

const initialTotals = calculateTotals(initialState.items);
initialState.totalQuantity = initialTotals.totalQuantity;
initialState.totalPrice = initialTotals.totalPrice;

/* =======================
   Slice
======================= */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const item = state.items.find(
        (i) => i.id === product.id
      );

      if (item) {
        item.quantity += 1;
        item.totalPrice += product.price;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
          totalPrice: product.price
        });
      }

      Object.assign(state, calculateTotals(state.items));
      saveCart(state);
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (!item) return;

      item.quantity += 1;
      item.totalPrice += item.price;

      Object.assign(state, calculateTotals(state.items));
      saveCart(state);
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(
        (i) => i.id === action.payload
      );
      if (!item) return;

      item.quantity -= 1;
      item.totalPrice -= item.price;

      if (item.quantity === 0) {
        state.items = state.items.filter(
          (i) => i.id !== action.payload
        );
      }

      Object.assign(state, calculateTotals(state.items));
      saveCart(state);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (i) => i.id !== action.payload
      );

      Object.assign(state, calculateTotals(state.items));
      saveCart(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      localStorage.removeItem(CART_KEY);
    }
  }
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
