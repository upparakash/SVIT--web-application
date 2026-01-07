import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/* ================= FETCH ALL PRODUCTS ================= */
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/products/allproducts");
      return res.data.products;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products"
      );
    }
  }
);

/* ================= SLICE ================= */
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],       
    allProducts: [],    
    loading: false,
    error: null,
  },

  reducers: {
    setFilteredProducts: (state, action) => {
      state.products = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
      state.allProducts = [];
    },
  },

  extraReducers: (builder) => {
    builder
      /* FETCH ALL PRODUCTS */
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilteredProducts, clearProducts } = productSlice.actions;
export default productSlice.reducer;
