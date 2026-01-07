const db = require('../config/db');

/**
 * GET all stock records
 */
exports.getAllStock = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        ps.id,
        ps.product_id,
        ps.product_image,
        ps.product_name,
        ps.stock,
        ps.pending,
        ps.confirmed,
        (ps.stock - (ps.pending + ps.confirmed)) AS available_stock
      FROM product_stock ps
      ORDER BY ps.created_at DESC
    `);

    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stock", error });
  }
};

/**
 * GET stock by product ID
 */
exports.getStockByProductId = async (req, res) => {
  const { productId } = req.params;

  try {
    const [rows] = await db.query(
      "SELECT * FROM product_stock WHERE product_id = ?",
      [productId]
    );

    if (!rows.length) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stock", error });
  }
};

/**
 * CREATE stock entry (one time per product)
 */
exports.createStock = async (req, res) => {
  const { product_id, product_image, product_name, stock } = req.body;

  try {
    const [existing] = await db.query(
      "SELECT id FROM product_stock WHERE product_id = ?",
      [product_id]
    );

    if (existing.length) {
      return res.status(400).json({ message: "Stock already exists for product" });
    }

    await db.query(
      `INSERT INTO product_stock 
       (product_id, product_image, product_name, stock)
       VALUES (?, ?, ?, ?)`,
      [product_id, product_image, product_name, stock]
    );

    res.status(201).json({ message: "Stock created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to create stock", error });
  }
};

/**
 * UPDATE total stock (admin action)
 */
exports.updateStock = async (req, res) => {
  const { productId } = req.params;
  const { stock } = req.body;

  try {
    await db.query(
      "UPDATE product_stock SET stock = ? WHERE product_id = ?",
      [stock, productId]
    );

    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update stock", error });
  }
};

/**
 * MOVE stock → pending (order placed)
 */
exports.addToPending = async (req, res) => {
  const { productId } = req.params;

  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const [[stock]] = await connection.query(
      "SELECT stock, pending, confirmed FROM product_stock WHERE product_id = ? FOR UPDATE",
      [productId]
    );

    if (!stock || stock.stock <= stock.pending + stock.confirmed) {
      throw new Error("Insufficient stock");
    }

    await connection.query(
      "UPDATE product_stock SET pending = pending + 1 WHERE product_id = ?",
      [productId]
    );

    await connection.commit();
    res.status(200).json({ message: "Added to pending" });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ message: error.message });
  } finally {
    connection.release();
  }
};

/**
 * PENDING → CONFIRMED (order confirmed)
 */
exports.confirmStock = async (req, res) => {
  const { productId } = req.params;

  try {
    await db.query(
      `UPDATE product_stock
       SET pending = pending - 1,
           confirmed = confirmed + 1
       WHERE product_id = ? AND pending > 0`,
      [productId]
    );

    res.status(200).json({ message: "Stock confirmed" });
  } catch (error) {
    res.status(500).json({ message: "Failed to confirm stock", error });
  }
};

/**
 * PENDING → STOCK (order cancelled)
 */
exports.cancelPending = async (req, res) => {
  const { productId } = req.params;

  try {
    await db.query(
      `UPDATE product_stock
       SET pending = pending - 1
       WHERE product_id = ? AND pending > 0`,
      [productId]
    );

    res.status(200).json({ message: "Pending stock cancelled" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel pending", error });
  }
};
