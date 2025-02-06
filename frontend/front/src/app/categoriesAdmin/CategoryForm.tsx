"use client";

import { useState, useEffect } from "react";
import type { ICreateCategory, IModifyCategory } from "@/interfaces/ICategory";
import { motion } from "framer-motion";
import { PlusCircle, Edit2, X } from "lucide-react";
import type React from "react";

interface CategoryFormProps {
  onSubmit: (category: ICreateCategory | IModifyCategory) => void;
  initialData?: ICreateCategory | null;
  onCancel: () => void;
}

export default function CategoryForm({
  onSubmit,
  initialData,
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [descriptrion, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.descriptrion);
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, descriptrion });
    if (!initialData) {
      setName("");
      setDescription("");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-lg relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-2 right-2 text-gray-500 hover:text-[#ef233c] transition-colors duration-200"
      >
        <X size={24} />
      </button>
      <h2 className="text-2xl font-bold mb-6 text-[#ef233c] flex items-center">
        {initialData ? (
          <Edit2 className="mr-2 text-[#ef233c]" size={24} />
        ) : (
          <PlusCircle className="mr-2 text-[#ef233c]" size={24} />
        )}
        {initialData ? "Modificar Categoría" : "Crear Nueva Categoría"}
      </h2>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-semibold text-gray-800 mb-1"
        >
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef233c] focus:border-transparent transition-all duration-200"
          required
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-semibold text-gray-800 mb-1"
        >
          Descripción
        </label>
        <textarea
          id="description"
          value={descriptrion}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#ef233c] focus:border-transparent transition-all duration-200"
          rows={3}
          required
        ></textarea>
      </div>
      <div className="flex justify-end space-x-3">
        <motion.button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancelar
        </motion.button>
        <motion.button
          type="submit"
          className="px-4 py-2 bg-[#ef233c] text-white rounded-md hover:bg-[#d90429] transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {initialData ? "Actualizar" : "Crear"}
        </motion.button>
      </div>
    </motion.form>
  );
}
