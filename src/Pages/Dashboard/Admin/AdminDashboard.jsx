// import React, { useState, useEffect, useContext } from "react";
// import { Helmet } from "react-helmet-async";
// import { useQuery } from "@tanstack/react-query";
// import api from "../../../services/api";
// import LoadSpinner from "../../../Components/Shared/LoadSpinner";
// import { Menu } from "antd";
// import { AuthContext } from "../../../Context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import AdminHomepage from "./AdminHomepage";
// import ManageUsers from "./ManageUsers";
// import ManageCategory from "./ManageCategory";
// import PaymentManagement from "./PaymentManagement";
// import SalesReport from "./SalesReport";
// import ManageBannerAdvertise from "./ManageBannerAdvertise";

// const AdminDashboard = () => {
//   const [selectedKey, setSelectedKey] = useState("1");
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("AdminDashboard: Checking user and role:", user);
//     if (!user || user.role !== "admin") {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const {
//     data: dashboardData,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["adminDashboard"],
//     queryFn: async () => {
//       console.log("AdminDashboard: Fetching dashboard data...");
//       const response = await api.get("/api/admin/dashboard-data");
//       console.log("AdminDashboard: Dashboard data received:", response.data);
//       return response.data;
//     },
//     enabled: !!user,
//   });

//   if (isLoading) {
//     console.log("AdminDashboard: Loading data...");
//     return <LoadSpinner />;
//   }

//   if (isError) {
//     console.error("AdminDashboard: Error loading dashboard data");
//     return <div>Error loading dashboard data</div>;
//   }

//   const { users, categories, payments, salesReport, bannerAdvertise } =
//     dashboardData || {};
//   const menuItems = [
//     {
//       key: "1",
//       label: "Admin Homepage",
//       component: <AdminHomepage />,
//     },
//     {
//       key: "2",
//       label: "Manage Users",
//       component: <ManageUsers users={users} />,
//     },
//     {
//       key: "3",
//       label: "Manage Category",
//       component: <ManageCategory categories={categories} />,
//     },
//     {
//       key: "4",
//       label: "Payment Management",
//       component: <PaymentManagement payments={payments} />,
//     },
//     {
//       key: "5",
//       label: "Sales Report",
//       component: <SalesReport salesReport={salesReport} />,
//     },
//     {
//       key: "6",
//       label: "Manage banner Advertise",
//       component: <ManageBannerAdvertise bannerAdvertise={bannerAdvertise} />,
//     },
//   ];

//   const handleMenuClick = ({ key }) => {
//     console.log("AdminDashboard: Menu item clicked:", key);
//     setSelectedKey(key);
//   };

//   const selectedComponent = menuItems.find(
//     (item) => item.key === selectedKey
//   )?.component;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Helmet>
//         <title>Admin Dashboard</title>
//       </Helmet>
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="bg-gray-800 text-white w-64 p-4">
//           <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
//           <Menu
//             theme="dark"
//             mode="vertical"
//             selectedKeys={[selectedKey]}
//             onClick={handleMenuClick}
//           >
//             {menuItems.map((item) => (
//               <Menu.Item key={item.key}>{item.label}</Menu.Item>
//             ))}
//           </Menu>
//         </aside>

//         {/* Content Area */}
//         <main className="flex-1 p-6">{selectedComponent}</main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect, useContext, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { Layout, Menu, Spin, Alert } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  AppstoreOutlined,
  DollarOutlined,
  BarChartOutlined,
  NotificationOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import api from "../../../services/api";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminHomepage from "./AdminHomepage";
import ManageUsers from "./ManageUsers";
import ManageCategory from "./ManageCategory";
import PaymentManagement from "./PaymentManagement";
import SalesReport from "./SalesReport";
import ManageBannerAdvertise from "./ManageBannerAdvertise";
import ErrorState from "../../../Components/Shared/ErrorState";
/* import AdminHeader from "./AdminHeader"; */
import UserProfile from '../UserProfile'

const { Content, Sider } = Layout;

const menuItems = [
  {
    key: "1",
    icon: <DashboardOutlined />,
    label: "Dashboard",
    component: <AdminHomepage />,
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "User Management",
    component: <ManageUsers />,
  },
  {
    key: "3",
    icon: <AppstoreOutlined />,
    label: "Category Management",
    component: <ManageCategory />,
  },
  {
    key: "4",
    icon: <DollarOutlined />,
    label: "Payment Gateway",
    component: <PaymentManagement />,
  },
  {
    key: "5",
    icon: <BarChartOutlined />,
    label: "Sales Analytics",
    component: <SalesReport />,
  },
  {
    key: "6",
    icon: <NotificationOutlined />,
    label: "Banner Ads",
    component: <ManageBannerAdvertise />,
  },
];

const AdminDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("1");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Security check
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/unauthorized", { replace: true });
    }
  }, [user, navigate]);

  // Dashboard data query
  const {
    data: dashboardData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const response = await api.get("/api/admin/dashboard-data");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes cache
    retry: 2,
    enabled: !!user?.role === "admin",
  });

  const handleMenuClick = useCallback(({ key }) => {
    setSelectedKey(key);
  }, []);

  const toggleCollapsed = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  if (isLoading) return <Spin size="large" className="center-screen" />;

  if (isError)
    return (
      <ErrorState error={error} onRetry={refetch} className="center-screen" />
    );

  const selectedComponent = menuItems.find(
    (item) => item.key === selectedKey
  )?.component;

  return (
    <Layout className="min-h-screen">
      <Helmet>
        <title>Admin Dashboard | PharmaStore</title>
        <meta
          name="description"
          content="Administrative interface for managing platform operations"
        />
      </Helmet>

      <Sider
        width={256}
        collapsedWidth={80}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        className="admin-sider !fixed h-screen"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 h-16 border-b border-gray-700">
            {!collapsed ? (
              <h1 className="text-white text-xl font-bold">
                PharmaStore Admin
              </h1>
            ) : (
              <div className="w-6 h-6 bg-blue-500 rounded-full" />
            )}
            <button
              onClick={toggleCollapsed}
              className="text-white hover:text-blue-300 transition-colors"
              aria-label={collapsed ? "Expand menu" : "Collapse menu"}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            onClick={handleMenuClick}
            className="flex-1 overflow-auto"
            style={{ height: "calc(100vh - 64px)" }}
          >
            {menuItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={item.icon}
                className="!flex items-center h-12 !px-4"
              >
                {!collapsed && item.label}
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Sider>

      <Layout
        className={`ml-${collapsed ? 20 : 64} transition-margin`}
        style={{
          marginLeft: collapsed ? 80 : 256,
          minHeight: "100vh",
        }}
      >
        <AdminHeader />
        <Content className="p-6 bg-gray-50">
          <div className="min-h-[calc(100vh-160px)] bg-white rounded-lg shadow-sm p-6">
            {React.cloneElement(selectedComponent, {
              data: dashboardData,
              loading: isLoading,
            })}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
