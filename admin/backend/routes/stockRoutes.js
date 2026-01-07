const express = require("express");
const router = express.Router();
const {
  getAllStock,
  getStockByProductId,
  createStock,
  updateStock,
  addToPending,
  confirmStock,
  cancelPending
}  = require("../controllers/stockController");



router.get("/", getAllStock);
router.get("/:productId", getStockByProductId);

router.post("/", createStock);
router.put("/:productId", updateStock);

router.post("/:productId/pending", addToPending);
router.post("/:productId/confirm", confirmStock);
router.post("/:productId/cancel", cancelPending);

module.exports = router;
