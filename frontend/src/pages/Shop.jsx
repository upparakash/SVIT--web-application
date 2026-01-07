import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProducts,
  setFilteredProducts,
} from "../features/product/productSlice";
import { fetchAllCategories } from "../features/category/categorySlice";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();

  const { products, allProducts, loading } = useSelector(
    (state) => state.products
  );

  const { categories } = useSelector((state) => state.categories);

  // ================= FILTER STATES =================
  const [category, setCategory] = useState("All");
  const [brand, setBrand] = useState("All");
  const [sort, setSort] = useState("Name");
  const [priceRange, setPriceRange] = useState("All");

  // ================= FETCH DATA =================
  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // ================= APPLY FILTERS =================
  useEffect(() => {
    let filtered = [...allProducts];

    // CATEGORY FILTER
    if (category !== "All") {
      filtered = filtered.filter(
        (p) => p.category_name === category
      );
    }

    // BRAND FILTER
    if (brand !== "All") {
      filtered = filtered.filter((p) => p.brand === brand);
    }

    // PRICE FILTER
    if (priceRange !== "All") {
      const [min, max] = priceRange.split("-").map(Number);
      filtered = filtered.filter((p) => {
        const price = Number(p.price);
        return price >= min && price <= max;
      });
    }

    // SORTING
    if (sort === "Name") {
      filtered.sort((a, b) =>
        a.product_name.localeCompare(b.product_name)
      );
    }

    if (sort === "LowToHigh") {
      filtered.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sort === "HighToLow") {
      filtered.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    dispatch(setFilteredProducts(filtered));
  }, [category, brand, priceRange, sort, allProducts, dispatch]);

  // ================= BRAND LIST =================
  const brands = ["All", ...new Set(allProducts.map((p) => p.brand))];

  return (
    <div className="px-4 md:px-10 py-6">
      <h3 className="text-3xl font-semibold mb-2">Our Products</h3>
      <p className="text-sm text-gray-500 mb-6">Home / Shop</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* ================= FILTER PANEL ================= */}
        <div className="md:w-64 w-full bg-white border border-gray-200 rounded-xl p-4 h-fit md:sticky md:top-5">
          <h4 className="font-semibold mb-4">Filters</h4>

          {/* CATEGORY */}
          <div className="mb-4">
            <label className="text-sm font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm"
            >
              <option value="All">All</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.categoryname}>
                  {cat.categoryname}
                </option>
              ))}
            </select>
          </div>

          {/* PRICE RANGE */}
          <div className="mb-4">
            <label className="text-sm font-medium">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm"
            >
              <option value="All">All Prices</option>
              <option value="0-5000">₹0 - ₹5,000</option>
              <option value="5000-10000">₹5,000 - ₹10,000</option>
              <option value="10000-50000">₹10,000 - ₹50,000</option>
            </select>
          </div>

          {/* BRAND */}
          <div className="mb-4">
            <label className="text-sm font-medium">Brand</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm"
            >
              {brands.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>

          {/* SORT */}
          <div>
            <label className="text-sm font-medium">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 text-sm"
            >
              <option value="Name">Name</option>
              <option value="LowToHigh">Price: Low to High</option>
              <option value="HighToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* ================= PRODUCTS ================= */}
        <div className="flex-1">
          <p className="text-gray-700 text-sm mb-4">
            {products.length} products found
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {loading ? (
              <p>Loading products...</p>
            ) : products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
