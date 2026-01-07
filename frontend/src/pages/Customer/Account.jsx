import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, logout, clearStatus } from "../../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getUserOrders } from "../../features/order/orderSlice";


const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, success, error } = useSelector((state) => state.auth);


  const location = useLocation();

const [activeTab, setActiveTab] = useState(
  location.state?.tab || "profile"
);




  const [formData, setFormData] = useState({
    fullname: "",
    mobile: "",
    profile: null,
  });

  const [preview, setPreview] = useState(null);

  /* ================= Populate form ================= */
  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || "",
        mobile: user.mobile || "",
        profile: null,
      });
      setPreview(null);
    }
  }, [user]);

  /* ================= Clear alerts ================= */
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearStatus()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, profile: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("fullname", formData.fullname);
    data.append("mobile", formData.mobile);
    if (formData.profile) data.append("profile", formData.profile);

    dispatch(updateProfile(data));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


 




const { orders } = useSelector((state) => state.orders);


useEffect(() => {
  if (activeTab === "orders" && user?.id) {
    dispatch(getUserOrders(user.id));
  }
}, [activeTab, dispatch, user?.id]);


useEffect(() => {
  console.log("ORDERS DATA:", orders);
}, [orders]);



  return (
    <div className="max-w-7xl mx-auto px-5 md:px-12 py-12">
      <h1 className="text-3xl font-bold mb-10">My Account</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ================= SIDEBAR ================= */}
        <aside className="w-full lg:w-1/4 bg-white shadow-md border border-gray-200 rounded-xl p-6 h-fit">
          <h2 className="text-xl font-semibold mb-5">Account Menu</h2>
          <ul className="space-y-3 text-gray-700">
            {["profile", "orders", "wishlist", "addresses"].map((tab) => (
              <li key={tab}>
                <button
                  className={`block w-full text-left px-3 py-2 rounded-md transition ${
                    activeTab === tab
                      ? "bg-[#21808D] text-white"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}

            <li>
              <button
                className="block w-full text-left px-3 py-2 rounded-md hover:bg-red-500 hover:text-white transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </aside>

        {/* ================= MAIN CONTENT ================= */}
        <div className="w-full lg:w-3/4 bg-white shadow-md border border-gray-200 rounded-xl p-8">
          {activeTab === "profile" && (
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Profile Information
              </h3>

              {/* Alerts */}
              {success && (
                <p className="mb-4 text-green-600 font-medium">{success}</p>
              )}
              {error && (
                <p className="mb-4 text-red-600 font-medium">{error}</p>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Profile Image */}
                <div className="flex items-center gap-4">
                  <img
                    src={
                      preview ||
                      user?.profile ||
                      "https://ui-avatars.com/api/?name=User&background=21808D&color=fff"
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border"
                  />

                  <label className="cursor-pointer text-sm text-[#21808D] font-medium">
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-[#21808D]"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Email</label>
                  <input
                    type="email"
                    value={user?.email}
                    disabled
                    className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-1 focus:ring-[#21808D]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#21808D] text-white px-6 py-3 rounded-md hover:bg-[#1a676f] transition disabled:opacity-60"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "orders" && (
  <div>
    <h3 className="text-2xl font-semibold mb-6">My Orders</h3>

    {Array.isArray(orders) && orders.length > 0 ? (
      <ul className="space-y-4">
        {orders.map((order) => (
          <li
            key={order.order_id}
            className="border rounded-lg p-4 shadow-sm"
          >
            <p className="font-medium">
              Order ID: <span className="text-gray-700">{order.order_id}</span>
            </p>

            <p className="text-sm text-gray-600">
              Payment Status:{" "}
              <span className="font-medium">{order.payment_status}</span>
            </p>

            <p className="text-sm text-gray-600">
              Total Amount: ₹{order.total_amount}
            </p>

            <p className="text-xs text-gray-400 mt-1">
              Ordered on: {new Date(order.created_at).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-600">No orders found.</p>
    )}
  </div>
)}





          {activeTab === "wishlist" && (
            <p className="text-gray-600">Your wishlist is empty.</p>
          )}

          {activeTab === "addresses" && (
            <p className="text-gray-600">No saved addresses.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
