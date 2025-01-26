
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import LoadSpinner from "../Shared/LoadSpinner";

const SliderSection = () => {
  const {
    data: slides,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["advertiseMedicines"],
    queryFn: async () => {
      const res = await api.get("/api/medicines/advertise");
      console.log("Slider data from API:", res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) {
    console.error("Error loading slider data");
    return <div>Error loading slider data</div>;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Featured Products
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-32 h-32 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {slide.name}
                </h3>
                <p className="text-gray-500 mt-2">{slide.description}</p>
                <p className="text-gray-500 mt-2">
                  Seller: {slide.sellerEmail}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default SliderSection;
