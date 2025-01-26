import React from "react";
import { Button } from "antd";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../services/api";
import { toast } from "react-toastify";

const PaymentManagement = ({ payments }) => {
  console.log("PaymentManagement: Payments data received:", payments);
  const queryClient = useQueryClient();

  const { mutate: acceptPayment, isLoading: isAcceptingPayment } = useMutation({
    mutationFn: (paymentId) => {
      console.log(
        `PaymentManagement: API call to accept payment for ID: ${paymentId}`
      );
      return api.patch(`/api/users/payment-history/accept/${paymentId}`);
    },
    onSuccess: () => {
      console.log("PaymentManagement: Payment accepted successfully");
      toast.success("Payment Accepted Successfully", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      queryClient.invalidateQueries(["adminDashboard"]);
    },
    onError: (error) => {
      console.error("PaymentManagement: Error accepting payment:", error);
      toast.error("Failed to accept payment", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const handleAcceptPayment = (paymentId) => {
    console.log("PaymentManagement: Accepting payment with ID:", paymentId);
    acceptPayment(paymentId);
  };

  if (!payments || payments.length === 0) {
    return <div>No payment data available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Payment Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Transaction ID
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Status
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {payments?.map((payment) => (
              <tr key={payment.paymentId} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {payment.transactionId}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {payment.status}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {payment.status === "Pending" && (
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleAcceptPayment(payment.paymentId)}
                      loading={isAcceptingPayment}
                    >
                      Accept Payment
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentManagement;
