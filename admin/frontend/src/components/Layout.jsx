import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../styles/layout.css";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="layout">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggle={() => setIsSidebarOpen(!isSidebarOpen)} />

      {/* Main section */}
      <div className={`main-section ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <Header />
        <main className="content">
          <Outlet /> {/* 👈 Nested page content (Dashboard, etc.) */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
