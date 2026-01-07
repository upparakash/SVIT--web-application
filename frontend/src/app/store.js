import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice"
import cartReducer from "../features/cart/cartSlice"
import orderReducer from "../features/order/orderSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    categories: categoryReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});
