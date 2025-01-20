import React from "react";
import CategoryCardSection from "../Components/Home/CategoryCard";
import DiscountProductsSlider from "../Components/Home/DiscountProductsSlider";
import { Helmet } from "react-helmet-async";

function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Multi-Vendor Medicine E-commerce</title>
        
      </Helmet>
      <CategoryCardSection />
      <DiscountProductsSlider />
    </>
  );
}

export default Home;
