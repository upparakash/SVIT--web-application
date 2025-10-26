import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/AddCategory.css";

const AddCategory = () => {
  const [categoryname, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState(null);
  const [message, setMessage] = useState("");

  const { id } = useParams(); // <-- edit mode if id exists
  const navigate = useNavigate();

  // Fetch existing category if editing
  useEffect(() => {
    if (id) {
      const fetchCategory = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/api/categories/${id}`
          );

          const category = res.data;
          setCategoryName(category.categoryname || "");
          setDescription(category.description || "");
          setExistingImage(category.image || "");
        } catch (error) {
          console.error("Error fetching category details:", error);
          setMessage("❌ Failed to load category details.");
        }
      };

      fetchCategory();
    }
  }, [id]);

  // Add or update category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryname) {
      setMessage("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("categoryname", categoryname);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const token = localStorage.getItem("adminToken");

      if (id) {
        // UPDATE existing category
        await axios.put(
          `http://localhost:5000/api/categories/update/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("✅ Category updated successfully!");
      } else {
        // ADD new category
        await axios.post(
          "http://localhost:5000/api/categories/addCategory",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("✅ Category added successfully!");
      }

      setTimeout(() => navigate("/dashboard/categories"), 1200);
    } catch (error) {
  console.error("Error saving category:", error);

  // Check if backend sent a response message
  if (error.response && error.response.data && error.response.data.message) {
    alert(error.response.data.message);
  } else {
    alert("Something went wrong while creating category!");
  }
}
  };

  return (
    <div className="add-category-container">
      <h2>{id ? "Edit Category" : "Add New Category"}</h2>

      <form onSubmit={handleSubmit} className="add-category-form">
        <label>Category Name*</label>
        <input
          type="text"
          placeholder="Enter category name"
          value={categoryname}
          onChange={(e) => setCategoryName(e.target.value)}
          required
        />

        <label>Description</label>
        <textarea
          placeholder="Enter category description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Category Image*</label>
        {existingImage && !image && (
          <div className="preview-container">
            <img
              src={existingImage}
              alt="Existing"
              style={{ width: "80px", height: "80px", borderRadius: "8px" }}
            />
            <p>Current Image</p>
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required={!id}
        />

        <button type="submit">{id ? "Update Category" : "Add Category"}</button>
      </form>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
};

export default AddCategory;
