import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, UserRound, Settings, Search, Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-200 bg-white">
      <div className="flex justify-between items-center px-5 sm:px-10 py-4">

        <div className="flex items-center gap-4">
          <div>
            <NavLink to="/" className="text-xl font-semibold text-[#21808D] block">
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


        <div className="hidden md:flex items-center gap-6">

          <div className="border border-gray-300 rounded-md px-2 py-1 w-70 flex items-center justify-between gap-2">
            <input type="text" placeholder="Search products..." className="outline-none text-sm w-40" />
            <Search size={18} className="text-gray-500" />
          </div>
          <NavLink to="/cart">
            <ShoppingCart size={20} className="hover:text-red-500" />
          </NavLink>
          <NavLink to="/profile">
            <UserRound size={20} className="hover:text-red-500" />
          </NavLink>
          <NavLink to="/settings">
            <Settings size={20} className="hover:text-red-500" />
          </NavLink>
        </div>


        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-700"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>


      {menuOpen && (
        <div> 
          <div className="border border-gray-300 w-50 m-4 rounded-md px-2 py-1 flex md:hidden items-center gap-2">
          <input
            type="text"
            placeholder="Search products..."
            className="outline-none text-sm "
          />
          <Search size={18} className="text-gray-500" />
        </div>

          <div className="flex flex-col border-t border-gray-200 p-5 m-0 gap-4 md:hidden">

            <NavLink to="/" onClick={() => setMenuOpen(false)} className="hover:text-red-500 border-b border-gray-200">
              Home
            </NavLink>
            <NavLink to="/shop" onClick={() => setMenuOpen(false)} className="hover:text-red-500 border-b border-gray-200">
              Shop
            </NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)} className="hover:text-red-500 border-b border-gray-200">
              Contact
            </NavLink>
            <NavLink to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-red-500 border-b border-gray-200">
              Cart
            </NavLink>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-red-500 border-b border-gray-200">
              Account
            </NavLink>
          </div>


        </div>

      )}
    </div>
  );
};

export default Navbar;
