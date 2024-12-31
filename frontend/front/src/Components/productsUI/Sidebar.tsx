"use client";

import { useState } from "react";
import { Slider } from "@/Components/ui/slider";
import { ICategory } from "@/interfaces/IProducts";

interface SidebarProps {
  categories: ICategory[];
  onCategoryChange: (categoryId: number) => void;
  onPriceRangeChange: (range: [number, number]) => void;
}

export default function Sidebar({
  categories,
  onCategoryChange,
  onPriceRangeChange,
}: SidebarProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);

  const handleCategoryChange = (categoryId: number) => {
    const newSelectedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(newSelectedCategories);
    onCategoryChange(categoryId);
  };

  const handlePriceChange = (newRange: number[]) => {
    setPriceRange(newRange as [number, number]);
    onPriceRangeChange(newRange as [number, number]);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
      <div>
        <h3 className="text-lg font-mono font-semibold mb-4">Categorías</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <label
              key={category.categoryId}
              className="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.categoryId)}
                onChange={() => handleCategoryChange(category.categoryId)}
                className="rounded border-gray-300 text-[#ef233c] focus:ring-[#ef233c]"
              />
              <span className="text-gray-700 text-sm">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-mono font-semibold mb-4">Precio</h3>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceChange}
          className="mt-2"
        />
        <div className="flex justify-between mt-2 text-sm text-gray-800">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
