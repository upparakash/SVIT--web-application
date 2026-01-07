import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQuantity,
  decrementQuantity
} from "../features/cart/cartSlice";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  return (
    <div className="bg-[#fcfcf9] border border-gray-200 rounded-xl shadow-sm 
                    hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

      <img
        src={product.image1}
        alt={product.product_name}
        onClick={() => navigate(`/product/${product.id}`)}
        className="w-full h-[180px] object-cover rounded-t-xl cursor-pointer"
      />

      <div className="p-4 flex flex-col gap-2">
        <p className="text-sm text-gray-500">{product.brand}</p>

        <h3 className="text-lg font-semibold">{product.product_name}</h3>

        <h3 className="text-xl font-bold text-[#21808D]">
          ₹{product.price}
        </h3>

        <p className="text-sm text-gray-400">(67 reviews)</p>

        <div className="flex items-center gap-2 mt-3">
          {!cartItem ? (
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    name: product.product_name,
                    image: product.image1,
                    price: Number(product.price),
                    brand: product.brand,
                    sku: product.sku
                  })
                )
              }
              className="flex-1 bg-[#21808D] text-white py-2 rounded-lg hover:bg-[#1a6a75] transition"
            >
              Add To Cart
            </button>
          ) : (
            <div className="flex items-center justify-between flex-1 border border-gray-300 rounded-lg px-3 py-2">
              <button
                onClick={() => dispatch(decrementQuantity(product.id))}
                className="text-lg font-bold"
              >
                −
              </button>

              <span className="font-semibold">{cartItem.quantity}</span>

              <button
                onClick={() => dispatch(incrementQuantity(product.id))}
                className="text-lg font-bold"
              >
                +
              </button>
            </div>
          )}

          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
            ❤️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
