// src/Pages/Dashboard/Admin/ManageCategory.jsx
import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import api from "../../../services/api";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";

const ManageCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    categoryImage: "",
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const { data: categories, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/api/categories/all");
      return res.data;
    },
  });

  const handleUpdateCategory = async (categoryId) => {
    console.log("ManageCategory: Updating category:", categoryId);
    setEditingCategory(
      categories?.find((category) => category.categoryId === categoryId)
    );
    setIsModalOpen(true);
  };

  const handleConfirmUpdate = async () => {
    try {
      const response = await api.patch(
        `/api/categories/update/${editingCategory.categoryId}`,
        {
          categoryName: editingCategory.categoryName,
          categoryImage: editingCategory.categoryImage,
        }
      );

      if (response.status === 200) {
        toast.success("Category updated successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setEditingCategory(null);
        refetch();
      } else {
        toast.error("Failed to update category", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Failed to update category", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsModalOpen(false);
      setNewCategory({ categoryName: "", categoryImage: "" });
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    console.log("ManageCategory: Deleting category:", categoryId);
    try {
      const response = await api.delete(`/api/categories/delete/${categoryId}`);
      if (response.status === 200) {
        toast.success("Category deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
      } else {
        toast.error("Failed to delete category", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleAddCategory = async () => {
    try {
      const categoryId = uuidv4();
      const response = await api.post("/api/categories/add", {
        categories: [
          {
            ...newCategory,
            categoryId,
            medicineCount: 0,
          },
        ],
      });
      if (response.status === 201) {
        toast.success("Category added successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        refetch();
      } else {
        toast.error("Failed to add category", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsModalOpen(false);
      setNewCategory({ categoryName: "", categoryImage: "" });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory((prevCategory) => ({
      ...prevCategory,
      [name]: value,
    }));
    if (editingCategory) {
      setEditingCategory((prevCategory) => ({
        ...prevCategory,
        [name]: value,
      }));
    }
  };

  if (!categories || categories.length === 0) {
    return <div>No categories available.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Manage Category</h2>
      <div className="mb-4">
        <Button
          type="primary"
          onClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Category Name
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Category Image
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-700 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.categoryId} className="hover:bg-gray-50">
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  {category.categoryName}
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4 border-b text-sm text-gray-700">
                  <Button
                    className="mr-2"
                    type="primary"
                    size="small"
                    onClick={() => handleUpdateCategory(category.categoryId)}
                  >
                    Update
                  </Button>
                  <Button
                    type="danger"
                    size="small"
                    onClick={() => handleDeleteCategory(category.categoryId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        title={editingCategory ? "Update Category" : "Add New Category"}
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          setNewCategory({ categoryName: "", categoryImage: "" });
          setEditingCategory(null);
        }}
        onOk={editingCategory ? handleConfirmUpdate : handleAddCategory}
      >
        <Input
          placeholder="Category Name"
          name="categoryName"
          value={editingCategory?.categoryName || newCategory.categoryName}
          onChange={handleInputChange}
          className="mb-3"
        />
        <Input
          placeholder="Category Image URL"
          name="categoryImage"
          value={editingCategory?.categoryImage || newCategory.categoryImage}
          onChange={handleInputChange}
        />
      </Modal>
    </div>
  );
};

export default ManageCategory;
