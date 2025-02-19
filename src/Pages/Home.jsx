import React from "react";
import CategoryCardSection from "../Components/Home/CategoryCard";
import DiscountProductsSlider from "../Components/Home/DiscountProductsSlider";
import { Helmet } from "react-helmet-async";
import SliderSection from "../Components/Home/SliderSection";
import CustomerTestimonialsSection from "../Components/Home/CustomerTestimonialsSection";
import HealthTipsSection from "../Components/Home/HealthTipsSection";
import FeaturedCategoriesSection from "../Components/Home/FeaturedCategoriesSection";
import HealthBlogSection from "../Components/Home/HealthBlogSection";
import PartnerBrandsSection from "../Components/Home/PartnerBrandsSection";


function Home() {
  return (
    <div className="lg:px-36">
      <Helmet>
        <title>Home | Multi-Vendor Medicine E-commerce</title>
        
      </Helmet>
    
      <SliderSection/>
      <CategoryCardSection />
      <DiscountProductsSlider />
      <CustomerTestimonialsSection/>
      <HealthTipsSection/>
      <FeaturedCategoriesSection />
      <HealthBlogSection />
      <PartnerBrandsSection />
    </div>
  );
}

export default Home;
