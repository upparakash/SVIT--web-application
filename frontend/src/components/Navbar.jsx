import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  UserRound,
  Settings,
  Search,
  Menu,
  X
} from "lucide-react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { totalQuantity } = useSelector((state) => state.cart);

  const handleAccountClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    // ✅ STICKY NAVBAR
    <div className="w-full border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex justify-between items-center px-5 sm:px-10 py-4">
        {/* LOGO + LINKS */}
        <div className="flex items-center gap-4">
          <div>
            <NavLink
              to="/"
              className="text-xl font-semibold text-[#21808D] block"
            >
              SVIT Technologies
            </NavLink>
            <p className="text-sm text-gray-500 -mt-1">
              Security & Access Solutions
            </p>
          </div>

          <div className="hidden md:flex gap-6 font-medium">
            <NavLink to="/" className="hover:text-red-500">
              Home
            </NavLink>
            <NavLink to="/shop" className="hover:text-red-500">
              Shop
            </NavLink>
            <NavLink to="/contact" className="hover:text-red-500">
              Contact
            </NavLink>
          </div>
        </div>

        {/* DESKTOP RIGHT */}
        <div className="hidden md:flex items-center gap-6">
          {/* SEARCH */}
          <div className="border border-gray-300 rounded-md px-2 py-1 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none text-sm w-45"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          {/* CART WITH BADGE */}
          <NavLink to="/cart" className="relative">
            <ShoppingCart size={20} className="hover:text-red-500 font-bold" />
            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full px-1.5 min-w-[18px] h-[18px] flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </NavLink>

          {/* ACCOUNT */}
          <button onClick={handleAccountClick}>
            {user?.profile ? (
              <img
                src={user.profile}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border"
              />
            ) : (
              <UserRound size={20} className="hover:text-red-500 font-bold" />
            )}
          </button>

          {/* SETTINGS */}
          {user && (
            <NavLink to="/settings">
              <Settings size={20} className="hover:text-red-500" />
            </NavLink>
          )}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="bg-white md:hidden">
          {/* MOBILE SEARCH */}
          <div className="border border-gray-300 m-4 rounded-md px-2 py-1 flex items-center gap-2">
            <input
              type="text"
              placeholder="Search products..."
              className="outline-none text-sm w-full"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          {/* LINKS */}
          <div className="flex flex-col border-t border-gray-200 p-5 gap-4">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/shop" onClick={() => setMenuOpen(false)}>
              Shop
            </NavLink>

            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>

            {/* MOBILE CART WITH BADGE */}
            <NavLink
              to="/cart"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-between"
            >
              <span>Cart</span>
              {totalQuantity > 0 && (
                <span className="bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
                  {totalQuantity}
                </span>
              )}
            </NavLink>

            {/* ACCOUNT */}
            <button
              onClick={() => {
                handleAccountClick();
                setMenuOpen(false);
              }}
              className="text-left"
            >
              Account
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
