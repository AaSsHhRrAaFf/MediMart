import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import LoadSpinner from "../Shared/LoadSpinner";

const CategoryCard = () => {
  const {
    data: categories,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/api/categories/all");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          Browse Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories?.map((category) => (
            <Link
              to={`/category/${category.categoryName}`}
              key={category.categoryId}
            >
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <img
                  src={category.categoryImage}
                  alt={category.categoryName}
                  className="w-24 h-24 object-cover rounded-full mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.categoryName}
                </h3>
                <p className="text-gray-500 mt-2">
                  {category.medicineCount} medicines available
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
