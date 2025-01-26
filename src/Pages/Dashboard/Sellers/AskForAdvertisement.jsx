import React, { useState, useContext } from "react";
import { Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AskForAdvertisement = ({ advertisements }) => {
  console.log(
    "AskForAdvertisement: Advertisement data received:",
    advertisements
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { mutate: updateAdvertise, isLoading: isAddingAdvertise } = useMutation(
    {
      mutationFn: async (data) => {
        // Fetch all the medicines of the seller to be used in the slider.
        const allMedicines = await api.get(`/api/medicines/all`);
        const filteredMedicine = allMedicines.data.find(
          (medicine) =>
            medicine.image === data.medicineImage &&
            medicine.sellerEmail === user.email
        );
        console.log("filteredMedicine:", filteredMedicine);
        if (!filteredMedicine) {
          toast.error("Medicine not found for this image URL", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return;
        }
        const response = await api.patch(
          `/api/medicines/update-advertise/${filteredMedicine.medicineId}`,
          {
            advertiseStatus: true,
            description: data.description,
          }
        );
        console.log("response from mutation:", response);
        return response;
      },
      onSuccess: () => {
        toast.success("Advertisement requested successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        queryClient.invalidateQueries(["sellerDashboard"]);
      },
      onError: (error) => {
        console.error("Error adding advertise:", error);
        toast.error("Failed to request advertisement", {
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
      onSettled: () => {
        setIsModalOpen(false);
        reset();
      },
    }
  );

  const handleAddAdvertise = (data) => {
    console.log("AskForAdvertisement: Adding new advertisement:", data);
    updateAdvertise(data);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!advertisements || advertisements.length === 0) {
    return <div>No advertisement data available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Ask For Advertisement</h2>
      <div className="mb-4">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Advertise
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Medicine Image
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Description
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {advertisements?.map((advertise) => (
              <tr key={advertise.medicineId} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  <img
                    src={advertise.image}
                    alt={advertise.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {advertise.description}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {advertise.advertiseStatus ? "Added to Slider" : "Not Added"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        className="fixed inset-0 z-10 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-white shadow-lg max-w-md mx-auto my-10 rounded p-6">
            <Dialog.Title className="text-xl font-semibold mb-4">
              Add New Advertisement
            </Dialog.Title>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleAddAdvertise)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Medicine Image URL
                </label>
                <input
                  type="text"
                  {...register("medicineImage", {
                    required: "Image URL is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.medicineImage && (
                  <p className="text-red-500 text-sm">
                    {errors.medicineImage.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  {...register("description", {
                    required: "Description is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isAddingAdvertise}
                >
                  Add Advertise
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AskForAdvertisement;
