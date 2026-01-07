import React from "react";

const Footer = () => {
  return (
    <footer className="py-8 mt-2 border-gray-200 border-t-1">
      <div className="max-w-7xl px-5 md:px-15 mx-auto">

        {/* GRID SECTIONS */}
        <div
          className="
            grid 
            grid-cols-1 
            md:grid-cols-2
            lg:grid-cols-4
            gap-10
          "
        >

          {/* COMPANY INFO */}
          <div>
            <h3 className="text-xl font-bold mb-3">SVIT Technologies</h3>

            <p className="text-sm text-gray-500 mb-3">
              Leading provider of CCTV cameras and biometric systems since 2015.
            </p>

            <div className="flex flex-wrap gap-1">
              <span className="bg-[#22C55E14] text-gray-600 font-medium text-xs px-2 py-1 rounded-l">
                ISO 9001:2015
              </span>
              <span className="bg-[#22C55E14] text-gray-600 font-medium text-xs px-2 py-1 rounded-l">
                CE Certified
              </span>
              <span className="bg-[#22C55E14] text-gray-600 font-medium text-xs px-2 py-1 rounded-l">
                FCC Approved
              </span>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-1">
              <li><a href="/" className="text-sm text-gray-500 hover:text-white">Home</a></li>
              <li><a href="/products" className="text-sm text-gray-500 hover:text-white">Products</a></li>
              <li><a href="/contact" className="text-sm text-gray-500 hover:text-white">Contact</a></li>
              <li><a href="/about" className="text-sm text-gray-500 hover:text-white">About Us</a></li>
            </ul>
          </div>

          {/* PRODUCT CATEGORIES */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Product Categories</h4>
            <ul className="space-y-1">
              <li><a href="#" className="text-sm text-gray-500 hover:text-white">CCTV Cameras</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white">Biometric Systems</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white">Access Control</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-white">Accessories</a></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-gray-500 mb-3">
              Subscribe for latest updates and offers
            </p>

            <form className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-md text-sm text-gray-600 border border-gray-300 focus:ring-1 focus:ring-[#21808D] w-full"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-sm bg-[#21808D] text-white hover:bg-[#1a676f]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
          © 2025 SVIT Technologies. All rights reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;
