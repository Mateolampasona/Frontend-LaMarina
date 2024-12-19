"use client";
import { useState } from "react";
import { IProduct } from "@/interfaces/IProduct";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import Image from "next/image";
import { Eye, ShoppingCart, Heart } from "lucide-react";
import Loading from "@/Components/Loading";

interface ProductCardProps {
  products: IProduct[];
}

export function ProductCard({ products }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <Card
          key={product.id}
          className="w-full max-w-sm group bg-gray-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg overflow-hidden"
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="mr-2 bg-white/80 hover:bg-[#ef233c] hover:text-white transition-colors duration-200"
                aria-label="Ver detalles"
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="bg-white/80 hover:bg-[#ef233c] hover:text-white transition-colors duration-200"
                aria-label="Añadir al carrito"
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-[#ef233c] transition-colors duration-200">
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.description}
            </p>
            <p className="text-xl font-bold text-[#ef233c]">
              ${product.price.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white transition-colors duration-200 group relative overflow-hidden">
              <span className="relative z-10">Añadir al carrito</span>
              <span className="absolute inset-0 bg-[#d90429] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
