// const express = require("express");
// const router = express.Router();

// const {
//   getAllCategories,
//   getcategory,
//   addCategory,
//   updateCategory,
//   deleteCategory,
// } = require("../controllers/categoryController");

// const { uploadSingle } = require("../middleware/multerConfig");
// const { authAdmin } = require("../middleware/authAdmin"); // ✅ import auth middleware

// // 📍 Public routes (no auth needed)
// router.get("/allCategories", getAllCategories);
// router.get("/:id", getcategory);

// // 📍 Protected routes (admin only)
// router.post("/addCategory", authAdmin, uploadSingle("image"), addCategory);
// router.put("/:id", authAdmin, uploadSingle("image"), updateCategory);
// router.delete("/:id", authAdmin, deleteCategory);

// module.exports = router;








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
