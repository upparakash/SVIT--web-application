import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearStatus } from "../../features/user/userSlice";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  // Clear messages on unmount
  useEffect(() => {
    return () => {
      dispatch(clearStatus());
    };
  }, [dispatch]);

  return (
    <div className="max-w-md mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Forgot Password</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md p-8 rounded-xl space-y-5 border border-gray-200"
      >
        {/* Email */}
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-sm text-gray-600 text-center">
          Remembered your password?{" "}
          <Link to="/login" className="text-[#21808D] font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
