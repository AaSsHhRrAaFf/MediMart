import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import api from "../services/api";
import { useCart } from "../Context/CartContext";
import ReactModal from "react-modal";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    data: medicines,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["medicines", categoryName],
    queryFn: async () => {
      if (!user) {
        navigate("/login");
      }
      const res = await api.get(`/api/medicines/category/${categoryName}`);
      console.log(res);
      return res.data;
    },
  });

  if (isLoading) {
    return <div>Loading medicines...</div>;
  }

  if (isError) {
    return <div>Error loading medicines</div>;
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
    addToCart(medicine);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Helmet>
        <title>Category Details</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        {categoryName} Medicines
      </h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Company
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Price
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {medicines?.map((medicine) => (
              <tr key={medicine.medicineId}>
                <td className="px-6 py-4 border-b text-sm text-gray-800">
                  {medicine.name}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-800">
                  {medicine.company}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-800">
                  ${medicine.pricePerUnit}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-800">
                  <button
                    onClick={() => openModal(medicine)}
                    className="mr-2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600"
                  >
                    Eye
                  </button>
                  <button
                    onClick={() => handleAddToCart(medicine)}
                    className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded hover:bg-green-600"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && selectedMedicine && (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Medicine Details"
          className="fixed inset-0 bg-white shadow-lg max-w-md mx-auto my-10 p-6 rounded"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">{selectedMedicine.name}</h2>
            <img
              src={selectedMedicine.image}
              alt={selectedMedicine.name}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <p className="text-sm text-gray-700 mb-2">
              <strong>Description:</strong> {selectedMedicine.description}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Generic Name:</strong> {selectedMedicine.genericName}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Company:</strong> {selectedMedicine.company}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Price:</strong> ${selectedMedicine.pricePerUnit}
            </p>
          </div>
        </ReactModal>
      )}
    </div>
  );
};

export default CategoryDetails;
