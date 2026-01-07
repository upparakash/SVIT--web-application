import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StockPage.css";

const StockPage = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStockTable();
  }, []);

  const fetchStockTable = async () => {
    try {
      const [productsRes, stockRes] = await Promise.all([
        axios.get("http://localhost:5000/api/products/allproducts"),
        axios.get("http://localhost:5000/api/stock")
      ]);

      const stockMap = {};
      stockRes.data.forEach((s) => {
        stockMap[s.product_id] = s;
      });

      console.log(productsRes.data.products);

      const merged = productsRes.data.products.map((p) => ({
        productId: p.id,
        productName: p.product_name,
        productImage: p.product_image,
        stock: stockMap[p.id]?.stock ?? 0,
        pending: stockMap[p.id]?.pending ?? "",
        confirmed: stockMap[p.id]?.confirmed ?? "",
        hasStock: !!stockMap[p.id]
      }));

      setRows(merged);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load stock table", error);
      setLoading(false);
    }
  };

  const handleCreateStock = async (row) => {
    try {
      await axios.post("http://localhost:5000/api/stock", {
        product_id: row.productId,
        product_name: row.productName,
        product_image: row.productImage,
        stock: 0
      });
      fetchStockTable();
    } catch (error) {
      alert("Stock already exists or error occurred");
    }
  };

  const handleUpdateStock = async (productId, value) => {
    try {
      await axios.put(`http://localhost:5000/api/stock/${productId}`, {
        stock: Number(value)
      });
      fetchStockTable();
    } catch (error) {
      alert("Failed to update stock");
    }
  };

  if (loading) return <p>Loading stock...</p>;

  return (
    <div className="stock-page">
      <h2>Product Stock Management</h2>

      <div className="table-wrapper">
        <table className="stock-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Stock</th>
              <th>Pending</th>
              <th>Confirmed</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>{row.productId}</td>

                <td>
                  <img
                    src={row.productImage}
                    alt={row.productName}
                    className="product-img"
                  />
                </td>

                <td>{row.productName}</td>

                <td>
                  <input
                    type="number"
                    defaultValue={row.stock}
                    onBlur={(e) =>
                      row.hasStock &&
                      handleUpdateStock(row.productId, e.target.value)
                    }
                    disabled={!row.hasStock}
                  />
                </td>

                <td>{row.pending}</td>
                <td>{row.confirmed}</td>

                <td>
                  {!row.hasStock ? (
                    <button
                      className="btn add"
                      onClick={() => handleCreateStock(row)}
                    >
                      Add Stock
                    </button>
                  ) : (
                    <span className="badge">Active</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockPage;
