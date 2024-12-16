import React from "react";
import { Card, CardContent } from "./ui/card";
import { Star, Package, Shield } from "lucide-react";
const categories = [
  {
    name: "Limpieza del Hogar",
    description: "Productos especializados para mantener tu casa impecable",
    icon: <Star className="w-8 h-8 text-red-500" />,
  },
  {
    name: "Artículos de Bazar",
    description: "Todo lo que necesitas para tu hogar en un solo lugar",
    icon: <Package className="w-8 h-8 text-red-500" />,
  },
  {
    name: "Productos Especiales",
    description: "Soluciones específicas para necesidades únicas",
    icon: <Shield className="w-8 h-8 text-red-500" />,
  },
];

const CategoriesSection = () => {
  return (
    <div className=" bg-[#edede9] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-12">
          Nuestras Categorías
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
