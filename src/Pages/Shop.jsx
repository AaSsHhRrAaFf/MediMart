import React, { useState } from "react";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import { useCart } from "../Context/CartContext";
import LoadSpinner from "../Components/Shared/LoadSpinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShopPage = () => {
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  if (isLoading) {
    return <LoadSpinner />;
  }

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

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Shop Medicines</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-900">
                Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-900">
                Category
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-900">
                Description
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-semibold text-gray-900">
                Price
              </th>
              <th className="px-6 py-3 border-b text-center text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {medicines?.map((medicine) => (
              <tr key={medicine.medicineId} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.name}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.category}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.description}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  ${medicine.pricePerUnit}
                </td>
                <td className="px-6 py-4 border-b text-sm text-center">
                  <button
                    onClick={() => openModal(medicine)}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Eye
                  </button>
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMedicine && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Medicine Details"
          className="fixed inset-0 bg-white shadow-lg max-w-md mx-auto my-10 p-6 rounded"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <h2 className="text-xl font-bold mb-4">{selectedMedicine.name}</h2>
          <img
            src={selectedMedicine.image}
            alt={selectedMedicine.name}
            className="w-full h-2/3 object-cover mb-4"
          />
          <p>
            <strong>Description:</strong> {selectedMedicine.description}
          </p>
          <p>
            <strong>Category:</strong> {selectedMedicine.category}
          </p>
          <p>
            <strong>Price:</strong> ${selectedMedicine.pricePerUnit}
          </p>

          <button
            onClick={closeModal}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default ShopPage;
