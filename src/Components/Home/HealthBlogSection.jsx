// Filepath: D:\PH-Assignments\B10-A12\Client\multi-vendor-medicine-ecommerce\src\Components\Home\HealthBlogSection.jsx

import React from "react";

const HealthBlogSection = () => {
  const blogPosts = [
    {
      title: "The Importance of Regular Health Check-Ups",
      excerpt:
        "Discover why regular health check-ups are crucial for maintaining your well-being.",
      link: "/blog/health-check-ups",
    },
    {
      title: "Top 10 Healthy Eating Tips",
      excerpt:
        "Learn how to improve your diet with these top 10 healthy eating tips.",
      link: "/blog/healthy-eating-tips",
    },
    {
      title: "Managing Stress for Better Health",
      excerpt:
        "Explore effective strategies for managing stress and improving your health.",
      link: "/blog/managing-stress",
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Health Blog</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-800">
                {post.title}
              </h3>
              <p className="text-gray-600 mt-2">{post.excerpt}</p>
              <a href={post.link} className="text-blue-500 mt-4 inline-block">
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthBlogSection;
