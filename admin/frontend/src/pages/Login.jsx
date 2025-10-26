import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../styles/login.css';




function Login({ onLogin }) {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", data);
      alert(res.data.message);

      // Save token
      localStorage.setItem("adminToken", res.data.token);

      // Update app state + redirect
      onLogin();
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="loginform">
        <h3>Login</h3>
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
