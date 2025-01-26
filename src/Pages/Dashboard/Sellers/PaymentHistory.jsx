import React from "react";

const PaymentHistory = ({ paymentHistory }) => {
  console.log("PaymentHistory: Payment history data received:", paymentHistory);
  if (!paymentHistory || paymentHistory.length === 0) {
    return <div>No payment history available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Buyer Email
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Payment Status
              </th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory?.map((payment) => (
              <tr key={payment.paymentId} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {payment.buyerEmail}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
