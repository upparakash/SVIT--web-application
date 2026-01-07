const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { baseUpload } = require("../middleware/multerConfig");

// Upload two images
const productImages = baseUpload.fields([
  { name: "image1", maxCount: 1 },
  { name: "image2", maxCount: 1 }
]);

// Routes
router.post("/addProduct", productImages, productController.addProduct);
router.get("/allProducts", productController.getAllProducts);
router.get("/:id", productController.getProductbyId);
router.put("/update/:id", productImages, productController.updateProduct);
router.delete("/delete/:id", productController.deleteProduct);

module.exports = router;
