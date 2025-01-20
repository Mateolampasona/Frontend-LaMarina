"use client";

import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { IProduct } from "@/interfaces/IProducts";
import { Card, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import { addProductToOrder } from "@/helpers/orderDetail.helper";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

interface SingleProductCardProps {
  product: IProduct;
}

const SingleProductCard: React.FC<SingleProductCardProps> = ({ product }) => {
  const hasDiscount = (product.discount ?? 0) > 0;
  const router = useRouter();
  const token = Cookies.get("accessToken");

  const handleCardClick = () => {
    router.push(`/product/${product.productId}`);
  };

  const addProduct = async (productId: string) => {
    if (!token || token === "null") {
      Swal.fire({
        title: "Necesitas iniciar sesión",
        text: "Por favor, inicia sesión para agregar productos al carrito.",
        icon: "warning",
        confirmButtonText: "Iniciar sesión",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          confirmButton: "swal-confirm-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/login");
        }
      });
      return;
    }
    if (!productId) {
      Swal.fire({
        title: "Error",
        text: "No se pudo agregar el producto al carrito.",
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          confirmButton: "swal-confirm-button",
        },
      });
      return;
    }
    const parsedToken = JSON.parse(token);
    if (typeof parsedToken !== "string") {
      throw new Error("Token is not a string");
    }
    try {
      const response = await addProductToOrder(parsedToken, {
        productId: Number(productId),
        quantity: 1,
      });
      console.log("Producto agregado al carrito", response);
      Swal.fire({
        title: "Producto agregado al carrito",
        text: "El producto se ha agregado correctamente al carrito.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
          popup: "swal-popup",
          title: "swal-title",
          confirmButton: "swal-confirm-button",
        },
      });
    } catch (error) {
      console.error("Error al agregar el producto al carrito", error);
    }
  };

  return (
    <Card className="group relative flex flex-col h-full overflow-hidden  hover:shadow-lg  bg-white bg-opacity-80 backdrop-blur-sm border border-gray-200">
      <div
        className="relative aspect-square w-full overflow-hidden"
        onClick={handleCardClick}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          priority={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {hasDiscount && (
          <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
            {product.discount}% OFF
          </span>
        )}
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-md">
            ¡Últimas {product.stock}!
          </span>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <Button
            variant="secondary"
            size="icon"
            className="bg-white/90 hover:bg-red-500 hover:text-white transition-colors duration-200 rounded-full shadow-lg"
            aria-label="Añadir al carrito"
            disabled={product.stock === 0 || !product.isActive}
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent
        className="flex flex-col justify-between flex-grow p-3"
        onClick={handleCardClick}
      >
        <div>
          <h3 className="font-semibold text-sm mb-1 line-clamp-2  transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-baseline space-x-2">
            <p className="text-lg font-bold text-red-500">
              ${product.price.toFixed(2)}
            </p>
            {hasDiscount && product.originalPrice && (
              <p className="text-xs text-gray-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 mt-auto">
        <Button
          className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-200 group relative overflow-hidden text-sm py-1"
          disabled={product.stock === 0 || !product.isActive}
        >
          <span
            className="relative z-10"
            onClick={() => addProduct(product.productId.toString())}
          >
            Añadir al carrito
          </span>
          <span className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
        </Button>
      </CardFooter>
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center">
          <p className="text-white font-bold text-lg">Agotado</p>
        </div>
      )}
    </Card>
  );
};

export default SingleProductCard;
