import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "../features/category/categorySlice";
import { fetchAllProducts } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const dispatch = useDispatch();

  const { categories, loading: catLoading } = useSelector(
    (state) => state.categories
  );
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div>
      {/* HERO SECTION */}
      <div className="w-full flex flex-col bg-gradient-to-br from-blue-50 to-pink-50 py-10 items-center text-center">
        <h1 className="text-4xl font-semibold m-2 font-Geist">
          SVIT Technologies
        </h1>
        <h2 className="text-xl text-[#21808D] mb-2">
          Security & Access Solutions
        </h2>
        <p className="text-gray-700">
          Leading provider of CCTV cameras and biometric systems
        </p>
        <button className="rounded-xl text-white m-2 mt-7 bg-[#21808D] p-2 px-4">
          Explore Products
        </button>
      </div>

      {/* CATEGORIES */}
      <div className="text-center">
        <h3 className="text-2xl font-semibold my-6">
          Our Product Categories
        </h3>

        {catLoading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="flex justify-evenly gap-2 text-center flex-wrap px-8">
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex flex-col justify-center items-center border border-gray-200 rounded-xl p-5 bg-[#fcfcf9] w-75"
              >
                <img
                  src={category.image}
                  className="w-16 h-16"
                  alt="category"
                />
                <h3 className="font-semibold text-xl py-2">
                  {category.categoryname}
                </h3>
                <p className="text-xs text-gray-500 pb-2">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FEATURED PRODUCTS */}
      <div className="my-6 mx-3 px-2 sm:my-10 sm:mx-10 sm:px-4">
        <h3 className="text-2xl font-semibold text-center mb-4 sm:mb-6">
          Featured Products
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Home;
