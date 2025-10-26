const jwt = require("jsonwebtoken");
const  pool  = require("../config/db"); // ✅ import your MySQL pool connection

exports.authAdmin = async (req, res, next) => {
  try {
    // 1️⃣ Check for the token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = authHeader.split(" ")[1];

    // 2️⃣ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    // 3️⃣ Fetch admin from MySQL
    const [rows] = await pool.query(
      "SELECT id, email FROM admins WHERE id = ?",
      [decoded.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const admin = rows[0];
    console.log("Fetched admin:", admin);

    // 4️⃣ Attach admin to request
    req.admin = admin;
    next();

  } catch (error) {
    console.error("Auth error:", error.message);
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};
