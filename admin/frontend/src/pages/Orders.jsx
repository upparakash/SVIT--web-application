import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/Orders.css';
import ViewOrder from '../components/ViewOrder.jsx';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const baseURL = 'http://localhost:5000';
  const token = localStorage.getItem("adminToken");

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data.orders);
      setOrders(res.data.orders);
    } catch (error) {
      console.error("Error fetching the Orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Orders</h1>

      <div className="table-wrapper">
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Total</th>
              <th>Order Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="no-orders">
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map((order, index) => (
                <tr key={order.id}>
                  <td>{index + 1}</td>
                  <td>{order.order_id}</td>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td>₹{order.total_amount}</td>
                  <td>
                    <span className={`status ${order.order_status.toLowerCase()}`}>
                      {order.order_status}
                    </span>
                  </td>
                  <td>{order.payment_status}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => setSelectedOrderId(order.order_id)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedOrderId && (
        <ViewOrder
          orderId={selectedOrderId}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
};

export default Orders;
