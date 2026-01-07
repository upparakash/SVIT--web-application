import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddProduct.css";

export default function AddProduct() {
  const { id } = useParams(); // If ID exists → Edit mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  // Form State
  const [form, setForm] = useState({
    brand: "",
    productName: "",
    price: "",
    category_id: "",
    product_information: "",
    warranty: "",
    sku: "",
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [categories, setCategories] = useState([]);

  const baseUrl = "http://localhost:5000";

  // Fetch categories for dropdown
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/categories/allcategories`);
      setCategories(res.data || []);
    } catch (error) {
      console.error("Category fetch error:", error);
    }
  };

  // Fetch existing product in edit mode
  const fetchProduct = async () => {
    if (!isEdit) return;

    try {
      const res = await axios.get(`${baseUrl}/api/products/${id}`);

      
      const p = res.data;
      console.log(p);
      setForm({
        brand: p.brand,
        productName: p.product_name,
        price: p.price,
        category_id: p.category_id,
        product_information: p.product_information,
        warranty: p.warranty,
        sku: p.sku,
      });
    } catch (error) {
      console.log("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    if (image1) fd.append("image1", image1);
    if (image2) fd.append("image2", image2);

    try {
      if (isEdit) {
        await axios.put(`${baseUrl}/api/products/update/${id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Product updated successfully!");
      } else {
        await axios.post(`${baseUrl}/api/products/addProduct`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("Product added successfully!");
      }

      navigate("/dashboard/products");
    } catch (error) {
      console.error(error);
      alert("Error saving product!");
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">
        {isEdit ? "Edit Product" : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit} className="add-product-form">

        {/* Brand */}
        <div>
          <label className="add-product-label">Brand *</label>
          <input
            type="text"
            name="brand"
            className="add-product-input"
            value={form.brand}
            onChange={handleChange}
          />
        </div>

        {/* Product Name */}
        <div>
          <label className="add-product-label">Product Name *</label>
          <input
            type="text"
            name="productName"
            className="add-product-input"
            value={form.productName}
            onChange={handleChange}
          />
        </div>

        {/* Price */}
        <div>
          <label className="add-product-label">Price *</label>
          <input
            type="number"
            name="price"
            className="add-product-input"
            value={form.price}
            onChange={handleChange}
          />
        </div>

        {/* SKU */}
        <div>
          <label className="add-product-label">SKU *</label>
          <input
            type="text"
            name="sku"
            className="add-product-input"
            value={form.sku}
            onChange={handleChange}
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="add-product-label">Category *</label>
          <select
            name="category_id"
            className="add-product-input"
            value={form.category_id}
            onChange={handleChange}
          >
            <option value="">Select Category</option>

            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.categoryname}
              </option>
            ))}
          </select>
        </div>

        {/* Warranty */}
        <div>
          <label className="add-product-label">Warranty *</label>
          <input
            type="text"
            name="warranty"
            className="add-product-input"
            value={form.warranty}
            onChange={handleChange}
          />
        </div>

        {/* Product Info */}
        <div>
          <label className="add-product-label">Product Information</label>
          <textarea
            rows="4"
            name="product_information"
            className="add-product-textarea"
            value={form.product_information}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Image 1 */}
        <div>
          <label className="add-product-label">Image 1 *</label>
          <input
            type="file"
            accept="image/*"
            className="add-product-file"
            onChange={(e) => setImage1(e.target.files[0])}
          />

          {isEdit && !image1 && (
            <img
              src={form.image1}
              alt="Old"
              className="preview-image"
            />
          )}

          {image1 && (
            <img
              src={URL.createObjectURL(image1)}
              alt="Preview"
              className="preview-image"
            />
          )}
        </div>

        {/* Image 2 */}
        <div>
          <label className="add-product-label">Image 2</label>
          <input
            type="file"
            accept="image/*"
            className="add-product-file"
            onChange={(e) => setImage2(e.target.files[0])}
          />

          {image2 && (
            <img
              src={URL.createObjectURL(image2)}
              alt="Preview"
              className="preview-image"
            />
          )}
        </div>

        <button type="submit" className="add-product-btn">
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
