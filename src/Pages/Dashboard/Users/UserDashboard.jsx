// src/Pages/Dashboard/UserDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import LoadSpinner from "../../../Components/Shared/LoadSpinner";
import { Table, Pagination, Select, Badge } from "antd";
import { format } from "date-fns";
import { AuthContext } from "../../../Context/AuthContext";
import api from "../../../services/api";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const {
    data: paymentHistoryData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["paymentHistory", currentPage, pageSize],
    queryFn: async () => {
      try {
        console.log("Fetching payment history data...");
        const response = await api.get(
          `/api/users/payment-history?page=${currentPage}&limit=${pageSize}`
        );
        console.log("Payment history response:", response); // Log the entire response
        if (response.status === 401 || response.status === 403) {
          navigate("/login");
          localStorage.removeItem("accessToken");
          throw new Error("Unauthorized");
        }
        console.log("Payment history data:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching payment history:", error);
        navigate("/login");
        throw error;
      }
    },
    enabled: !!user, // Ensure the query doesn't run if user is null
  });

  useEffect(() => {
    console.log("paymentHistoryData changed:", paymentHistoryData);
  }, [paymentHistoryData]);

  const paymentHistory = paymentHistoryData?.payments || []; // Access payments from data
  const totalPayments = paymentHistoryData?.total || 0; // Access total count from data

  useEffect(() => {
    console.log("paymentHistory:", paymentHistory);
    console.log("totalPayments:", totalPayments);
  }, [paymentHistory, totalPayments]);

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => (
        <span title={text}>
          {text.length > 8 ? `${text.substring(0, 8)}...` : text}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <Badge
          text={text}
          className={`font-semibold ${
            text === "Paid"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        />
      ),
    },
    {
      title: "Payment Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (text) =>
        text ? format(new Date(text), "dd/MM/yyyy HH:mm") : "N/A",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },

    {
      title: "Medicine Details",
      dataIndex: "medicineDetails",
      key: "medicineDetails",
      render: (medicineDetails) => (
        <ul>
          {medicineDetails && medicineDetails.length > 0
            ? medicineDetails.map((medicine) => (
                <li key={medicine.medicineId}>
                  <span>{medicine.medicineId}</span>
                  {/* <strong>{medicine.name}</strong> ({medicine.quantity}) */}
                  - Quantity: ({medicine.quantity})
                </li>
              ))
            : "No medicine details available."}
        </ul>
      ),
    },
  ];

  if (isLoading) {
    return <LoadSpinner />;
  }

  if (isError) {
    return (
      <div className="text-red-500">
        Error loading payment history. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <title>User Dashboard | MediMart</title>
      </Helmet>
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          User Dashboard
        </h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          Payment History
        </h2>

        <div className="overflow-x-auto">
          <Table
            dataSource={paymentHistory}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <Select
              defaultValue={pageSize}
              onChange={(value) => {
                setPageSize(value);
                setCurrentPage(1);
              }}
              disabled={isLoading}
            >
              <Select.Option value={5}>5 / page</Select.Option>
              <Select.Option value={10}>10 / page</Select.Option>
              <Select.Option value={20}>20 / page</Select.Option>
            </Select>
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={totalPayments}
            onChange={(page) => {
              setCurrentPage(page);
              refetch();
            }}
            disabled={isLoading}
            className="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
