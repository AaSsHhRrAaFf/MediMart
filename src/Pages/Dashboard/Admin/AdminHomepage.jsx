
import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import api from "../../../services/api";
import LoadSpinner from "../../../Components/Shared/LoadSpinner";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const AdminHomepage = () => {
  const {
    data: dashboardData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await api.get("/api/admin/dashboard-data");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return <div>Error loading dashboard data</div>;
  }

  const { totalSalesRevenue, paidTotal, pendingTotal } = dashboardData;

  const data = [
    {
      name: "Revenue",
      total: totalSalesRevenue,
      paid: paidTotal,
      pending: pendingTotal,
    },
  ];

  return (
    <div className="p-6">
      <Helmet>
        <title>Admin Homepage</title>
      </Helmet>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Revenue</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-gray-400"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold">
              ${totalSalesRevenue?.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">+20.1% from last month</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Paid Total</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-gray-400"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold">
              ${paidTotal?.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">+180.1% from last month</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Pending Total</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-gray-400"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
          <div>
            <div className="text-2xl font-bold">
              ${pendingTotal?.toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">+19% from last month</p>
          </div>
        </div>
      </div>
      <div className="bg-white mt-6 p-6 rounded-lg shadow-md">
        <div>
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
        </div>
        <div className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              <Bar dataKey="paid" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="pending" fill="#f43f5e" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;
