// Filepath: D:\PH-Assignments\B10-A12\Client\multi-vendor-medicine-ecommerce\src\Components\Home\PartnerBrandsSection.jsx

import React from "react";

const PartnerBrandsSection = () => {
  const brands = [
    { name: "Brand A", logo: "https://ibb.co.com/DHqTbBnt" },
    { name: "Brand B", logo: "https://ibb.co.com/d0VgMJMc" },
    { name: "Brand C", logo: "https://ibb.co.com/1GFswpN3" },
  ];

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Partner Brands</h2>
        <div className="flex justify-around items-center">
          {brands.map((brand, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={brand.logo} alt={brand.name} className="h-16 mb-2" />
              <p className="text-gray-700">{brand.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerBrandsSection;
