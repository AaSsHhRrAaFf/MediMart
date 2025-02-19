// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { useQuery } from "@tanstack/react-query";
// import api from "../../services/api";
// import LoadSpinner from "../Shared/LoadSpinner";

// const SliderSection = () => {
//   const {
//     data: slides,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["advertiseMedicines"],
//     queryFn: async () => {
//       const res = await api.get("/api/medicines/advertise");
//       console.log("Slider data from API:", res.data);
//       return res.data;
//     },
//   });

//   if (isLoading) {
//     return <LoadSpinner />;
//   }

//   if (isError) {
//     console.error("Error loading slider data");
//     return <div>Error loading slider data</div>;
//   }

//   return (
//     <div className="bg-gray-100 py-12">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-2xl font-bold text-gray-900 mb-8">
//           Featured Products
//         </h2>
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={30}
//           slidesPerView={1}
//           autoplay={{
//             delay: 5000,
//             disableOnInteraction: false,
//           }}
//           navigation
//           pagination={{ clickable: true }}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//         >
//           {slides?.map((slide, index) => (
//             <SwiperSlide key={index}>
//               <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
//                 <img
//                   src={slide.image}
//                   alt={slide.name}
//                   className="w-32 h-32 object-cover rounded-full mb-4"
//                 />
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {slide.name}
//                 </h3>
//                 <p className="text-gray-500 mt-2">{slide.description}</p>
//                 <p className="text-gray-500 mt-2">
//                   Seller: {slide.sellerEmail}
//                 </p>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default SliderSection;

///////////////////////////////////////////////////////////////////////////////////////////////////////
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
    <div className="bg-gray-100 py-4 md:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-8 text-center">
          Featured Products
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16} // Reduced spacing for mobile
          slidesPerView={1}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            480: { slidesPerView: 1 }, // Small screens: 1 slide
            768: { slidesPerView: 2 }, // Medium screens: 2 slides
            1024: { slidesPerView: 3 }, // Large screens: 3 slides
          }}
          aria-label="Featured Products Carousel"
        >
          {slides?.map((slide, index) => (
            <SwiperSlide key={index} aria-hidden={false}>
              <div className="bg-white h-auto w-full md:h-96 hover:scale-105 rounded-lg shadow p-4 md:p-6 flex flex-col items-center">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full mb-4"
                  loading="lazy"
                />
                <h3 className="text-base md:text-lg font-semibold text-gray-800 text-center">
                  {slide.name}
                </h3>
                <p className="text-gray-500 mt-2 line-clamp-2 md:line-clamp-3 text-center">
                  {slide.description}
                </p>
                <p className="text-gray-500 mt-2 text-sm text-center">
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
