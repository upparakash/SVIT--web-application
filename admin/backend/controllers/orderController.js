const db = require("../config/db"); 



//   PLACE ORDER
exports.placeOrder = async (req, res) => {
  try {
    const { customer, addresses, shipping, payment, cart } = req.body;

    console.log("REQ.USER:", req.user); // 👈 must exist now
    const userId = req.user.id;

    const orderId = `ORD-${Date.now()}`;

    const connection = await db.getConnection();
    await connection.beginTransaction();

    await connection.query(
      `
      INSERT INTO orders (
        order_id,
        user_id,
        name,
        email,
        phone,
        billing_address,
        shipping_address,
        pincode,
        shipping_method,
        shipping_charge,
        payment_method,
        payment_status,
        total_quantity,
        total_amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        orderId,
        userId,
        customer.name,
        customer.email,
        customer.phone,
        addresses.billingAddress,
        addresses.shippingAddress,
        addresses.pincode,
        shipping.method,
        shipping.charge,
        payment.method,
        payment.status,
        cart.totalQuantity,
        cart.totalPrice + shipping.charge
      ]
    );

    for (const item of cart.items) {
      await connection.query(
        `
        INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          product_image,
          product_price,
          quantity,
          total_price
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          orderId,
          item.id,
          item.name,
          item.image,
          item.price,
          item.quantity,
          item.totalPrice
        ]
      );
    }

    await connection.commit();
    connection.release();

    res.status(201).json({
      success: true,
      orderId
    });

  } catch (error) {
    console.error("PLACE ORDER ERROR:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};




//   GET ALL ORDERS (ADMIN)

exports.getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/* ==================================================
   GET ORDER BY ID
================================================== */
exports.getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    const [[order]] = await db.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [orderId]
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      });
    }

    const [items] = await db.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [orderId]
    );

    res.json({
      success: true,
      order,
      items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/* ==================================================
   GET ORDERS BY USER ID
================================================== */
exports.getOrdersByUserId = async (req, res) => {
  try {
    // user id comes from JWT via authUser middleware
    const userId = req.user.id;

    console.log("Authenticated user:", req.user);
    console.log("User ID:", userId);

    const [orders] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};


/* ==================================================
   UPDATE ORDER STATUS (ADMIN)
================================================== */
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  try {
    await db.query(
      "UPDATE orders SET order_status = ? WHERE order_id = ?",
      [status, orderId]
    );

    res.json({
      success: true,
      message: "Order status updated"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/* ==================================================
   UPDATE ORDER ITEM STATUS (ADMIN)
================================================== */
exports.updateOrderItemStatus = async (req, res) => {
  const { itemId } = req.params;
  const { status } = req.body;

  try {
    await db.query(
      "UPDATE order_items SET item_status = ? WHERE order_item_id = ?",
      [status, itemId]
    );

    res.json({
      success: true,
      message: "Item status updated"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
