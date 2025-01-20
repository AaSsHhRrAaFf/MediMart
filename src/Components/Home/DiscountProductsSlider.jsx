import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const discountedProducts = [
  {
    name: "Pain Relief Gel",
    image: "https://via.placeholder.com/150",
    originalPrice: 20.0,
    discountedPrice: 15.0,
  },
  {
    name: "Vitamin C Tablets",
    image: "https://via.placeholder.com/150",
    originalPrice: 25.0,
    discountedPrice: 18.0,
  },
  {
    name: "Cold Relief Syrup",
    image: "https://via.placeholder.com/150",
    originalPrice: 15.0,
    discountedPrice: 10.0,
  },
  {
    name: "Herbal Skin Cream",
    image: "https://via.placeholder.com/150",
    originalPrice: 30.0,
    discountedPrice: 22.0,
  },
  {
    name: "Allergy Relief Capsules",
    image: "https://via.placeholder.com/150",
    originalPrice: 40.0,
    discountedPrice: 30.0,
  },
  {
    name: "Heart Health Supplement",
    image: "https://via.placeholder.com/150",
    originalPrice: 50.0,
    discountedPrice: 35.0,
  },
];

const DiscountProductsSlider = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Discounted Products
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {discountedProducts.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-500 line-through mt-2">
                  ${product.originalPrice.toFixed(2)}
                </p>
                <p className="text-blue-600 font-bold mt-1">
                  ${product.discountedPrice.toFixed(2)}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default DiscountProductsSlider;
