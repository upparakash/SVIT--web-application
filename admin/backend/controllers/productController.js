const pool = require("../config/db.js");

// =========================
//   ADD PRODUCT
// =========================
exports.addProduct = async (req, res) => {
  try {
    const { brand, productName, price, category_id, product_information, warranty, sku } = req.body;
    const files = req.files || {};

    // Required fields
    if (!brand || !productName || !price || !category_id || !sku || !warranty) {
      return res.status(400).json({
        message: "brand, productName, price, category_id, sku, and warranty are required."
      });
    }

    // Warranty decimal validation (DECIMAL(3,1))
    if (isNaN(warranty) || Number(warranty) < 0) {
      return res.status(400).json({ message: "Warranty must be a positive number like 1.0, 2.5, etc." });
    }

    // Image1 required
    if (!files.image1 || !files.image1[0]) {
      return res.status(400).json({ message: "image1 is required!" });
    }


      const image1 = files.image1 ? `${req.protocol}://${req.get("host")}/uploads/${req.files.image1[0].filename}` : null;
      const image2 = files.image2 ? `${req.protocol}://${req.get("host")}/uploads/${req.files.image2[0].filename}`: null;

    // Avoid duplicate SKU
    const [existingSKU] = await pool.query(
      "SELECT id FROM product_details WHERE sku = ? LIMIT 1",
      [sku]
    );

    if (existingSKU.length > 0) {
      return res.status(400).json({ message: "SKU already exists!" });
    }

    // Insert Product
    const [result] = await pool.query(
      `INSERT INTO product_details 
      (brand, product_name, price, category_id, image1, image2, product_information, warranty, sku)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        brand,
        productName,
        price,
        category_id,
        image1,
        image2,
        product_information || "",
        warranty,
        sku
      ]
    );

    res.status(201).json({ message: "Product added successfully", id: result.insertId });

  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ error: error.message });
  }
};


// =========================
//   GET PRODUCT BY ID
// =========================
exports.getProductbyId = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT 
        p.id,
        p.brand,
        p.product_name,
        p.price,
        p.image1,
        p.image2,
        p.product_information,
        p.warranty,
        p.sku,
        p.created_at,
        p.updated_at,

        c.categoryname AS category_name,

        pi.id AS product_info_id,
        pi.power,
        pi.users,
        pi.resolution,
        pi.connectivity,
        pi.storage,
        pi.view_angle,
        pi.records,
        pi.display,
        pi.communication,
        pi.cards,
        pi.installation,
        pi.material,
        pi.key_feature_1,
        pi.key_feature_2,
        pi.key_feature_3,
        pi.key_feature_4

      FROM product_details p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_info pi ON pi.product_id = p.id
      WHERE p.id = ?
      `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Shape response
    const row = rows[0];

    const response = {
      id: row.id,
      brand: row.brand,
      product_name: row.product_name,
      price: row.price,
      image1: row.image1,
      image2: row.image2,
      product_information: row.product_information,
      warranty: row.warranty,
      sku: row.sku,
      category_name: row.category_name,
      created_at: row.created_at,
      updated_at: row.updated_at,

      productInfo: row.product_info_id
        ? {
            power: row.power,
            users: row.users,
            resolution: row.resolution,
            connectivity: row.connectivity,
            storage: row.storage,
            view_angle: row.view_angle,
            records: row.records,
            display: row.display,
            communication: row.communication,
            cards: row.cards,
            installation: row.installation,
            material: row.material,
            key_features: [
              row.key_feature_1,
              row.key_feature_2,
              row.key_feature_3,
              row.key_feature_4
            ].filter(Boolean)
          }
        : null
    };

    res.json(response);

  } catch (error) {
    console.error("Error in getProductbyId:", error);
    res.status(500).json({ error: error.message });
  }
};


// =========================
//   GET ALL PRODUCTS
// =========================
exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `
      SELECT 
        p.id,
        p.brand,
        p.product_name,
        p.price,
        p.image1,
        p.image2,
        p.warranty,
        p.sku,

        c.categoryname AS category_name,

        pi.id AS product_info_id,
        pi.power,
        pi.users,
        pi.resolution,
        pi.connectivity,
        pi.storage,
        pi.view_angle,
        pi.records,
        pi.display,
        pi.communication,
        pi.cards,
        pi.installation,
        pi.material,
        pi.key_feature_1,
        pi.key_feature_2,
        pi.key_feature_3,
        pi.key_feature_4

      FROM product_details p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN product_info pi ON pi.product_id = p.id
      ORDER BY p.id DESC
      `
    );

    const products = rows.map(row => ({
      id: row.id,
      brand: row.brand,
      product_name: row.product_name,
      price: row.price,
      image1: row.image1,
      image2: row.image2,
      warranty: row.warranty,
      sku: row.sku,
      category_name: row.category_name,

      productInfo: row.product_info_id
        ? {
            power: row.power,
            users: row.users,
            resolution: row.resolution,
            connectivity: row.connectivity,
            storage: row.storage,
            view_angle: row.view_angle,
            records: row.records,
            display: row.display,
            communication: row.communication,
            cards: row.cards,
            installation: row.installation,
            material: row.material,
            key_features: [
              row.key_feature_1,
              row.key_feature_2,
              row.key_feature_3,
              row.key_feature_4
            ].filter(Boolean)
          }
        : null
    }));

    res.json({ products });

  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(500).json({ error: error.message });
  }
};



// =========================
//   UPDATE PRODUCT
// =========================
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query("SELECT * FROM product_details WHERE id = ?", [id]);
    if (existing.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const old = existing[0];
    const { brand, productName, price, category_id, product_information, warranty, sku } = req.body;

    // Warranty validation
    if (warranty && (isNaN(warranty) || Number(warranty) < 0)) {
      return res.status(400).json({ message: "Invalid warranty value" });
    }

    // Duplicate SKU check (if SKU is changed)
    if (sku && sku !== old.sku) {
      const [existingSKU] = await pool.query(
        "SELECT id FROM product_details WHERE sku = ? LIMIT 1",
        [sku]
      );

      if (existingSKU.length > 0) {
        return res.status(400).json({ message: "SKU already exists!" });
      }
    }

    // Handle images
    const files = req.files || {};
    const image1 = files.image1 ? `${req.protocol}://${req.get("host")}/uploads/${req.files.image1[0].filename}` : old.image1;
    const image2 = files.image2 ? `${req.protocol}://${req.get("host")}/uploads/${req.files.image1[2].filename}` : old.image2;

    await pool.query(
      `UPDATE product_details SET
        brand = ?,
        product_name = ?,
        price = ?,
        category_id = ?,
        image1 = ?,
        image2 = ?,
        product_information = ?,
        warranty = ?,
        sku = ?
      WHERE id = ?`,
      [
        brand || old.brand,
        productName || old.product_name,
        price || old.price,
        category_id || old.category_id,
        image1,
        image2,
        product_information || old.product_information,
        warranty || old.warranty,
        sku || old.sku,
        id
      ]
    );

    res.json({ message: "Product updated successfully" });

  } catch (error) {
    console.error("Error in updateProduct:", error);
    res.status(500).json({ error: error.message });
  }
};


// =========================
//   DELETE PRODUCT
// =========================
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query("DELETE FROM product_details WHERE id = ?", [id]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Product not found" });

    res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.error("Error in deleteProduct:", error);
    res.status(500).json({ error: error.message });
  }
};
