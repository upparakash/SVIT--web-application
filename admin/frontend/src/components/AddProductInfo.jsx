import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/AddProductInfo.css";

/* CATEGORY → DB FIELD MAP (5 technical fields only) */
const categoryFieldsMap = {
  camera: ["resolution", "connectivity", "storage", "view_angle", "power"],
  access: ["power", "users", "cards", "installation", "material"],
  attendance: ["display", "communication", "cards", "power", "users"],
  biometric: ["users", "records", "display", "communication", "power"],
  default: ["power", "users", "cards"]
};

const AddProductInfo = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(product_id);

  const [products, setProducts] = useState([]);
  const [visibleFields, setVisibleFields] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    product_id: "",
    product_name: "",
    category_id: "",
    category_name: "",
    power: "",
    users: "",
    resolution: "",
    connectivity: "",
    storage: "",
    view_angle: "",
    records: "",
    display: "",
    communication: "",
    cards: "",
    installation: "",
    material: "",
    key_feature_1: "",
    key_feature_2: "",
    key_feature_3: "",
    key_feature_4: ""
  });

  /* FETCH PRODUCTS */
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/allproducts")
      .then(res => setProducts(res.data.products || []))
      .catch(console.error);
  }, []);

  /* FETCH PRODUCT INFO (EDIT MODE) */
  useEffect(() => {
    if (!isEdit) {
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/product-info/${product_id}`)
      .then(res => {
        const data = res.data.data;
        setForm(data);
        updateVisibleFields(data.category_name);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [product_id, isEdit]);

  /* CATEGORY → FIELDS */
  const updateVisibleFields = (categoryName) => {
    const cat = categoryName?.toLowerCase() || "";
    if (cat.includes("camera")) setVisibleFields(categoryFieldsMap.camera);
    else if (cat.includes("access")) setVisibleFields(categoryFieldsMap.access);
    else if (cat.includes("attendance")) setVisibleFields(categoryFieldsMap.attendance);
    else if (cat.includes("biometric")) setVisibleFields(categoryFieldsMap.biometric);
    else setVisibleFields(categoryFieldsMap.default);
  };

  /* PRODUCT SELECT */
  const handleProductSelect = (e) => {
    const selectedId = e.target.value;
    const product = products.find(p => p.id.toString() === selectedId);
    if (!product) return;

    setForm(prev => ({
      ...prev,
      product_id: product.id,
       product_name: product.product_name, 
      category_id: product.category_id,
      category_name: product.category_name
    }));

    updateVisibleFields(product.category_name);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      product_id: form.product_id,
product_name: form.product_name, 
      category_id: form.category_id,
      category_name: form.category_name,

      power: null,
      users: null,
      resolution: null,
      connectivity: null,
      storage: null,
      view_angle: null,
      records: null,
      display: null,
      communication: null,
      cards: null,
      installation: null,
      material: null,

      key_feature_1: form.key_feature_1 || null,
      key_feature_2: form.key_feature_2 || null,
      key_feature_3: form.key_feature_3 || null,
      key_feature_4: form.key_feature_4 || null
    };

    visibleFields.forEach(field => {
      payload[field] = form[field] || null;
    });

    try {
      if (isEdit) {
        await axios.put(
          `http://localhost:5000/api/product-info/${product_id}`,
          payload
        );
      } else {
        await axios.post(
          "http://localhost:5000/api/product-info",
          payload
        );
      }

      navigate("/dashboard/productinfo");
    } catch (err) {
      console.error(err);
      alert("Failed to save product info");
    }
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="page">
      <div className="form-container">
        <h2 className="title">{isEdit ? "Edit Product Info" : "Add Product Info"}</h2>

        <form onSubmit={handleSubmit} className="form-grid">
          <select
            value={form.product_id}
            onChange={handleProductSelect}
            disabled={isEdit}
            required
            className="input full-width"
          >
            <option value="">Select Product</option>
            {products.map(p => (
              <option key={p.id} value={p.id}>
                {p.product_name}
              </option>
            ))}
          </select>

          <input
            value={form.category_name}
            disabled
            placeholder="Category"
            className="input disabled"
          />

          {visibleFields.map(field => (
            <input
              key={field}
              name={field}
              value={form[field] || ""}
              onChange={handleChange}
              placeholder={field.replace(/_/g, " ").toUpperCase()}
              className="input"
            />
          ))}

          {[1, 2, 3, 4].map(i => (
            <input
              key={i}
              name={`key_feature_${i}`}
              value={form[`key_feature_${i}`]}
              onChange={handleChange}
              placeholder={`Key Feature ${i}`}
              className="input full-width"
            />
          ))}

          <button className="submit-btn">Save Product Info</button>
        </form>
      </div>
    </div>
  );
};

export default AddProductInfo;
