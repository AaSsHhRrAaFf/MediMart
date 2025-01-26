import React, { useContext } from "react";
import { Card, Button } from "antd";
import "antd/dist/reset.css";
import "tailwindcss/tailwind.css";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../Context/AuthContext";
import { useLocation } from "react-router-dom";

const InvoicePage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const { invoiceItems, totalPrice, userName } = location.state || {
    invoiceItems: [],
    totalPrice: 0,
    userName: "N/A",
  };
  /* 
  console.log("Invoice Items:", invoiceItems);
  console.log("Total Price:", totalPrice);
  console.log("User Name:", userName); */

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-3xl shadow-md p-6">
        <div className="text-center mb-6">
          <img src={logo} alt="Website Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Invoice</h1>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Customer Information</h2>
          <p>Name: {userName || "N/A"}</p>
          <p>Email: {user?.email || "N/A"}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Purchase Information</h2>
          <table className="table-auto w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2 text-left">
                  Item
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right">
                  Price
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right">
                  Quantity
                </th>
                <th className="border border-gray-200 px-4 py-2 text-right">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems?.map((item) => (
                <tr key={item.medicineId}>
                  <td className="border border-gray-200 px-4 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right">
                    ${item.pricePerUnit.toFixed(2)}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right">
                    {item.quantity}
                  </td>
                  <td className="border border-gray-200 px-4 py-2 text-right">
                    ${(item.pricePerUnit * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr className="font-bold">
                <td className="border border-gray-200 px-4 py-2">
                  Grand Total
                </td>
                <td className="border border-gray-200 px-4 py-2"></td>
                <td className="border border-gray-200 px-4 py-2"></td>
                <td className="border border-gray-200 px-4 py-2 text-right">
                  ${totalPrice.toFixed(2)}
                </td>
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
