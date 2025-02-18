// import React, { useState } from "react";
// import Modal from "react-modal";
// import { useQuery } from "@tanstack/react-query";
// import api from "../services/api";
// import { useCart } from "../Context/CartContext";
// import LoadSpinner from "../Components/Shared/LoadSpinner";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { Helmet } from "react-helmet-async";

// const ShopPage = () => {
//   const [selectedMedicine, setSelectedMedicine] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { cartItems, addToCart } = useCart();

//   const notify = (message) =>
//     toast.warn(message, {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });

//   const {
//     data: medicines,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["medicines"],
//     queryFn: async () => {
//       const res = await api.get("/api/medicines/all");
//       return res.data;
//     },
//   });
//   if (isLoading) {
//     return <LoadSpinner />;
//   }

//   const openModal = (medicine) => {
//     setSelectedMedicine(medicine);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setSelectedMedicine(null);
//     setIsModalOpen(false);
//   };

//   const handleAddToCart = (medicine) => {
//     const isMedicineInCart = cartItems.some(
//       (item) => item.medicineId === medicine.medicineId
//     );
//     if (isMedicineInCart) {
//       notify("Medicine already in cart");
//       return;
//     }
//     addToCart(medicine);
//     toast.success("Medicine added to cart!", {
//       position: "top-center",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//       theme: "light",
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <Helmet>
//         <title>Shop</title>
//       </Helmet>
//       <h1 className="text-3xl font-bold text-center mb-6">Shop Medicines</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-200">
//               <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-900">
//                 Name
//               </th>
//               <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-900">
//                 Category
//               </th>
//               <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-900">
//                 Description
//               </th>
//               <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-900">
//                 Price
//               </th>
//               <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-900">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {medicines?.map((medicine) => (
//               <tr key={medicine.medicineId} className="hover:bg-gray-100">
//                 <td className="px-6 py-4 border-b text-sm text-gray-700">
//                   {medicine.name}
//                 </td>
//                 <td className="px-6 py-4 border-b text-sm text-gray-700">
//                   {medicine.category}
//                 </td>
//                 <td className="px-6 py-4 border-b text-sm text-gray-700">
//                   {medicine.description}
//                 </td>
//                 <td className="px-6 py-4 border-b text-sm text-gray-700">
//                   ${medicine.pricePerUnit}
//                 </td>
//                 <td className="px-6 py-4 border-b text-sm text-center">
//                   <button
//                     onClick={() => openModal(medicine)}
//                     className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Eye
//                   </button>
//                   <button
//                     onClick={() => handleAddToCart(medicine)}
//                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     Select
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {selectedMedicine && (
//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={closeModal}
//           contentLabel="Medicine Details"
//           className="fixed inset-0 bg-white shadow-lg max-w-md mx-auto my-10 p-6 rounded"
//           overlayClassName="fixed inset-0 bg-black bg-opacity-50"
//         >
//           <h2 className="text-xl font-bold mb-4">{selectedMedicine.name}</h2>
//           <img
//             src={selectedMedicine.image}
//             alt={selectedMedicine.name}
//             className="w-full h-2/3 object-cover mb-4"
//           />
//           <p>
//             <strong>Description:</strong> {selectedMedicine.description}
//           </p>
//           <p>
//             <strong>Category:</strong> {selectedMedicine.category}
//           </p>
//           <p>
//             <strong>Price:</strong> ${selectedMedicine.pricePerUnit}
//           </p>

//           <button
//             onClick={closeModal}
//             className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
//           >
//             Close
//           </button>
//         </Modal>
//       )}
//     </div>
//   );
// };

// export default ShopPage;

import React, { useState } from "react";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useCart } from "../Context/CartContext";
import LoadSpinner from "../Components/Shared/LoadSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet-async";
import {
  FiEye,
  FiShoppingCart,
  FiX,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";

const ShopPage = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const { cartItems, addToCart } = useCart();

  const notify = (message) =>
    toast.warn(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const {
    data: medicines,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await api.get("/api/medicines/all");
      return res.data;
    },
  });

  const getSortedMedicines = () => {
    if (!medicines) return [];

    return [...medicines].sort((a, b) => {
      if (sortOrder === "price_asc") return a.pricePerUnit - b.pricePerUnit;
      if (sortOrder === "price_desc") return b.pricePerUnit - a.pricePerUnit;
      return 0;
    });
  };

  const sortedMedicines = getSortedMedicines();

  const openModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMedicine(null);
    setIsModalOpen(false);
  };

  const handleAddToCart = (medicine) => {
    const isMedicineInCart = cartItems.some(
      (item) => item.medicineId === medicine.medicineId
    );
    if (isMedicineInCart) {
      notify("Medicine already in cart");
      return;
    }
    addToCart(medicine);
    toast.success("Medicine added to cart!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  if (isLoading) return <LoadSpinner />;
  if (isError)
    return <div className="text-center py-8">Error loading medicines</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      <Helmet>
        <title>Shop Medicines - PharmaStore</title>
        <meta
          name="description"
          content="Browse and purchase quality medicines from verified suppliers"
        />
      </Helmet>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Shop Medicines
        </h1>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="text-sm text-gray-600">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 border rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-48"
          >
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Mobile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:hidden">
        {sortedMedicines?.map((medicine) => (
          <div
            key={medicine.medicineId}
            className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800 truncate">
                {medicine.name}
              </h3>
              <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                ${medicine.pricePerUnit}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {medicine.description}
            </p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {medicine.category}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => openModal(medicine)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  aria-label="View details"
                >
                  <FiEye className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleAddToCart(medicine)}
                  className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                  aria-label="Add to cart"
                >
                  <FiShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow-sm">
        <table className="w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Name",
                "Category",
                "Description",
                <div key="price" className="flex items-center gap-1">
                  Price
                  {sortOrder === "price_asc" && (
                    <FiArrowUp className="w-4 h-4" />
                  )}
                  {sortOrder === "price_desc" && (
                    <FiArrowDown className="w-4 h-4" />
                  )}
                </div>,
                "Actions",
              ].map((header, index) => (
                <th
                  key={typeof header === "string" ? header : header.key}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedMedicines?.map((medicine) => (
              <tr
                key={medicine.medicineId}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-gray-800 max-w-[200px] truncate">
                  {medicine.name}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {medicine.category}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 max-w-[300px] line-clamp-2">
                  {medicine.description}
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">
                  ${medicine.pricePerUnit}
                </td>
                <td className="px-4 py-3 text-sm text-center space-x-2">
                  <button
                    onClick={() => openModal(medicine)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                  >
                    <FiShoppingCart className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Medicine Details"
        className="bg-white rounded-lg shadow-xl mx-4 my-12 sm:mx-auto sm:my-20 p-6 max-w-2xl w-[calc(100%-2rem)]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        ariaHideApp={false}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {selectedMedicine?.name}
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={selectedMedicine?.image}
              alt={selectedMedicine?.name}
              className="w-full h-full object-contain p-4"
              loading="lazy"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <p className="text-gray-900">{selectedMedicine?.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="text-gray-900 whitespace-pre-line">
                {selectedMedicine?.description}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Price</h3>
              <p className="text-xl font-semibold text-gray-900">
                ${selectedMedicine?.pricePerUnit}
              </p>
            </div>
            <button
              onClick={() => {
                handleAddToCart(selectedMedicine);
                closeModal();
              }}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <FiShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ShopPage;
