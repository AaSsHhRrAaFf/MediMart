import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import LoadSpinner from "../../../Components/Shared/LoadSpinner";
import { Menu } from "antd";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import ManageMedicines from "./ManageMedicines";
import PaymentHistory from "./PaymentHistory";
import AskForAdvertisement from "./AskForAdvertisement";
import PrivateRoute from "../../../Routes/PrivateRoute";
import SellerHomepage from "./SellerHomepage";

const SellerDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("SellerDashboard: Checking user and role:", user);
    if (!user || user.role !== "seller") {
      navigate("/");
    }
  }, [user, navigate]);

  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sellerDashboard"],
    queryFn: async () => {
      console.log("SellerDashboard: Fetching dashboard data...");
      const response = await api.get("/api/seller/dashboard-data");
      console.log("SellerDashboard: Dashboard data received:", response.data);
      return response.data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    console.log("SellerDashboard: Loading data...");
    return <LoadSpinner />;
  }

  if (isError) {
    console.error("SellerDashboard: Error loading dashboard data");
    return <div>Error loading dashboard data</div>;
  }

  const { medicines, paymentHistory, advertisements } = dashboardData || {};

  const menuItems = [
    {
      key: "1",
      label: "Seller Homepage",
      component: <SellerHomepage />,
    },
    {
      key: "2",
      label: "Manage Medicines",
      component: <ManageMedicines medicines={medicines} />,
    },
    {
      key: "3",
      label: "Payment History",
      component: <PaymentHistory paymentHistory={paymentHistory} />,
    },
    {
      key: "4",
      label: "Ask For Advertisement",
      component: <AskForAdvertisement advertisements={advertisements} />,
    },
  ];

  const handleMenuClick = ({ key }) => {
    console.log("SellerDashboard: Menu item clicked:", key);
    setSelectedKey(key);
  };

  const selectedComponent = menuItems.find(
    (item) => item.key === selectedKey
  )?.component;

  return (
    <div className="min-h-screen bg-gray-100">
      <Helmet>
        <title>Seller Dashboard</title>
      </Helmet>
      <div className="flex">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 p-4">
          <h2 className="text-2xl font-bold mb-4">Seller Panel</h2>
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

export default SellerDashboard;
