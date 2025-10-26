// const pool = require("../config/db");
// const bcrypt = require('bcrypt');


// exports.addCategory = async (req, res) => {
//   try {
//     console.log("Request body:", req.body);
//     console.log("Uploaded file:", req.file);

//     const { categoryname, description } = req.body;

//     const category_logo = req.file
//       ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
//       : null;

//     if (!categoryname || !category_logo) {
//       return res.status(400).json({ message: "Name and image are required" });
//     }



//     const [existing] = await pool.query(
//       "SELECT id FROM categories WHERE categoryname = ?",
//       [categoryname]
//     );

//     if (existing.length > 0) {
//       return res.status(409).json({ message: "Category already exists!" });
//     }



//     const [result] = await pool.query(
//       `INSERT INTO categories (categoryname, image, description) VALUES (?, ?, ?)`,
//       [categoryname, category_logo, description]
//     );


//     res
//       .status(201)
//       .json({ message: "Category added successfully.", categoryId: result.insertId });

//   } catch (error) {
//     console.error("Error in addCategory:", error);

//     // ✅ Check for MySQL duplicate entry error
//     if (error.code === "ER_DUP_ENTRY") {
//       return res.status(409).json({ message: "Category already exists!" });
//     }

//     res.status(500).json({ error: error.message });
//   }
// };










// //get all categories 

// exports.getAllCategories = async (req, res) => {

//   try {

//     const [rows] = await pool.query("SELECT * FROM categories ORDER BY id DESC");

//     res.json(rows);


//   } catch (error) {
//     console.error('error in getAllCategory', error);
//     res.status(500).json({ error: error.message });
//   }

// }


// // get single category

// exports.getcategory = async (req, res) => {
//   try {

//     const { id } = req.params;

//     const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
//     if (rows.length === 0) return res.status(404).json({ message: "Category not found" });
//     res.status(500).json(rows[0]);



//   } catch (error) {
//     console.error('error in getCategory', error);
//     res.status(500).json({ error: error.message });
//   }
// }


// //updating category

// exports.updateCategory = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const {
//       categoryname,
//       description
//     } = req.body;

//     const category_logo = req.file
//       ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
//       : null;

//     const [result] = await pool.query(
//       `UPDATE  schools SET 
//           categoryname=?,
//           description=?,
//           image=IFNULL(?, image)
//           WHWRE id=?
//         `,
//       [categoryname, category_logo, description, id]
//     );

//     if (result.affectedRows === 0) return res.status.json({ message: "category not found" });

//     res.json({ message: "Category found" });


//   } catch (error) {
//     console.error('error in updateCategory', error);
//     res.status(500).json({ error: error.message });
//   }
// }




// //delete category
// exports.deleteCategory = async (req, res) => {
//   const { id } = req.params;
//   try {

//     const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);
//     if (result.affectedRows === 0) return res.status(404).json({ message: "Category not found" });
//     res.json({ message: "Category deleted successfully!" });

//   } catch (error) {
//     console.error('error in deleteCategory', error);
//     res.status(500).json({ error: error.message });
//   }
// }


const pool = require("../config/db");

// ✅ Add Category
exports.addCategory = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Uploaded file:", req.file);

    const { categoryname, description } = req.body;
    const category_logo = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    if (!categoryname || !category_logo) {
      return res.status(400).json({ message: "Name and image are required" });
    }

    // Check for duplicates
    const [existing] = await pool.query(
      "SELECT id FROM categories WHERE categoryname = ?",
      [categoryname]
    );
    if (existing.length > 0) {
      return res.status(409).json({ message: "Category already exists!" });
    }

    const [result] = await pool.query(
      `INSERT INTO categories (categoryname, image, description) VALUES (?, ?, ?)`,
      [categoryname, category_logo, description]
    );

    res
      .status(201)
      .json({ message: "Category added successfully.", categoryId: result.insertId });
  } catch (error) {
    console.error("Error in addCategory:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "Category already exists!" });
    }
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM categories ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    console.error("Error in getAllCategories:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get Single Category by ID
exports.getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ message: "Category not found" });

    res.status(200).json(rows[0]); // ✅ Correct success status
  } catch (error) {
    console.error("Error in getCategory:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { categoryname, description } = req.body;

    const category_logo = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : null;

    // Check if category exists
    const [existing] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
    if (existing.length === 0)
      return res.status(404).json({ message: "Category not found" });

    // Update with or without new image
    const [result] = await pool.query(
      `UPDATE categories 
       SET categoryname = ?, 
           description = ?, 
           image = IFNULL(?, image) 
       WHERE id = ?`,
      [categoryname, description, category_logo, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not updated" });

    res.json({ message: "✅ Category updated successfully" });
  } catch (error) {
    console.error("Error in updateCategory:", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Category not found" });

    res.json({ message: "🗑️ Category deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteCategory:", error);
    res.status(500).json({ error: error.message });
  }
};
