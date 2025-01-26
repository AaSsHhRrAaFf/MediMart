import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, Quote } from "lucide-react";

const CustomerTestimonialsSection = () => {
  const testimonials = [
    {
      name: "John Doe",
      role: "Regular Customer",
      feedback:
        "Great service and fast delivery! I've been using MediMart for all my medication needs, and they never disappoint.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Jane Smith",
      role: "Pharmacist",
      feedback:
        "The products are of high quality and affordable. As a healthcare professional, I highly recommend MediMart.",
      rating: 5,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Sam Wilson",
      role: "Chronic Patient",
      feedback:
        "Customer support was very helpful and responsive. They went above and beyond to ensure I got my medications on time.",
      rating: 4,
      image: "/placeholder.svg?height=100&width=100",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          What Our Customers Say
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Hear from our satisfied customers about their experience with MediMart
        </p>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-8 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`inline-block w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-indigo-400 mb-4" />
                <p className="text-gray-700 italic mb-4">
                  {testimonial.feedback}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerTestimonialsSection;
