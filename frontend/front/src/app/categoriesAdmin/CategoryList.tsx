"use client";

import { ICategory } from "@/interfaces/IProducts";
import { motion, AnimatePresence } from "framer-motion";
import { Edit2, Trash2 } from "lucide-react";

interface CategoryListProps {
  categories: ICategory[];
  onEdit: (category: ICategory) => void;
  onDelete: (id: number) => void;
}
export default function CategoryList({
  categories,
  onEdit,
  onDelete,
}: CategoryListProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-[#ef233c]">
        Lista de Categorías
      </h2>
      <div className="space-y-4">
        <AnimatePresence mode="wait" initial={false}>
          {categories.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-gray-500 text-center py-4 text-lg"
            >
              No hay categorías disponibles
            </motion.p>
          ) : (
            categories.map((category) => (
              <motion.div
                key={category.categoryId || `category-${category.name}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="bg-[#edede9] rounded-lg p-4 hover:shadow-md transition-all duration-200"
              >
                <h3 className="text-xl font-semibold font-mono mb-2 text-gray-800">
                  {category.name}
                </h3>
                <p className="text-gray-800 mb-3 text-sm">
                  {category.description}
                </p>
                <div className="flex justify-end space-x-2">
                  <motion.button
                    onClick={() => onEdit(category)}
                    className="text-[#ef233c] hover:text-[#d90429] p-1 rounded-full hover:bg-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit2 size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => onDelete(category.categoryId)}
                    className="text-gray-600 hover:text-[#ef233c] p-1 rounded-full hover:bg-white transition-all duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
