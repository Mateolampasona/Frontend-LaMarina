"use client";

import { useState, useEffect } from "react";
import type {
  Category,
  ICreateCategory,
  IModifyCategory,
} from "@/interfaces/ICategory";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle } from "lucide-react";
import Cookies from "js-cookie";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  modifyCategory,
} from "@/helpers/categories.helper";
import Swal from "sweetalert2";
import { ICategory } from "@/interfaces/IProducts";

export default function AdminCategories() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const token = Cookies.get("accessToken");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      Swal.fire({
        icon: "error",
        title: "Error al obtener categorías",
        text: (error as Error).message,
      });
    }
  };

  const createCategoryHandler = async (category: ICreateCategory) => {
    if (!token) {
      console.error("No token found");
      return;
    }
    const parsedToken = JSON.parse(token);
    if (typeof parsedToken !== "string") {
      throw new Error("Invalid token format");
    }
    try {
      const response = await createCategory(parsedToken, category);
      console.log(response);

      fetchCategories();
      setSuccess("¡Categoría creada exitosamente!");
      setIsFormVisible(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      Swal.fire({
        icon: "error",
        title: "Error al crear categoría",
        text: (error as Error).message,
      });
    }
  };

  const updateCategoryHandler = async (
    id: number,
    category: IModifyCategory
  ) => {
    console.log("category", category);
    console.log("id", id);
    if (!token) {
      console.error("No token found");
      return;
    }
    const parsedToken = JSON.parse(token);
    if (typeof parsedToken !== "string") {
      throw new Error("Invalid token");
    }
    try {
      const response = await modifyCategory(parsedToken, id, category);
      console.log(response);
      fetchCategories();
      setEditingCategory(null);
      setSuccess("¡Categoría actualizada exitosamente!");
      setIsFormVisible(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al actualizar categoría",
        text: (error as Error).message,
      });
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteCategoryHandler = async (id: number) => {
    console.log(id);
    if (!token) {
      console.error("No token found");
      return;
    }
    const parsedToken = JSON.parse(token);
    if (typeof parsedToken !== "string") {
      throw new Error("Invalid token");
    }
    try {
      const response = await deleteCategory(parsedToken, id);
      console.log("response", response);
      if (response.ok) {
        fetchCategories();
        setEditingCategory(null);
        setSuccess("¡Categoría eliminada exitosamente!");
        setIsFormVisible(false);
        setTimeout(() => setSuccess(null), 3000);
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar categoría",
        text: (error as Error).message,
        timer: 1500,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#edede9] text-gray-800 p-4 md:p-8"
    >
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md mb-6"
            role="alert"
          >
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-lg shadow-md mb-6"
            role="alert"
          >
            <p className="font-bold">Éxito</p>
            <p>{success}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify mb-6">
        <motion.button
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setEditingCategory(null);
          }}
          className="bg-[#ef233c] text-white py-2 px-4 rounded-lg text-lg font-semibold hover:bg-[#d90429] transition-all duration-200 flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle className="mr-2" size={20} />
          {isFormVisible ? "Cerrar Formulario" : "Crear Categoría"}
        </motion.button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence mode="wait">
          {isFormVisible && (
            <motion.div
              key={editingCategory ? "edit" : "create"}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CategoryForm
                onSubmit={
                  editingCategory
                    ? (category) =>
                        updateCategoryHandler(
                          editingCategory.categoryId,
                          category
                        )
                    : createCategoryHandler
                }
                initialData={editingCategory}
                onCancel={() => {
                  setIsFormVisible(false);
                  setEditingCategory(null);
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <CategoryList
          categories={categories}
          onEdit={(category: ICategory) => {
            setEditingCategory(category);
            setIsFormVisible(true);
          }}
          onDelete={deleteCategoryHandler}
        />
      </div>
    </motion.div>
  );
}
