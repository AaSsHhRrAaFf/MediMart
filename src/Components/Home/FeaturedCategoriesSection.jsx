// Filepath: D:\PH-Assignments\B10-A12\Client\multi-vendor-medicine-ecommerce\src\Components\Home\NewsletterSection.jsx

import React from "react";

const NewsletterSection = () => {
  return (
    <section className="bg-indigo-600 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Stay Updated!</h2>
        <p className="mb-6">Subscribe to our newsletter for the latest updates and promotions.</p>
        <form className="flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 rounded-l-lg text-gray-800"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 p-2 rounded-r-lg">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterSection;
