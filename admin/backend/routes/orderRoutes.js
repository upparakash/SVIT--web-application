const express = require("express");

const {
  placeOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  updateOrderStatus,
  updateOrderItemStatus
} = require("../controllers/orderController");
const { authUser } = require("../middleware/authUser");



const router = express.Router();


router.post("/", authUser,  placeOrder);


router.get("/", authUser,  getAllOrders);


router.get("/user", authUser,  getOrdersByUserId);

router.get("/:orderId",  getOrderById);


router.put("/:orderId/status",  updateOrderStatus);


router.put("/item/:itemId/status",  updateOrderItemStatus);

module.exports = router;
