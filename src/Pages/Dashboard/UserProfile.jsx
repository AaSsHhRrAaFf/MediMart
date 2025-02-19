// src/Pages/Dashboard/UserProfile.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../services/api"; // Your API service
import LoadSpinner from "../../Components/Shared/LoadSpinner";

const UserProfile = () => {
  const {
    isLoading,
    error,
    data: user,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const response = await api.get("/api/users/me");
      return response.data;
    },
  });

  if (isLoading) return <LoadSpinner />;

  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="flex items-center mb-6">
        <img
          src={user.photo || "/placeholder-profile.jpg"} // Use a default image if no photo
          alt={`${user.name}'s Profile`}
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-medium text-gray-800">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 font-medium">Role:</p>
          <p className="text-gray-600">{user.role}</p>
        </div>
        {user.phone && (
          <div>
            <p className="text-gray-700 font-medium">Phone:</p>
            <p className="text-gray-600">{user.phone}</p>
          </div>
        )}
        {user.address && (
          <div>
            <p className="text-gray-700 font-medium">Address:</p>
            <p className="text-gray-600">{user.address}</p>
          </div>
        )}
        {/* Add more fields as needed */}
      </div>

      {/* Optional: Add Edit Profile button */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-6">
        Edit Profile
      </button>
    </div>
  );
};

export default UserProfile;
