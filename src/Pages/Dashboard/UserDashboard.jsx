// Import necessary dependencies
import React from 'react';

// Sample data for payment history (replace with actual data)
const paymentHistory = [
  { id: 1, transactionId: 'TXN12345', status: 'Paid' },
  { id: 2, transactionId: 'TXN67890', status: 'Pending' },
  { id: 3, transactionId: 'TXN11121', status: 'Paid' },
];

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">User Dashboard</h1>
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Payment History</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">#</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Transaction ID</th>
                <th className="px-4 py-2 border border-gray-300 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr key={payment.id} className={`border border-gray-200 ${index % 2 === 0 ? 'bg-gray-50' : ''}`}>
                  <td className="px-4 py-2 text-gray-700 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-gray-700 text-sm">{payment.transactionId}</td>
                  <td className={`px-4 py-2 text-sm font-semibold ${payment.status === 'Paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                    {payment.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
