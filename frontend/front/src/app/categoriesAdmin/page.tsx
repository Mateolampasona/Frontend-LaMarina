"use client";

import { useState, useEffect } from "react";
import type { ICreateCategory, IModifyCategory } from "@/interfaces/ICategory";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";
import { motion, AnimatePresence } from "framer-motion";
import { PlusCircle } from "lucide-react";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function AdminCategories() {
  const [categories, setCategories] = useState<ICreateCategory[]>([]);
  const [editingCategory, setEditingCategory] =
    useState<ICreateCategory | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${APIURL}/categories`);
      if (!response.ok) throw new Error("Error al obtener categorías");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
      setError(
        "No se pudieron obtener las categorías. Por favor, intente de nuevo."
      );
    }
  };

  const createCategory = async (category: ICreateCategory) => {
    try {
      const response = await fetch(`${APIURL}/categories/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear categoría");
      }
      fetchCategories();
      setSuccess("¡Categoría creada exitosamente!");
      setIsFormVisible(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error al crear categoría:", error);
      setError(`Error al crear categoría: ${(error as Error).message}`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const updateCategory = async (id: string, category: IModifyCategory) => {
    try {
      const response = await fetch(`${APIURL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!response.ok) throw new Error("Error al actualizar categoría");
      fetchCategories();
      setEditingCategory(null);
      setSuccess("¡Categoría actualizada exitosamente!");
      setIsFormVisible(false);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error al actualizar categoría:", error);
      setError(`Error al actualizar categoría: ${(error as Error).message}`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const response = await fetch(`${APIURL}/categories/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Error al eliminar categoría");
      fetchCategories();
      setSuccess("¡Categoría eliminada exitosamente!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      setError(`Error al eliminar categoría: ${(error as Error).message}`);
      setTimeout(() => setError(null), 3000);
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
                        updateCategory(editingCategory.name, category)
                    : createCategory
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
          onEdit={(category) => {
            setEditingCategory(category);
            setIsFormVisible(true);
          }}
          onDelete={deleteCategory}
        />
      </div>
    </motion.div>
  );
}
