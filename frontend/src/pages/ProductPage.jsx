import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity
} from "../features/cart/cartSlice";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);


  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === Number(id))
  );

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setActiveImage(res.data.image1);
      })
      .catch(err => console.error(err));
  }, [id]);

  if (!product) return <p className="p-10">Loading...</p>;

  const { productInfo } = product;

  return (
    <div className=" px-6 md:px-16 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* IMAGE SECTION */}
        <div>
          {/* MAIN IMAGE WITH ZOOM */}
          <div className="overflow-hidden rounded-xl bg-white">
            <img
              src={activeImage}
              alt={product.product_name}
              className="w-full h-[420px] object-contain transition-transform duration-300 hover:scale-110 cursor-zoom-in"
            />
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-3 mt-4">
            {[product.image1, product.image2].filter(Boolean).map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(img)}
                className={`w-20 h-20 object-contain border rounded-md cursor-pointer 
                ${activeImage === img ? "border-teal-600" : "border-gray-300"}`}
                alt="thumb"
              />
            ))}
          </div>
        </div>

        {/* PRODUCT INFO SECTION */}
        <div>
          <p className="text-gray-500">{product.brand}</p>

          <h1 className="text-2xl font-semibold mt-1">
            {product.product_name}
          </h1>

          <p className="text-3xl font-bold text-teal-600 mt-3">
            ₹{product.price}
          </p>

          <div className="text-sm text-gray-600 mt-2">
            ⭐⭐⭐⭐☆ (203 reviews)
          </div>

          <p className="text-green-600 mt-2 font-medium">
            ✓ In Stock (22 available)
          </p>

          {/* KEY FEATURES */}
          {productInfo?.key_features?.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-2">Key Features</h3>
              <ul className="space-y-2">
                {productInfo.key_features.map((f, i) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-teal-600">✔</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* QUANTITY */}
          <div className="mt-6 flex gap-2 items-center">
            <label className="text-sm font-medium">
              Quantity:
            </label>

            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-20 border-gray-300 text-center border rounded-md 
               text-sm px-2 py-1"
            />
          </div>



          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() =>
                dispatch(addToCart({ product, quantity }))
              }
              className="bg-teal-600 text-white px-6 py-3 rounded-md 
               hover:bg-teal-700 transition"
            >
              Add to Cart
            </button>

            <button className="bg-gray-200 px-6 py-3 rounded-md hover:bg-gray-300">
              Add to Wishlist
            </button>
          </div>



          {/* TECHNICAL SPECIFICATIONS */}
          {productInfo && (
            <div className="mt-12">
              <h2 className="text-xl font-semibold mb-4">
                Technical Specifications
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full bg-white">
                  <tbody>
                    {Object.entries(productInfo).map(([key, value]) => {
                      if (!value || key === "key_features") return null;

                      return (
                        <tr key={key} className=" border-gray-200 border-b">
                          <td className="bg-slate-100 px-4 py-3 font-medium w-1/3">
                            {key.replace("_", " ").toUpperCase()}
                          </td>
                          <td className="px-4 py-3">
                            {value}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PRODUCT INFORMATION */}
          {product.product_information && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-2">
                Product Information
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {product.product_information}
              </p>
            </div>
          )}

          {/* WARRANTY & SKU */}
          <div className="mt-6 text-sm text-gray-700">
            <p>
              <span className="font-semibold">Warranty:</span>{" "}
              {product.warranty} Years
            </p>
            <p>
              <span className="font-semibold">SKU:</span> {product.sku}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
