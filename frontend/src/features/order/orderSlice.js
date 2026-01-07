import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      // JWT is automatically sent via axios interceptor
      const { data } = await api.post("/orders", orderData);
      return data; // backend returns orderId or order object
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);



export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/orders/user");
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch orders"
      );
    }
  }
);


const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    success: false,
    order: null,
    orders: [],
    error: null,
  },
  reducers: {
    resetOrder(state) {
      state.loading = false;
      state.success = false;
      state.order = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => { state.loading = true; })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserOrders.pending, (state) => { state.loading = true; })
      .addCase(getUserOrders.fulfilled, (state, action) => {
  state.loading = false;
  state.orders = action.payload || [];
})

      .addCase(getUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetOrder } = orderSlice.actions;
export default orderSlice.reducer;
