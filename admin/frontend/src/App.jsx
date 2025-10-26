import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Pages & Components
import Login from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import AddCategory from "./components/AddCategory";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* LOGIN PAGE */}
        <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

        {/* PROTECTED ROUTES (Only visible after login) */}
        <Route
          path="/dashboard/*"
          element={
            isLoggedIn ? (
              <Layout />
            ) : (
              <Navigate to="/" replace />
            )
          }
        >
          {/* Nested Routes inside Layout */}
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="categories" element={<Categories />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="add-category" element={<AddCategory />} />
          <Route path="add-category/:id" element={<AddCategory />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
