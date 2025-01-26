import React from "react";
import CategoryCardSection from "../Components/Home/CategoryCard";
import DiscountProductsSlider from "../Components/Home/DiscountProductsSlider";
import { Helmet } from "react-helmet-async";
import SliderSection from "../Components/Home/SliderSection";
import CustomerTestimonialsSection from "../Components/Home/CustomerTestimonialsSection";
import HealthTipsSection from "../Components/Home/HealthTipsSection";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Multi-Vendor Medicine E-commerce</title>
        
      </Helmet>
      <SliderSection/>
      <CategoryCardSection />
      <DiscountProductsSlider />
      <CustomerTestimonialsSection/>
      <HealthTipsSection/>
    </>
  );
}

export default Home;
