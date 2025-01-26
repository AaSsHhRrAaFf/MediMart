import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../../Context/AuthContext";
import { Dialog } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const ManageMedicines = ({ medicines }) => {
  console.log("ManageMedicines: Medicines data received:", medicines);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const queryClient = useQueryClient();

  const handleCategoryChange = (e) => {
    setValue("category", e.target.value);
  };

  const handleMassUnitChange = (e) => {
    setValue("massUnit", e.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    reset();
  };

  const { mutate: addMedicine, isLoading: isAddingMedicine } = useMutation({
    mutationFn: async (data) => {
      const medicineId = uuidv4();
      console.log("Data from mutation function:", data);
      const response = await api.post("/api/medicines/add", {
        medicines: [
          {
            ...data,
            medicineId,
            sellerEmail: user.email,
            advertiseStatus: false,
          },
        ],
      });
      return response;
    },
    onSuccess: () => {
      toast.success("Medicine added successfully", {
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
      console.error("Error adding medicine:", error);
      toast.error("Failed to add medicine", {
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
  });

  const handleAddMedicine = (data) => {
    console.log("ManageMedicines: Adding new medicine:", data);
    addMedicine(data);
  };

  if (!medicines || medicines.length === 0) {
    return <div>No medicines available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Medicines</h2>
      <div className="mb-4">
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Medicine
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Item Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Generic Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Description
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Category
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Company
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Mass Unit
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Per Unit Price
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Discount
              </th>
            </tr>
          </thead>
          <tbody>
            {medicines?.map((medicine) => (
              <tr key={medicine.medicineId} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.name}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.genericName}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.description}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.category}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.company}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.massUnit}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.pricePerUnit}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {medicine.discount}
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
              Add New Medicine
            </Dialog.Title>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(handleAddMedicine)}
            >
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Name
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Item name is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Generic Name
                </label>
                <input
                  type="text"
                  {...register("genericName", {
                    required: "Generic name is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.genericName && (
                  <p className="text-red-500 text-sm">
                    {errors.genericName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Short Description
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URL
                </label>
                <input
                  type="text"
                  {...register("image", { required: "Image URL is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue="tablet"
                >
                  <option value="tablet">Tablet</option>
                  <option value="syrup">Syrup</option>
                  <option value="capsule">Capsule</option>
                  <option value="injection">Injection</option>
                  <option value="others">Others</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company
                </label>
                <input
                  type="text"
                  {...register("company", { required: "Company is required" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.company && (
                  <p className="text-red-500 text-sm">
                    {errors.company.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Item Mass Unit
                </label>
                <select
                  {...register("massUnit", {
                    required: "Mass Unit is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  defaultValue="mg"
                >
                  <option value="mg">mg</option>
                  <option value="ml">ml</option>
                </select>
                {errors.massUnit && (
                  <p className="text-red-500 text-sm">
                    {errors.massUnit.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Per Unit Price
                </label>
                <input
                  type="number"
                  {...register("pricePerUnit", {
                    required: "Per Unit Price is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.pricePerUnit && (
                  <p className="text-red-500 text-sm">
                    {errors.pricePerUnit.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Discount Percentage
                </label>
                <input
                  type="number"
                  {...register("discount", {
                    required: "Discount percentage is required",
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                {errors.discount && (
                  <p className="text-red-500 text-sm">
                    {errors.discount.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  disabled={isAddingMedicine}
                >
                  Add Medicine
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default ManageMedicines;
