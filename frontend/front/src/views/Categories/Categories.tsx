import {
  Boxes,
  Shirt,
  SprayCanIcon as Spray,
  Package,
  Bug,
  Droplets,
  Trash2,
  ShoppingBag,
  Smile,
  Baby,
  Lightbulb,
  UtensilsCrossed,
  Car,
  Dumbbell,
  Palette,
  Headphones,
  Gamepad2,
  Book,
  Plane,
  PawPrint,
} from "lucide-react";

import { Card, CardContent } from "@/Components/ui/card";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Limpieza del hogar",
    href: "#",
    icon: Boxes,
    color: "text-blue-500",
  },
  {
    id: 2,
    name: "Cuidado de la ropa",
    href: "#",
    icon: Shirt,
    color: "text-purple-500",
  },
  {
    id: 3,
    name: "Aromatización ambiental",
    href: "#",
    icon: Spray,
    color: "text-green-500",
  },
  {
    id: 4,
    name: "Descartables",
    href: "#",
    icon: Package,
    color: "text-orange-500",
  },
  { id: 5, name: "Insecticidas", href: "#", icon: Bug, color: "text-red-500" },
  {
    id: 6,
    name: "Desinfección",
    href: "#",
    icon: Droplets,
    color: "text-cyan-500",
  },
  { id: 7, name: "Residuos", href: "#", icon: Trash2, color: "text-gray-500" },
  {
    id: 8,
    name: "Bazar",
    href: "#",
    icon: ShoppingBag,
    color: "text-pink-500",
  },
  {
    id: 9,
    name: "Belleza y cuidado personal",
    href: "#",
    icon: Smile,
    color: "text-yellow-500",
  },
  { id: 10, name: "Bebés", href: "#", icon: Baby, color: "text-indigo-500" },
  {
    id: 11,
    name: "Electrónica e iluminación",
    href: "#",
    icon: Lightbulb,
    color: "text-amber-500",
  },
  {
    id: 12,
    name: "Cocina",
    href: "#",
    icon: UtensilsCrossed,
    color: "text-red-400",
  },
  { id: 13, name: "Automotor", href: "#", icon: Car, color: "text-blue-600" },
  {
    id: 14,
    name: "Deportes",
    href: "#",
    icon: Dumbbell,
    color: "text-green-600",
  },
  {
    id: 15,
    name: "Arte y manualidades",
    href: "#",
    icon: Palette,
    color: "text-purple-400",
  },
  {
    id: 16,
    name: "Música",
    href: "#",
    icon: Headphones,
    color: "text-pink-600",
  },
  {
    id: 17,
    name: "Videojuegos",
    href: "#",
    icon: Gamepad2,
    color: "text-indigo-400",
  },
  { id: 18, name: "Libros", href: "#", icon: Book, color: "text-yellow-600" },
  { id: 19, name: "Viajes", href: "#", icon: Plane, color: "text-blue-400" },
  {
    id: 20,
    name: "Mascotas",
    href: "#",
    icon: PawPrint,
    color: "text-green-400",
  },
];

export default function CategoriesGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Link
            href={`/category/${encodeURIComponent(category.name)}`}
            key={category.id}
          >
            <Card
              key={category.id}
              className="group hover:shadow-lg transition-shadow bg-white"
            >
              <CardContent className="p-4">
                <a
                  href={category.href}
                  className="flex flex-col items-center gap-3"
                >
                  <div
                    className={`p-3 rounded-full bg-gray-50 group-hover:bg-[#e5e5e1] transition-colors ${category.color}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-center font-medium text-sm text-gray-900">
                    {category.name}
                  </span>
                </a>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
