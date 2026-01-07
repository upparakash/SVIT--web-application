import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, clearStatus } from "../../features/user/userSlice";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { loading, error, success } = useSelector((state) => state.auth);

  const token = searchParams.get("token");

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      resetPassword({
        token,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      })
    );
  };

  // Redirect to login after success
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }

    return () => {
      dispatch(clearStatus());
    };
  }, [success, navigate, dispatch]);

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Reset Password</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-xl space-y-5 border border-gray-200"
      >
        {/* New Password */}
        <div>
          <label className="text-sm text-gray-600">New Password</label>
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

        {/* Success */}
        {success && (
          <p className="text-sm text-green-600 text-center">{success}</p>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#21808D] text-white py-3 rounded-md hover:bg-[#1a676f] transition disabled:opacity-60"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
