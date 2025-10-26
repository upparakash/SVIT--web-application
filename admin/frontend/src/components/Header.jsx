import React from "react";
import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <h3>Hello Admin 👋</h3>
      <div className="user-info">
        <img src="/logo192.png" alt="Admin" className="user-avatar" />
        <div>
          <strong>Admin</strong>
          <p>admin@company.com</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
