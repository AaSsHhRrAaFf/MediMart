// import React, { useState, useEffect, useContext } from "react";
// import { Helmet } from "react-helmet-async";
// import { useQuery } from "@tanstack/react-query";
// import api from "../../../services/api";
// import LoadSpinner from "../../../Components/Shared/LoadSpinner";
// import { Menu } from "antd";
// import { AuthContext } from "../../../Context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import ManageMedicines from "./ManageMedicines";
// import PaymentHistory from "./PaymentHistory";
// import AskForAdvertisement from "./AskForAdvertisement";
// import PrivateRoute from "../../../Routes/PrivateRoute";
// import SellerHomepage from "./SellerHomepage";

// const SellerDashboard = () => {
//   const [selectedKey, setSelectedKey] = useState("1");
//   const { user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     console.log("SellerDashboard: Checking user and role:", user);
//     if (!user || user.role !== "seller") {
//       navigate("/");
//     }
//   }, [user, navigate]);

//   const {
//     data: dashboardData,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["sellerDashboard"],
//     queryFn: async () => {
//       console.log("SellerDashboard: Fetching dashboard data...");
//       const response = await api.get("/api/seller/dashboard-data");
//       console.log("SellerDashboard: Dashboard data received:", response.data);
//       return response.data;
//     },
//     enabled: !!user,
//   });

//   if (isLoading) {
//     console.log("SellerDashboard: Loading data...");
//     return <LoadSpinner />;
//   }

//   if (isError) {
//     console.error("SellerDashboard: Error loading dashboard data");
//     return <div>Error loading dashboard data</div>;
//   }

//   const { medicines, paymentHistory, advertisements } = dashboardData || {};

//   const menuItems = [
//     {
//       key: "1",
//       label: "Seller Homepage",
//       component: <SellerHomepage />,
//     },
//     {
//       key: "2",
//       label: "Manage Medicines",
//       component: <ManageMedicines medicines={medicines} />,
//     },
//     {
//       key: "3",
//       label: "Payment History",
//       component: <PaymentHistory paymentHistory={paymentHistory} />,
//     },
//     {
//       key: "4",
//       label: "Ask For Advertisement",
//       component: <AskForAdvertisement advertisements={advertisements} />,
//     },
//   ];

//   const handleMenuClick = ({ key }) => {
//     console.log("SellerDashboard: Menu item clicked:", key);
//     setSelectedKey(key);
//   };

//   const selectedComponent = menuItems.find(
//     (item) => item.key === selectedKey
//   )?.component;

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Helmet>
//         <title>Seller Dashboard</title>
//       </Helmet>
//       <div className="flex">
//         {/* Sidebar */}
//         <aside className="bg-gray-800 text-white w-64 p-4">
//           <h2 className="text-2xl font-bold mb-4">Seller Panel</h2>
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

// export default SellerDashboard;

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
import SellerHomepage from "./SellerHomepage";

// Icons
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
  </svg>
);

const MedicineIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);

const PaymentIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
    <path
      fillRule="evenodd"
      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
      clipRule="evenodd"
    />
  </svg>
);

const AdvertIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
      clipRule="evenodd"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const SellerDashboard = () => {
  const [selectedKey, setSelectedKey] = useState("1");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!user || user.role !== "seller") {
      navigate("/");
    }
  }, [user, navigate]);

  // Close mobile menu after navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [selectedKey]);

  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sellerDashboard"],
    queryFn: async () => {
      const response = await api.get("/api/seller/dashboard-data");
      return response.data;
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white  p-6 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Error Loading Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            There was a problem loading your dashboard data. Please try again
            later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md w-full"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const { medicines, paymentHistory, advertisements } = dashboardData || {};

  const menuItems = [
    {
      key: "1",
      label: "Overview",
      icon: <DashboardIcon />,
      component: <SellerHomepage />,
    },
    {
      key: "2",
      label: "Manage Medicines",
      icon: <MedicineIcon />,
      component: <ManageMedicines medicines={medicines} />,
    },
    {
      key: "3",
      label: "Payment History",
      icon: <PaymentIcon />,
      component: <PaymentHistory paymentHistory={paymentHistory} />,
    },
    {
      key: "4",
      label: "Advertisements",
      icon: <AdvertIcon />,
      component: <AskForAdvertisement advertisements={advertisements} />,
    },
  ];

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
  };

  const selectedComponent = menuItems.find(
    (item) => item.key === selectedKey
  )?.component;

  return (
    <div className="min-h-screen bg-gray-50 transition-colors duration-300">
      <Helmet>
        <title>Seller Dashboard | MediMart</title>
        <meta
          name="description"
          content="Manage your Medi store products, track payments, and create advertisements"
        />
      </Helmet>

      {/* Mobile Header - Fixed at top */}
      <header className="md:hidden bg-indigo-600 text-white fixed top-0 left-0 right-0 z-30 shadow-md">
        <div className="flex items-center justify-between px-4 py-3">
          <h1 className="text-xl font-bold">MediMart</h1>
          <button
            className="p-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0  bg-opacity-50 z-20 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar - Desktop: Left fixed, Mobile: Full screen overlay */}
        <aside
          className={`
            bg-white text-gray-900 z-20
            transition-all duration-300 ease-in-out
            ${
              mobileMenuOpen
                ? "fixed inset-y-0 left-0 w-64 pt-16"
                : "fixed inset-y-0 -left-64 md:left-0 w-64 md:pt-0"
            }
            md:sticky md:top-0 md:h-screen overflow-y-auto
          `}
        >
          <div className="hidden md:block p-4 border-b border-gray-700">
            <h2 className="text-xl font-bold">Seller Panel</h2>
          </div>

          {/* Desktop Menu */}
          <nav className="p-4">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleMenuClick({ key: item.key })}
                className={`
                  w-full text-left p-3 rounded-md mb-2 flex items-center
                  transition duration-200
                  ${
                    selectedKey === item.key
                      ? "bg-indigo-600 text-white"
                      : "text-gray-800 hover:text-white hover:bg-indigo-600"
                  }
                `}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white text-gray-800 z-20 shadow-lg">
          <div className="flex justify-around">
            {menuItems.map((item) => (
              <button
                key={item.key}
                onClick={() => handleMenuClick({ key: item.key })}
                className={`
                  flex flex-col items-center py-3 px-2 flex-1
                  ${
                    selectedKey === item.key
                      ? "text-indigo-400"
                      : "text-gray-400 hover:text-white"
                  }
                `}
              >
                <span className="mb-1">{item.icon}</span>
                <span className="text-xs">{item.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <main
          className={`
          flex-1 transition-all duration-300
          pt-4 px-4 pb-20 md:pb-4 md:p-6 lg:p-8
         
        `}
        >
          <div className="bg-white  rounded-lg shadow-sm p-4 md:p-6 min-h-[calc(100vh-7rem)]">
            {selectedComponent}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SellerDashboard;
