import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useCart } from "../../Context/CartContext";
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const { cartItems } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  const languages = ["EN", "ES", "FR", "DE"];

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
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo and Website Name */}
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Logo"
            className="h-14 rounded-2xl object-contain"
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
              Shop
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
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors">
                Join Us
              </button>
            </Link>
          )}

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
              className="flex items-center space-x-1 bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 transition-colors"
            >
              <span>{selectedLanguage}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isLanguageDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white text-gray-800 rounded shadow-md">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 transition-colors"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setIsLanguageDropdownOpen(false);
                    }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
