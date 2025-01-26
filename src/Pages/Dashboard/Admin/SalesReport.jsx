// src/Pages/Dashboard/Admin/SalesReport.jsx
import React, { useState, useEffect } from "react";
import { DatePicker, Button } from "antd";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const { RangePicker } = DatePicker;

const SalesReport = ({ salesReport }) => {
  const [dateRange, setDateRange] = useState(null);
  const [filteredReport, setFilteredReport] = useState(salesReport);

  useEffect(() => {
    if (dateRange) {
      const [start, end] = dateRange;
      const filtered = salesReport.filter((sale) => {
        const saleDate = new Date(sale.paymentDate);
        return saleDate >= start && saleDate <= end;
      });
      setFilteredReport(filtered);
    } else {
      setFilteredReport(salesReport);
    }
  }, [dateRange, salesReport]);

  const handleDateChange = (dates) => {
    setDateRange(dates);
  };

  const downloadCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredReport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    const csvData = XLSX.write(workbook, { bookType: "csv", type: "array" });
    saveAs(new Blob([csvData], { type: "text/csv" }), "sales_report.csv");
  };

  const downloadXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredReport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
    XLSX.writeFile(workbook, "sales_report.xlsx");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Sales Report", 20, 10);
    doc.autoTable({
      head: [["Medicine Name", "Seller Email", "Buyer Email", "Total Price"]],
      body: filteredReport.map((sale) => [
        sale.medicineName,
        sale.sellerEmail,
        sale.buyerEmail,
        `$${sale.totalPrice}`,
      ]),
    });
    doc.save("sales_report.pdf");
  };

  if (!filteredReport || filteredReport.length === 0) {
    return <div>No sales report data available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Sales Report</h2>
      <div className="mb-4">
        <RangePicker onChange={handleDateChange} />
      </div>
      <div className="mb-4 flex space-x-2">
        <Button onClick={downloadCSV}>Download CSV</Button>
        <Button onClick={downloadXLSX}>Download XLSX</Button>
        <Button onClick={downloadPDF}>Download PDF</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Medicine Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Seller Email
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Buyer Email
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Total Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredReport.map((sale, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {sale.medicineName}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {sale.sellerEmail}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {sale.buyerEmail}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  ${sale.totalPrice}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesReport;
