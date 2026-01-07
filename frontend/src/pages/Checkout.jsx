import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeOrder, resetOrder } from "../features/order/orderSlice";
import { clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const { order, loading, error } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    billingAddress: "",
    shippingAddress: "",
    shippingMethod: "standard",
    paymentMethod: "razorpay",
  });

  // Prefill user info
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  // Validation
  const isCustomerValid =
    formData.name && formData.email && formData.phone && formData.billingAddress;
  const isShippingValid = formData.shippingAddress && formData.shippingMethod;

  // Handle Place Order
  const handlePlaceOrder = () => {
    const orderPayload = {
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      },
      addresses: {
        billingAddress: formData.billingAddress,
        shippingAddress: formData.shippingAddress,
        pincode: "000000",
      },
      shipping: {
        method: formData.shippingMethod,
        charge: formData.shippingMethod === "express" ? 300 : 150,
      },
      payment: {
        method: formData.paymentMethod,
        status: formData.paymentMethod === "cod" ? "pending" : "paid",
      },
      cart: {
        items,
        totalQuantity: items.reduce((sum, item) => sum + item.quantity, 0),
        totalPrice,
      },
    };

    dispatch(placeOrder(orderPayload));
  };

  // Handle success
  useEffect(() => {
    if (order?.orderId) {
      dispatch(clearCart());
      navigate("/profile", { replace: true, state: { tab: "orders" } });

      setTimeout(() => dispatch(resetOrder()), 0);
    }
  }, [order, dispatch, navigate]);

  // Step components
  const Step1 = (
    <>
      <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
      {["name", "email", "phone"].map((field) => (
        <input
          key={field}
          placeholder={field.toUpperCase()}
          className="border p-2 rounded w-full mb-3"
          value={formData[field]}
          onChange={(e) =>
            setFormData({ ...formData, [field]: e.target.value })
          }
        />
      ))}
      <textarea
        placeholder="Billing Address"
        className="border p-2 rounded w-full"
        value={formData.billingAddress}
        onChange={(e) =>
          setFormData({ ...formData, billingAddress: e.target.value })
        }
      />
      <button
        disabled={!isCustomerValid}
        onClick={() => setStep(2)}
        className="mt-4 bg-[#21808D] text-white px-4 py-2 rounded disabled:opacity-50"
      >
        Continue to Shipping
      </button>
    </>
  );

  const Step2 = (
    <>
      <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
      <textarea
        placeholder="Shipping Address"
        className="border p-2 rounded w-full mb-3"
        value={formData.shippingAddress}
        onChange={(e) =>
          setFormData({ ...formData, shippingAddress: e.target.value })
        }
      />
      <select
        className="border p-2 rounded w-full"
        value={formData.shippingMethod}
        onChange={(e) =>
          setFormData({ ...formData, shippingMethod: e.target.value })
        }
      >
        <option value="standard">Standard - ₹150</option>
        <option value="express">Express - ₹300</option>
      </select>
      <div className="flex gap-3 mt-4">
        <button onClick={() => setStep(1)}>Back</button>
        <button
          disabled={!isShippingValid}
          onClick={() => setStep(3)}
          className="bg-[#21808D] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Continue to Payment
        </button>
      </div>
    </>
  );

  const Step3 = (
    <>
      <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
      {error && (
        <div className="bg-red-100 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      <select
        className="border p-2 rounded w-full"
        value={formData.paymentMethod}
        onChange={(e) =>
          setFormData({ ...formData, paymentMethod: e.target.value })
        }
      >
        <option value="razorpay">Razorpay</option>
        <option value="cod">Cash on Delivery</option>
      </select>
      <div className="flex gap-3 mt-4">
        <button onClick={() => setStep(2)}>Back</button>
        <button
          onClick={handlePlaceOrder}
          disabled={loading || !items.length}
          className="bg-[#21808D] text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </>
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Steps Indicator */}
      <div className="flex items-center justify-between mb-10">
        {[
          { step: 1, label: "Customer Information" },
          { step: 2, label: "Shipping" },
          { step: 3, label: "Payment" },
        ].map((item, index) => (
          <div key={item.step} className="flex items-center w-full">
            <div className="flex justify-even gap-2 items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-semibold
                ${step >= item.step ? "bg-[#21808D] text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {item.step}
              </div>
              <span className="mt-2 h-8 text-sm text-gray-700 whitespace-nowrap">
                {item.label}
              </span>
            </div>
            {index !== 2 && (
              <div
                className={`flex-1 h-[2px] mx-3 ${
                  step > item.step ? "bg-[#21808D]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {step === 1 && Step1}
      {step === 2 && Step2}
      {step === 3 && Step3}
    </div>
  );
};

export default Checkout;
