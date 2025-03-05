"use client";

import React, { useState, useEffect } from 'react';
import type {
  ICreateProduct,
  IUpdateproduct,
  IProduct,
} from "@/interfaces/IProducts";

interface ProductFormProps {
  onSubmit: (data: ICreateProduct | IUpdateproduct) => void;
  initialData?: IProduct | null;
  onCancel: () => void;
}

const ProductForm = ({ onSubmit, initialData, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState<ICreateProduct>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category_id: 0,
    isActive: true,
  });

  const [imageUrl, setImageUrl] = useState<string>();

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        stock: initialData.stock,
        category_id: initialData.category_id.categoryId,
        isActive: initialData.isActive,
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | number | boolean = value;

    if (type === 'checkbox') {
      newValue = (e.target as HTMLInputElement).checked;
    } else if (name === 'price' || name === 'stock' || name === 'category_id') {
      newValue = Number(value);
      if (isNaN(newValue) || newValue <= 0) {
        alert(`${name} must be a positive number`);
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImageUrl(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData });
    setFormData({
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category_id: 0,
      isActive: true,
    });
    setImageUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg px-6 pt-4 pb-6 mb-4 max-w-xl mx-auto border border-gray-200"
    >
      <div className="grid gap-4 mb-4">
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1 uppercase tracking-wide"
            htmlFor="name"
          >
            Nombre del Producto
          </label>
          <input
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1 uppercase tracking-wide"
            htmlFor="description"
          >
            Descripción
          </label>
          <textarea
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 min-h-[80px]"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 uppercase tracking-wide"
              htmlFor="price"
            >
              Precio
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              id="price"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-700 text-sm font-bold mb-1 uppercase tracking-wide"
              htmlFor="stock"
            >
              Existencias
            </label>
            <input
              className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
              id="stock"
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-1 uppercase tracking-wide"
            htmlFor="category_id"
          >
            Categoría
          </label>
          <input
            className="shadow-sm appearance-none border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
            id="category_id"
            type="number"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700 text-sm font-bold uppercase tracking-wide">
              Activo
            </span>
          </label>
        </div>
        <div className="mb-3">
          <label
            className="block text-gray-700 text-sm font-bold mb-2 uppercase tracking-wide"
            htmlFor="image"
          >
            Imagen del Producto
          </label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="file"
                id="image"
                name="imageUrl"
                onChange={handleImageChange}
                accept="image/*"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  cursor-pointer"
              />
            </div>
            {imageUrl && (
              <div className="w-20 h-20 relative">
                <img
                  src={imageUrl}
                  alt="Vista previa"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-3">
        {initialData && (
          <button
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
            type="button"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none"
          type="submit"
        >
          {initialData ? "Actualizar" : "Crear"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
