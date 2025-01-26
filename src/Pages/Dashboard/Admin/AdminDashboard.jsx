import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import LoadSpinner from "../../../Components/Shared/LoadSpinner";
import { Menu } from "antd";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminHomepage from "./AdminHomepage";
import ManageUsers from "./ManageUsers";
import ManageCategory from "./ManageCategory";
import PaymentManagement from "./PaymentManagement";
import SalesReport from "./SalesReport";
import ManageBannerAdvertise from "./ManageBannerAdvertise";

const AdminDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AdminDashboard: Checking user and role:", user);
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      console.log("AdminDashboard: Fetching dashboard data...");
      const response = await api.get("/api/admin/dashboard-data");
      console.log("AdminDashboard: Dashboard data received:", response.data);
      return response.data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    console.log("AdminDashboard: Loading data...");
    return <LoadSpinner />;
  }

  if (isError) {
    console.error("AdminDashboard: Error loading dashboard data");
    return <div>Error loading dashboard data</div>;
  }

  const { users, categories, payments, salesReport, bannerAdvertise } =
    dashboardData || {};
  const menuItems = [
    {
      key: "1",
      label: "Admin Homepage",
      component: <AdminHomepage />,
    },
    {
      key: "2",
      label: "Manage Users",
      component: <ManageUsers users={users} />,
    },
    {
      key: "3",
      label: "Manage Category",
      component: <ManageCategory categories={categories} />,
    },
    {
      key: "4",
      label: "Payment Management",
      component: <PaymentManagement payments={payments} />,
    },
    {
      key: "5",
      label: "Sales Report",
      component: <SalesReport salesReport={salesReport} />,
    },
    {
      key: "6",
      label: "Manage banner Advertise",
      component: <ManageBannerAdvertise bannerAdvertise={bannerAdvertise} />,
    },
  ];

  const handleMenuClick = ({ key }) => {
    console.log("AdminDashboard: Menu item clicked:", key);
    setSelectedKey(key);
  };

  const selectedComponent = menuItems.find(
    (item) => item.key === selectedKey
  )?.component;

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Admin Dashboard</title>
      </Helmet>
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 p-4">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <Menu
            theme="dark"
            mode="vertical"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
          >
            {menuItems.map((item) => (
              <Menu.Item key={item.key}>{item.label}</Menu.Item>
            ))}
          </Menu>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6">{selectedComponent}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
