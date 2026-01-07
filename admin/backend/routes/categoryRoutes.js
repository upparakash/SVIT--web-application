const express = require("express");
const router = express.Router();
const { uploadSingle } = require("../middleware/multerConfig");
const categoryController = require("../controllers/categoryController");

router.post("/addCategory", uploadSingle("image"), categoryController.addCategory);
router.get("/allcategories", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategory);
router.put("/update/:id", uploadSingle("image"), categoryController.updateCategory);
router.delete("/delete/:id", categoryController.deleteCategory);

module.exports = router;
