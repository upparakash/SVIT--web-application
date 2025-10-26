



import React from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="cards">
        <div className="card total">
          <p>Total Products</p>
          <h3>24</h3>
        </div>
        <div className="card active">
          <p>Active Categories</p>
          <h3>8</h3>
        </div>
        <div className="card inactive">
          <p>Pending Orders</p>
          <h3>5</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
