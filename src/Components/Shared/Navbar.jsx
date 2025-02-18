import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import logo from "../../assets/logo.jpg";


const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { cartItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);


  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsProfileDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <nav className="bg-[#25A8D6] text-white lg:px-32">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-10 rounded-xl object-contain"
          />
          <span className="text-3xl font-bold">MediMart</span>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <Link to="/" className="hover:text-gray-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-gray-300 transition-colors">
            All Medicines
            </Link>
          </li>
         
        </ul>

        <div className="flex items-center space-x-6">
          {/* Cart Icon */}
          <Link
            to="/cart"
            className="relative hover:text-gray-300 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Link>

          {/* Conditional rendering for Join Us button or User Profile */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="rounded-full focus:outline-none flex items-center"
              >
                <img
                  src={user.photoURL || "/user.png"}
                  alt="Profile"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-md z-10">
                  <Link
                    to={
                      user.role === "admin"
                        ? "/dashboard/admin"
                        : user.role === "seller"
                        ? "/dashboard/seller"
                        : "/dashboard/user"
                    }
                    className="block px-4 py-2 hover:bg-gray-200 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left block px-4 py-2 hover:bg-gray-200 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <button className="bg-gradient-to-tr from-[#60DBEA] to-[#C4EE7D] hover:bg-gradient-to-l text-white text-xl font-medium px-4 py-2 rounded transition-colors">
               Login
              </button>
            </Link>
          )}

        
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
