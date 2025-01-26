// src/Pages/Dashboard/Admin/ManageUsers.jsx
import React from "react";
import { Select } from "antd";
import api from "../../../services/api";
import { toast } from "react-toastify";

const ManageUsers = ({ users }) => {
  console.log("ManageUsers: Users data received:", users);

  const handleRoleChange = async (userId, newRole) => {
    console.log(`ManageUsers: User ${userId} role changing to ${newRole}`);
    try {
      const response = await api.patch(`/api/users/update-role/${userId}`, {
        role: newRole,
      });
      if (response.status === 200) {
        toast.success("User role updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        toast.error("Failed to update user role", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Failed to update user role", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  if (!users || users.length === 0) {
    return <div>No users data available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Username
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Email
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Role
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {user.username}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {user.email}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {user.role}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  <Select
                    defaultValue={user.role}
                    style={{ width: 120 }}
                    onChange={(value) => handleRoleChange(user._id, value)}
                    options={[
                      { value: "user", label: "User" },
                      { value: "seller", label: "Seller" },
                      { value: "admin", label: "Admin" },
                    ]}
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

export default ManageUsers;
