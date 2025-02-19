// import React, { useState, useEffect } from "react";
// import { DatePicker, Button } from "antd";
// import { saveAs } from "file-saver";
// import * as XLSX from "xlsx";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const { RangePicker } = DatePicker;

// const SalesReport = ({ salesReport }) => {
//   const [dateRange, setDateRange] = useState(null);
//   const [filteredReport, setFilteredReport] = useState(salesReport);

//   useEffect(() => {
//     if (dateRange) {
//       const [start, end] = dateRange;
//       const filtered = salesReport.filter((sale) => {
//         const saleDate = new Date(sale.paymentDate);
//         return saleDate >= start && saleDate <= end;
//       });
//       setFilteredReport(filtered);
//     } else {
//       setFilteredReport(salesReport);
//     }
//   }, [dateRange, salesReport]);

//   const handleDateChange = (dates) => {
//     setDateRange(dates);
//   };

//   const downloadCSV = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredReport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
//     const csvData = XLSX.write(workbook, { bookType: "csv", type: "array" });
//     saveAs(new Blob([csvData], { type: "text/csv" }), "sales_report.csv");
//   };

//   const downloadXLSX = () => {
//     const worksheet = XLSX.utils.json_to_sheet(filteredReport);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Report");
//     XLSX.writeFile(workbook, "sales_report.xlsx");
//   };

//   const downloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text("Sales Report", 20, 10);
//     doc.autoTable({
//       head: [["Medicine Name", "Seller Email", "Buyer Email", "Total Price"]],
//       body: filteredReport.map((sale) => [
//         sale.medicineName,
//         sale.sellerEmail,
//         sale.buyerEmail,
//         `$${sale.totalPrice}`,
//       ]),
//     });
//     doc.save("sales_report.pdf");
//   };

//   if (!filteredReport || filteredReport.length === 0) {
//     return <div>No sales report data available.</div>;
//   }

//   return (
//     <div className="bg-white rounded-lg shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">Sales Report</h2>
//       <div className="mb-4">
//         <RangePicker onChange={handleDateChange} />
//       </div>
//       <div className="mb-4 flex space-x-2">
//         <Button onClick={downloadCSV}>Download CSV</Button>
//         <Button onClick={downloadXLSX}>Download XLSX</Button>
//         <Button onClick={downloadPDF}>Download PDF</Button>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
//                 Medicine Name
//               </th>
//               <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
//                 Seller Email
//               </th>
//               <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
//                 Buyer Email
//               </th>
//               <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
//                 Total Price
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredReport.map((sale, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-6 py-4 border-b text-sm text-gray-700">
//                   {sale.medicineName}
//                 </td>
//                 <td className="px-6 py-4 border-b text-sm text-gray-700">
//                   {sale.sellerEmail}
//                 </td>
//                 <td className="px-6 py-4 border-b text-sm text-gray-700">
//                   {sale.buyerEmail}
//                 </td>
//                 <td className="px-6 py-4 border-b text-sm text-gray-700">
//                   ${sale.totalPrice}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SalesReport;

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
    <div className="bg-white rounded-lg shadow p-4 md:p-6 w-full">
      <h2 className="text-lg md:text-xl font-semibold mb-4">Sales Report</h2>

      {/* Responsive date picker */}
      <div className="mb-4 w-full">
        <RangePicker
          onChange={handleDateChange}
          className="w-full sm:w-auto"
          style={{ maxWidth: "100%" }}
        />
      </div>

      {/* Responsive buttons */}
      <div className="mb-4 flex flex-wrap gap-2">
        <Button onClick={downloadCSV} className="text-sm">
          Download CSV
        </Button>
        <Button onClick={downloadXLSX} className="text-sm">
          Download XLSX
        </Button>
        <Button onClick={downloadPDF} className="text-sm">
          Download PDF
        </Button>
      </div>

      {/* Responsive table */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="inline-block min-w-full align-middle">
          <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Medicine Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Seller Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Buyer Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-2 md:px-6 md:py-3 text-left text-xs md:text-sm font-medium text-gray-700 uppercase tracking-wider"
                  >
                    Total Price
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredReport.map((sale, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                      {sale.medicineName}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 truncate max-w-xs">
                      {sale.sellerEmail}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700 truncate max-w-xs">
                      {sale.buyerEmail}
                    </td>
                    <td className="px-3 py-2 md:px-6 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-700">
                      ${sale.totalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Small screen alternative view */}
      <div className="mt-4 sm:hidden">
        <p className="text-xs text-gray-500 italic">
          Scroll horizontally to view all columns
        </p>
      </div>
    </div>
  );
};

export default SalesReport;
