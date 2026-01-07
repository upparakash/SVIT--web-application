import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "../styles/ProductsPage.css";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000";

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/categories/allcategories`);
      setCategories(res.data || []);
    } catch (error) {
      console.error("Category fetch error:", error);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/products/allproducts`);
      console.log("products: ",res.data.products)
      setProducts(res.data.products || res.data || []);
      setLoading(false);
    } catch (error) {
      console.error("Product fetch error:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Delete Product
  const deleteProduct = async (id) => {
    if (!window.confirm("Confirm delete?")) return;

    try {
      await axios.delete(`${baseUrl}/api/products/delete/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // Filter by category only
  const filteredProducts = products.filter((p) => {
    return selectedCategory
      ? p.category_id === parseInt(selectedCategory)
      : true;
  });

  return (
    <div className="products-wrapper">
      {/* Header */}
      <div className="header-section">
        <h2 className="header-title">Products</h2>

        <button
          onClick={() => navigate("/dashboard/products/add-product")}
          className="btn-add"
        >
          <Plus size={18} /> Add Product
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-section">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">All Categories</option>

          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.categoryname}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="table-container">
            <table className="product-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>SKU</th>
                  <th>Warranty</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>

                    <td>
                      <img
                        src={product.image1}
                        alt={product.name}
                        className="product-img"
                      />
                    </td>

                    <td>{product.product_name}</td>
                    <td>{product.brand}</td>
                    <td>{product.category_name}</td>

                    <td className="price-green">₹{product.price}</td>
                    <td>{product.sku}</td>
                    <td>{product.warranty}</td>

                    <td>
                      <button
                        onClick={() =>
                          navigate(`/dashboard/products/add-product/${product.id}`)
                        }
                        className="action-btn"
                      >
                        <Pencil size={20} color="#2563eb" />
                      </button>

                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="action-btn"
                      >
                        <Trash2 size={20} color="#dc2626" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile List */}
          <div className="mobile-list">
            {filteredProducts.map((p) => (
              <div key={p.id} className="mobile-card">
                <div className="mobile-info">
                  <img src={p.image1} alt={p.name} />

                  <div>
                    <h3 className="mobile-title">{p.name}</h3>
                    <p className="mobile-category">{p.category_name}</p>
                    <p className="mobile-price">₹{p.price}</p>
                  </div>
                </div>

                <div className="mobile-actions">
                  <button
                    onClick={() =>
                      navigate(`/dashboard/add-product/${p.id}`)
                    }
                    className="mobile-edit"
                  >
                    <Pencil size={18} /> Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="mobile-delete"
                  >
                    <Trash2 size={18} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
