import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/ViewOrder.css";

const ViewOrder = ({ orderId, onClose }) => {
  const [order, setOrder] = useState(null);
  const baseURL = "http://localhost:5000";
  const token = localStorage.getItem("adminToken");

  const fetchOrderDetails = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrder(res.data.order);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  if (!order) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Order Details</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="order-info">
          <p><strong>Order ID:</strong> {order.order_id}</p>
          <p><strong>Customer:</strong> {order.name}</p>
          <p><strong>Email:</strong> {order.email}</p>
          <p><strong>Phone:</strong> {order.phone}</p>
          <p><strong>Shipping:</strong> {order.shipping_address}</p>
          <p><strong>Total:</strong> ₹{order.total_amount}</p>
        </div>

        <h3>Order Items</h3>

        <table className="items-table">
  <thead>
    <tr>
      <th>Image</th>
      <th>Product</th>
      <th>Price</th>
      <th>Qty</th>
      <th>Total</th>
    </tr>
  </thead>

  <tbody>
    {order.items.map((item) => (
      <tr key={item.order_item_id}>
        <td>
          <img
            src={item.product_image}
            alt={item.product_name}
            className="product-img"
            onError={(e) => {
              e.target.src = "/placeholder.png";
            }}
          />
        </td>
        <td>{item.product_name}</td>
        <td>₹{item.product_price}</td>
        <td>{item.quantity}</td>
        <td>₹{item.total_price}</td>
      </tr>
    ))}
  </tbody>
</table>

      </div>
    </div>
  );
};

export default ViewOrder;
