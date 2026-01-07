import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/ProductInfo.css";

/* CATEGORY FIELD LABELS (MUST MATCH DB FIELDS) */
const categoryFieldLabels = {
  camera: [
    { key: "resolution", label: "Resolution" },
    { key: "connectivity", label: "Connectivity" },
    { key: "storage", label: "Storage" },
    { key: "view_angle", label: "View Angle" },
    { key: "power", label: "Power" }
  ],
  access: [
    { key: "power", label: "Power" },
    { key: "users", label: "Users" },
    { key: "cards", label: "Cards Supported" },
    { key: "installation", label: "Installation" },
    { key: "material", label: "Material" }
  ],
  attendance: [
    { key: "display", label: "Display" },
    { key: "communication", label: "Communication" },
    { key: "cards", label: "Cards Supported" },
    { key: "power", label: "Power" },
    { key: "users", label: "Users" }
  ],
  biometric: [
    { key: "users", label: "Users" },
    { key: "records", label: "Records" },
    { key: "display", label: "Display" },
    { key: "communication", label: "Communication" },
    { key: "power", label: "Power" }
  ],
  default: [
    { key: "power", label: "Power" },
    { key: "users", label: "Users" },
    { key: "cards", label: "Cards Supported" }
  ]
};

const ProductInfo = () => {
  const [data, setData] = useState([]);
  const [openRow, setOpenRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product-info")
      .then(res => setData(res.data.data || []))
      .catch(console.error);
  }, []);

  const toggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete product info?")) return;
    await axios.delete(`http://localhost:5000/api/product-info/${id}`);
    setData(prev => prev.filter(p => p.product_id !== id));
  };

  const getSpecs = (item) => {
    const cat = item.category_name?.toLowerCase() || "";
    if (cat.includes("camera")) return categoryFieldLabels.camera;
    if (cat.includes("access")) return categoryFieldLabels.access;
    if (cat.includes("attendance")) return categoryFieldLabels.attendance;
    if (cat.includes("biometric")) return categoryFieldLabels.biometric;
    return categoryFieldLabels.default;
  };

  return (
    <div className="page">
      <div className="header">
        <h2 className="title">Product Info</h2>
        <button
          className="add-btn"
          onClick={() => navigate("/dashboard/add-product-info")}
        >
          Add Product Info
        </button>
      </div>

      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Product</th>
              <th>Category</th>
              <th>Feature 1</th>
              <th>Feature 2</th>
              <th>Feature 3</th>
              <th>Feature 4</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map(item => (
              <React.Fragment key={item.product_id}>
                <tr>
                  <td>{item.product_id}</td>
                  <td>{item.product_name}</td>
                  <td>{item.category_name}</td>
                  <td>{item.key_feature_1 || "-"}</td>
                  <td>{item.key_feature_2 || "-"}</td>
                  <td>{item.key_feature_3 || "-"}</td>
                  <td>{item.key_feature_4 || "-"}</td>
                  <td>
                    <button onClick={() => toggleRow(item.product_id)}>
                      {openRow === item.product_id ? "Hide" : "View"}
                    </button>
                    <button onClick={() =>
                      navigate(`/dashboard/add-product-info/${item.product_id}`)
                    }>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(item.product_id)}>
                      Delete
                    </button>
                  </td>
                </tr>

                {openRow === item.product_id && (
                  <tr className="details-row">
                    <td colSpan="8">
                      <div className="details-box">
                        <h4>Technical Specifications</h4>
                        <div className="spec-grid">
                          {getSpecs(item).map(({ key, label }) => (
                            <div className="spec-row" key={key}>
                              <span>{label}</span>
                              <span>{item[key] || "-"}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductInfo;
