"use client";

import { useState, useEffect } from "react";
import type { ICreateCategory, IModifyCategory } from "@/interfaces/ICategory";
import { motion } from "framer-motion";
import { PlusCircle, Edit2, X } from "lucide-react";
import type React from "react";

interface CategoryFormProps {
  onSubmit: (category: ICreateCategory | IModifyCategory) => Promise<void>;
  initialData?: ICreateCategory | null;
  onCancel: () => void;
}

export default function CategoryForm({
  onSubmit,
  initialData,
  onCancel,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description);
    } else {
      setName("");
      setDescription("");
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (initialData) {
      onSubmit({ name, description } as IModifyCategory);
    } else {
      onSubmit({ id: Date.now(), name, description } as ICreateCategory);
    }
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
        <label htmlFor="name" className="block text-gray-700">
          Nombre
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef233c] focus:ring focus:ring-[#ef233c] focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700">
          Descripción
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ef233c] focus:ring focus:ring-[#ef233c] focus:ring-opacity-50"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-all duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-[#ef233c] text-white py-2 px-4 rounded-lg hover:bg-[#d90429] transition-all duration-200"
        >
          {initialData ? "Actualizar" : "Crear"}
        </button>
      </div>
    </motion.form>
  );
}
