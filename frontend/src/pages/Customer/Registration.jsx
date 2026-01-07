import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearStatus } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  // Redirect after successful register
  useEffect(() => {
    if (user) {
      navigate("/");
    }

    return () => {
      dispatch(clearStatus());
    };
  }, [user, navigate, dispatch]);

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Create an Account</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-xl space-y-5 border border-gray-200"
      >
        {/* Full Name */}
        <div>
          <label className="text-sm text-gray-600">Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]"
          />
        </div>

        {/* Mobile */}
        <div>
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm text-gray-600">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm focus:ring-1 focus:ring-[#21808D]"
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#21808D] text-white py-3 rounded-md hover:bg-[#1a676f] transition disabled:opacity-60"
        >
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-[#21808D] font-medium">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
