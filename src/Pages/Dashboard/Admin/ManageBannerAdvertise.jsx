import React from "react";
import { Switch } from "antd";
import api from "../../../services/api";

const ManageBannerAdvertise = ({ bannerAdvertise }) => {
  console.log(
    "ManageBannerAdvertise: Banner advertise data received:",
    bannerAdvertise
  );

  const handleToggleAdvertise = async (medicineId, isAdded) => {
    console.log(
      `ManageBannerAdvertise: Toggling advertise status for ${medicineId} to ${isAdded}`
    );
    try {
      const response = await api.patch(`/api/admin/advertise/${medicineId}`, {
        advertiseStatus: isAdded,
      });
      console.log("Advertise status updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating advertise status:", error);
    }
  };

  if (!bannerAdvertise || bannerAdvertise.length === 0) {
    return <div>No banner advertise data available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Banner Advertise</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Medicine Image
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Medicine Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Description
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Seller Email
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {bannerAdvertise?.map((advertise) => (
              <tr key={advertise.medicineId} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  <img
                    src={advertise.image}
                    alt={advertise.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {advertise.name}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {advertise.description}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {advertise.sellerEmail}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  <Switch
                    defaultChecked={advertise.advertiseStatus}
                    onChange={(checked) =>
                      handleToggleAdvertise(advertise.medicineId, checked)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBannerAdvertise;
//ui