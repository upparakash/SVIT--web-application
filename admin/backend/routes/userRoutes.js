const express = require("express");
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  resetPassword,
  updateProfile,
  getAllUsers
} = require("../controllers/userController");

const { uploadSingle } = require("../middleware/multerConfig");
const { authUser } = require("../middleware/authUser");
const { authAdmin } = require("../middleware/authAdmin");

// ADMIN - GET ALL USERS
router.get("/all", authAdmin, getAllUsers);

// USER ROUTES
router.post("/register", uploadSingle("profile"), register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.put("/update-profile", authUser, uploadSingle("profile"), updateProfile);

module.exports = router;
