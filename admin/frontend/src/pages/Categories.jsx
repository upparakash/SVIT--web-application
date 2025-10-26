import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import '../styles/category.css'

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories/allcategories");
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle Delete Category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/categories/delete/${id}`);
      alert("Category deleted successfully");
      setCategories(categories.filter((cat) => cat.id !== id)); // update UI
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <h2>Categories</h2>
          <NavLink to='/dashboard/add-category'>
            Add Category
          </NavLink>
      </div>

      {categories.length > 0 ? (
        <table className="categories-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Logo</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category, id) => (
              <tr key={category.id}>
                <td>{id+1}</td>
                <td>{category.categoryname}</td>
                <td>
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.categoryname}
                      className="category-img"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{category.description}</td>
                <td className="actions">
                  <button
                    className="edit-btn"
                    onClick={() => navigate(`/dashboard/add-category/${category.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(category.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No categories found.</p>
      )}
    </div>
  );
};

export default Categories;
