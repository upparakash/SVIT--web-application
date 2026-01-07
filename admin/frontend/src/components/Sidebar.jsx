import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaBox, FaLayerGroup, FaClipboardList, FaUser, FaSignOutAlt } from "react-icons/fa";
import "../styles/sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: "Dashboard", icon: <FaHome />, path: "/dashboard" },
    { name: "Products", icon: <FaBox />, path: "/dashboard/products" },
    { name: "ProductInfo", icon: <FaBox />, path: "/dashboard/productinfo" },
    { name: "Categories", icon: <FaLayerGroup />, path: "/dashboard/categories" },
    { name: "Orders", icon: <FaClipboardList />, path: "/dashboard/orders" },
    { name: "Users", icon: <FaUser />, path: "/dashboard/users" },
    { name: "Stock", icon: <FaUser />, path: "/dashboard/stock" },
    { name: "Logout", icon: <FaSignOutAlt />, path: "/" },
  ];

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>

      <div className="sidebar-header">
        {isOpen && (
          <>
            <img src="/logo192.png" alt="logo" className="sidebar-logo" />
          </>
        )}
        <button className="toggle-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>





      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink to={item.path} className="sidebar-link" key={item.name}>
            <span className="icon">{item.icon}</span>
            {isOpen && <span className="link-text">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
