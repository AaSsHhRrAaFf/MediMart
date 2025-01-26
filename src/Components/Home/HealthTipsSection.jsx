import React, { useState } from "react";
import { Heart, Droplet, Dumbbell, Apple, Moon, Pill } from "lucide-react";

const HealthTipsSection = () => {
  const [expandedTip, setExpandedTip] = useState(null);

  const healthTips = [
    {
      icon: <Droplet className="w-8 h-8 text-blue-500" />,
      title: "Stay Hydrated",
      shortDesc: "Drink at least 8 glasses of water a day.",
      longDesc:
        "Staying hydrated is crucial for your body's functions. It helps regulate body temperature, aids digestion, and keeps your skin healthy. Try to drink water throughout the day, not just when you feel thirsty.",
    },
    {
      icon: <Dumbbell className="w-8 h-8 text-green-500" />,
      title: "Regular Exercise",
      shortDesc: "Exercise for at least 30 minutes daily.",
      longDesc:
        "Regular exercise improves cardiovascular health, strengthens muscles and bones, and boosts mental well-being. Find an activity you enjoy, whether it's walking, swimming, or dancing, and make it a part of your daily routine.",
    },
    {
      icon: <Apple className="w-8 h-8 text-red-500" />,
      title: "Balanced Diet",
      shortDesc: "Eat a diet rich in fruits, vegetables, and lean proteins.",
      longDesc:
        "A balanced diet provides your body with essential nutrients. Include a variety of colorful fruits and vegetables, whole grains, lean proteins, and healthy fats in your meals. This helps maintain a healthy weight and reduces the risk of chronic diseases.",
    },
    {
      icon: <Moon className="w-8 h-8 text-indigo-500" />,
      title: "Adequate Sleep",
      shortDesc: "Get 7-8 hours of sleep every night.",
      longDesc:
        "Quality sleep is essential for physical and mental recovery. It improves memory, helps regulate emotions, and boosts immune function. Establish a consistent sleep schedule and create a relaxing bedtime routine to improve your sleep quality.",
    },
    {
      icon: <Pill className="w-8 h-8 text-yellow-500" />,
      title: "Medication Adherence",
      shortDesc: "Take medications as prescribed by your healthcare provider.",
      longDesc:
        "Following your prescribed medication regimen is crucial for managing health conditions effectively. Set reminders, use pill organizers, and consult with your healthcare provider if you have any concerns about your medications.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-2">
          Daily Health Tips
        </h2>
        <p className="text-center text-gray-600 mb-12">
          Simple habits for a healthier you
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthTips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {tip.icon}
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    {tip.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{tip.shortDesc}</p>
                {expandedTip === index ? (
                  <p className="text-gray-700 mt-2">{tip.longDesc}</p>
                ) : null}
                <button
                  onClick={() =>
                    setExpandedTip(expandedTip === index ? null : index)
                  }
                  className="mt-2 text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  {expandedTip === index ? "Read Less" : "Read More"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200">
            <Heart className="w-5 h-5 mr-2" />
            More Health Tips
          </button>
        </div>
      </div>
    </section>
  );
};

export default HealthTipsSection;
