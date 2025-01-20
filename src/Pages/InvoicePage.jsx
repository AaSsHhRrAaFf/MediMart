// Import necessary libraries
import React from 'react';
import { Card, Button } from 'antd';
import 'antd/dist/reset.css'; // Ant Design styles
import 'tailwindcss/tailwind.css'; // Tailwind styles

const InvoicePage = () => {
  const handlePrint = () => {
    window.print(); // Basic print functionality
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl shadow-md p-6">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Website Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Invoice</h1>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Customer Information</h2>
          <p>Name: John Doe</p>
          <p>Email: john.doe@example.com</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Purchase Information</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">Item</th>
                <th className="border border-gray-200 px-4 py-2 text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Product 1</td>
                <td className="border border-gray-200 px-4 py-2 text-right">$50.00</td>
              </tr>
              <tr>
                <td className="border border-gray-200 px-4 py-2">Product 2</td>
                <td className="border border-gray-200 px-4 py-2 text-right">$49.99</td>
              </tr>
              <tr className="font-bold">
                <td className="border border-gray-200 px-4 py-2">Grand Total</td>
                <td className="border border-gray-200 px-4 py-2 text-right">$99.99</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <Button type="primary" size="large" onClick={handlePrint}>
            Print / Download PDF
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InvoicePage;
