const db = require('../config/db.js');

exports.addProductInfo = async (req, res) => {
  try {
    const {
      product_id,
      product_name,
      category_id,
      category_name,
      power,
      users,
      resolution,
      connectivity,
      storage,
      view_angle,
      records,
      display,
      communication,
      cards,
      installation,
      material,
      key_feature_1,
      key_feature_2,
      key_feature_3,
      key_feature_4
    } = req.body;

    if (!product_id || !product_name  || !category_id || !category_name) {
      return res.status(400).json({
        success: false,
        message: "product_id, product_name, category_id, category_name are required"
      });
    }

    // Prevent duplicate entry
    const [exists] = await db.execute(
      "SELECT id FROM svit_product_info WHERE product_id = ?",
      [product_id]
    );

    if (exists.length) {
      return res.status(409).json({
        success: false,
        message: "Product info already exists"
      });
    }

    const [result] = await db.execute(
      `INSERT INTO svit_product_info (
        product_id, product_name, category_id, category_name,
        power, users, resolution, connectivity, storage,
        view_angle, records, display, communication,
        cards, installation, material,
        key_feature_1, key_feature_2, key_feature_3, key_feature_4
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        product_id,
         product_name,
        category_id,
        category_name,
        power,
        users,
        resolution,
        connectivity,
        storage,
        view_angle,
        records,
        display,
        communication,
        cards,
        installation,
        material,
        key_feature_1,
        key_feature_2,
        key_feature_3,
        key_feature_4
      ]
    );

    res.status(201).json({
      success: true,
      message: "Product info added successfully",
      id: result.insertId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};






exports.getAllProductInfo = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT pi.*, pd.product_name
       FROM svit_product_info pi
       JOIN svit_product_details pd ON pd.id = pi.product_id
       ORDER BY pi.created_at DESC`
    );

    res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




exports.getSingleProductInfo = async (req, res) => {
  try {
    const { product_id } = req.params;

    const [rows] = await db.execute(
      `SELECT pi.*, pd.product_name
       FROM svit_product_info pi
       JOIN svit_product_details pd ON pd.id = pi.product_id
       WHERE pi.product_id = ?`,
      [product_id]
    );

    if (!rows.length) {
      return res.status(404).json({
        success: false,
        message: "Product info not found"
      });
    }

    res.json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};





exports.updateProductInfo = async (req, res) => {
  try {
    const { product_id } = req.params;

    const {
      category_id,
      category_name,
      power,
      users,
      resolution,
      connectivity,
      storage,
      view_angle,
      records,
      display,
      communication,
      cards,
      installation,
      material,
      key_feature_1,
      key_feature_2,
      key_feature_3,
      key_feature_4
    } = req.body;

    const [result] = await db.execute(
      `UPDATE svit_product_info SET
        category_id = ?,
        category_name = ?,
        power = ?,
        users = ?,
        resolution = ?,
        connectivity = ?,
        storage = ?,
        view_angle = ?,
        records = ?,
        display = ?,
        communication = ?,
        cards = ?,
        installation = ?,
        material = ?,
        key_feature_1 = ?,
        key_feature_2 = ?,
        key_feature_3 = ?,
        key_feature_4 = ?
       WHERE product_id = ?`,
      [
        category_id,
        category_name,
        power,
        users,
        resolution,
        connectivity,
        storage,
        view_angle,
        records,
        display,
        communication,
        cards,
        installation,
        material,
        key_feature_1,
        key_feature_2,
        key_feature_3,
        key_feature_4,
        product_id
      ]
    );

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Product info not found"
      });
    }

    res.json({
      success: true,
      message: "Product info updated successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



exports.deleteProductInfo = async (req, res) => {
  try {
    const { product_id } = req.params;

    const [result] = await db.execute(
      "DELETE FROM svit_product_info WHERE product_id = ?",
      [product_id]
    );

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: "Product info not found"
      });
    }

    res.json({
      success: true,
      message: "Product info deleted successfully"
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

