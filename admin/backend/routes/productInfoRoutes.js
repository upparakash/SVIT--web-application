const express = require("express");
const {
  addProductInfo,
  getAllProductInfo,
  getSingleProductInfo,
  updateProductInfo,
  deleteProductInfo
} = require("../controllers/productInfoController");

const router = express.Router();

router.post("/", addProductInfo);
router.get("/", getAllProductInfo);
router.get("/:product_id", getSingleProductInfo);
router.put("/:product_id", updateProductInfo);
router.delete("/:product_id", deleteProductInfo);

module.exports = router;


