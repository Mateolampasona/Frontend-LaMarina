"use client";

import { IProduct } from "@/interfaces/IProducts";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import Cookies from "js-cookie";
import swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import socket from "@/utils/socket";
import { getAllProducts, getProductById } from "@/helpers/products.helpers";

interface ProductCardProps {
  products: IProduct[];
}

export function ProductCard({ products }: ProductCardProps) {
  const router = useRouter();
  const [productList, setProductList] = useState<IProduct[]>([]);

  useEffect(() => {
    setProductList(products);
  }, [products]);

  const handleAddToCart = () => {
    const accestoken = Cookies.get("accesToken");

    if (!accestoken) {
      swal
        .fire({
          title: "¡Inicia sesión!",
          text: "Para añadir productos al carrito debes iniciar sesión.",
          icon: "info",
          confirmButtonText: "Iniciar sesión",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          cancelButtonColor: "#d33",
          confirmButtonColor: "#ef233c",
        })
        .then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/login";
          }
        });
    }
  };

  useEffect(() => {
    const handleStockUpdate = async (data: number) => {
      try {
        const updatedProduct = await getProductById(data);
        setProductList((prevProducts) =>
          prevProducts.map((product) =>
            product.productId === updatedProduct.productId
              ? updatedProduct
              : product
          )
        );
      } catch (error) {
        console.error("Error fetching updated product:", error);
      }
    };

    socket.on("stockUpdate", handleStockUpdate);

    return () => {
      socket.off("stockUpdate", handleStockUpdate);
    };
  }, []);

  const handleCardClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
      {productList.map((product) => (
        <Card
          key={product.productId}
          className="w-full max-w-sm group bg-gray-50 border-none shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden min-h-[350px] flex flex-col cursor-pointer"
          onClick={() => handleCardClick(product.productId.toString())}
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
                className="bg-white/80 hover:bg-[#ef233c] hover:text-white transition-colors duration-200"
                aria-label="Añadir al carrito"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardContent className="flex flex-col justify-between flex-grow p-4">
            <div>
              <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-[#ef233c] transition-colors duration-200">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {product.description}
              </p>
              <p className="text-sm font-semibold text-gray-600 mb-2 line-clamp-2 -mt-2">
                Stock: {product.stock}
              </p>
              {product.discount && product.originalPrice ? (
                <div className="flex text-sm  flex-col items-start space-y-0">
                  <p className="text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p>
                  <div className="flex items-center space-x-1">
                    <p className="text-xl font-bold text-[#ef233c]">
                      ${product.price.toFixed(2)}
                    </p>
                    <span className="px-2 py-1 text-xs font-semibold text-white bg-[#ef233c] rounded-full">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </span>
                  </div>
                </div>
              ) : (
                <p className="text-2xl font-bold text-[#ef233c]">
                  ${product.price.toFixed(2)}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 mt-auto">
            <Button
              className="w-full bg-[#ef233c] hover:bg-[#d90429] text-white transition-colors duration-200 group relative overflow-hidden"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              <span className="relative z-10">Añadir al carrito</span>
              <span className="absolute inset-0 bg-[#d90429] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
