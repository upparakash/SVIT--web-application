import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);


  const handleCheckout = () => {
    if (!user) {
      navigate("/login", {
        state: { from: "/checkout" }, // optional (for redirect after login)
      });
    } else {
      navigate("/checkout");
    }
  };



  // EMPTY CART STATE
  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

        <div className="bg-white border rounded-lg p-8 shadow-sm">
          <p className="text-gray-600 text-lg mb-6">Your cart is empty 🛒</p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#21808D] text-white px-6 py-3 rounded-lg w-full sm:w-auto"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // CALCULATE GST & TOTAL
  const gst = totalPrice * 0.18;
  const finalTotal = totalPrice + gst;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      {/* CART ITEMS */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between items-center border-gray-200 border-b py-4"
          >
            {/* Product Image & Info */}
            <div className="flex gap-4 w-full sm:w-2/3">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded object-cover"
              />
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">{item.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">{item.brand}</p>
                  <p className="text-gray-500 text-xs sm:text-sm">SKU: {item.sku}</p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="text-red-500 text-xs sm:text-sm mt-2 sm:mt-1 border rounded px-2 py-1 w-fit"
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Price & Quantity */}
            <div className="flex items-center gap-4 mt-4 sm:mt-0 w-full sm:w-1/3 justify-end">
              <span className="font-semibold text-sm sm:text-base">₹{item.price}</span>

              <div className="flex items-center border rounded px-2 py-1">
                <button
                  onClick={() => dispatch(decrementQuantity(item.id))}
                  className="px-2 text-lg"
                >
                  −
                </button>
                <span className="px-3 text-sm sm:text-base">{item.quantity}</span>
                <button
                  onClick={() => dispatch(incrementQuantity(item.id))}
                  className="px-2 text-lg"
                >
                  +
                </button>
              </div>

              <span className="font-semibold text-sm sm:text-base">₹{item.totalPrice}</span>
            </div>
          </div>
        ))}

      </div>

      {/* ORDER SUMMARY */}
      <div className="mt-6 border-gray-200 border rounded-lg p-4 sm:p-6 ">
        <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

        <div className="flex justify-between mb-1">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </div>

        <div className="flex justify-between mb-1">
          <span>GST (18%)</span>
          <span>₹{gst.toFixed(0)}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>Free</span>
        </div>

        <hr className="my-2 text-gray-200" />

        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>₹{finalTotal.toFixed(0)}</span>
        </div>

        <button
          onClick={handleCheckout}
          className="w-full bg-[#21808D] text-white py-3 rounded-lg mb-3"
        >
          Proceed to Checkout
        </button>

        <button
          onClick={() => navigate("/")}
          className="bg-gray-100  px-6 py-3 rounded-lg w-full sm:w-auto"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default CartPage;
