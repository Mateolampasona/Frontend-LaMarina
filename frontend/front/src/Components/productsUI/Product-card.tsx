"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/interfaces/IProducts";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  console.log('Product:', product); // Agregar este log para verificar las propiedades del producto
  const hasDiscount = product.discount !== null && product.discount > 0;

  return (
    <Card className="w-full max-w-sm group bg-gray-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden min-h-[350px] flex flex-col">
      <div className="relative w-full pt-[100%]">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={true} // Agregar la propiedad priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      {hasDiscount && (
        <span className="absolute top-2 right-2 bg-[#ef233c] text-white px-2 py-1 rounded text-sm font-medium">
          {product.discount}% OFF
        </span>
      )}
      {product.stock <= 5 && product.stock > 0 && (
        <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-sm font-medium">
          ¡Últimas {product.stock} unidades!
        </span>
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/80 hover:bg-[#ef233c] hover:text-white transition-colors duration-200"
          aria-label="Añadir al carrito"
          disabled={product.stock === 0 || !product.isActive}
        >
          <ShoppingCart className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="flex flex-col justify-between flex-grow p-4">
        <div>
          <div className="text-sm text-gray-500 mb-1">
            {product.category_id.name}
          </div>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-[#ef233c] transition-colors duration-200">
            {product.name}
          </h3>
          {hasDiscount && product.originalPrice ? (
            <div className="flex text-sm flex-col items-start space-y-0">
              <p className="text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
              <div className="flex items-center space-x-1">
                <p className="text-xl font-bold text-[#ef233c]">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xl font-bold text-[#ef233c]">
              ${product.price.toFixed(2)}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button
          className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white transition-colors duration-200 group relative overflow-hidden"
          disabled={product.stock === 0 || !product.isActive}
        >
          <span className="relative z-10">Añadir al carrito</span>
          <span className="absolute inset-0 bg-[#d90429] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
        </Button>
      </CardFooter>
      {product.stock === 0 && (
        <p className="text-red-500 text-sm mt-2 px-4 pb-4">Agotado</p>
      )}
    </Card>
  );
}
