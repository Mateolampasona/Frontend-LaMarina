"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import {
  ShoppingCart,
  Heart,
  Star,
  ChevronDown,
  ChevronUp,
  Share2,
  ArrowLeft,
  Truck,
  Shield,
} from "lucide-react";
import { IProduct } from "@/interfaces/IProducts";
import { Badge } from "@/Components/ui/badge";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useUserContext } from "@/Context/userContext";
import Cookies from "js-cookie";
import { addProductToOrder } from "@/helpers/orderDetail.helper";
import Swal from "sweetalert2";
import {
  addFavorite,
  deleteFavorite,
  getUserById,
} from "@/helpers/users.helpers";
import { IUser } from "@/interfaces/IUser";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getProductById } from "@/helpers/products.helpers";
import socket from "@/utils/socket";
import { getAllCategories } from "@/helpers/categories.helper";

interface ProductDetailProps {
  product: IProduct;
}

interface Category {
  id: string | number;
  name: string;
  productCount?: number;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [productRender, setProduct] = useState<IProduct>(product);
  const [user, setUser] = useState<IUser>();
  const { userId } = useUserContext();
  const token = Cookies.get("accessToken") || "null";
  const images = [product.imageUrl, ...Array(3).fill(product.imageUrl)]; // Simulando múltiples imágenes del producto
  const router = useRouter();

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      let parsedToken;
      try {
        parsedToken = JSON.parse(token);
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }
      if (typeof parsedToken !== "string") {
        console.error("Invalid token format");
        return;
      }
      try {
        const user = await getUserById(parsedToken, Number(userId));
        setUser(user);
        const isProductLiked: boolean = user.favorites.some(
          (favorite: { productId: string }) =>
            Number(favorite.productId) === Number(product.productId)
        );
        setIsLiked(isProductLiked);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId && token) {
      fetchUser();
    }
  }, [userId, token]);
  console.log(user);

  // Socket para actualizar producto
  useEffect(() => {
    const handleStockUpdate = async (data: number) => {
      console.log("DATA", data);
      if (data !== product.productId) {
        console.log("Product ID does not match", data, product.productId);
        return;
      }
      try {
        const updatedProduct = await getProductById(data);
        console.log("Updated product:", updatedProduct);
        setProduct(updatedProduct);
      } catch (error) {
        console.error("Error fetching updated product:", error);
      }
    };

    socket.on("stockUpdate", handleStockUpdate);

    return () => {
      socket.off("stockUpdate", handleStockUpdate);
    };
  }, []);

  // Anadir o eliminar producto favorito
  const setFavorite = async () => {
    if (!token || token === "null") {
      Swal.fire({
        title: "Necesitas iniciar sesión",
        text: "Por favor, inicia sesión para agregar productos a favoritos.",
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
    const parsedToken = JSON.parse(token);
    if (typeof parsedToken !== "string") {
      throw new Error("Token is not a string");
    }

    try {
      if (isLiked) {
        await deleteFavorite(parsedToken, product.productId);
        setIsLiked(false);
      } else {
        await addFavorite(parsedToken, product.productId);
        setIsLiked(true);
      }
    } catch (error) {
      console.error("Error al actualizar el estado de favoritos", error);
    }
  };

  // Incrementar y decrementar cantidad del producto
  const incrementQuantity = () =>
    setQuantity((prev) => Math.min(prev + 1, product.stock));
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  // Agregar producto al carrito
  const addProduct = async () => {
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
    const parsedToken = JSON.parse(token);
    if (typeof parsedToken !== "string") {
      throw new Error("Token is not a string");
    }
    try {
      const response = await addProductToOrder(parsedToken, {
        productId: product.productId,
        quantity: quantity,
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    // Simulando la carga de datos del producto
    const timer = setTimeout(() => {
      console.log("Datos del producto cargados");
    }, 1000);

    return () => clearTimeout(timer);
  }, [product.productId]);

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.success("Link copiado al portapapeles");
      })
      .catch((error) => {
        toast.error("Error al copiar el link al portapapeles");
        console.error("Error al copiar el link al portapapeles:", error);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#edede9] to-white">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 md:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-4 md:gap-6 lg:gap-8">
          <aside className="order-2 lg:order-1">
            <div className="block lg:hidden">
              <div className="bg-white rounded-xl p-4 shadow-md mb-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Truck className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm">Envío gratis</span>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Star className="h-5 w-5 text-red-500 mr-2" />
                    <span className="text-sm">Destacado</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block sticky top-4">
              <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                <h3 className="font-semibold text-lg mb-4">Categorías</h3>
                <div className="space-y-2">
                  {isLoadingCategories ? (
                    <>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className="h-11 bg-gray-100 rounded-lg animate-pulse"
                        />
                      ))}
                    </>
                  ) : categories.length > 0 ? (
                    <ul className="space-y-2">
                      {categories.map((category) => (
                        <li key={category.id}>
                          <button
                            onClick={() =>
                              router.push(`/category/${category.id}`)
                            }
                            className="w-full flex items-center justify-between p-3 text-left bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                          >
                            <span className="text-sm text-gray-600 group-hover:text-gray-900">
                              {category.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              ({category.productCount || 0})
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-2">
                      No hay categorías disponibles
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                <h3 className="font-semibold text-lg mb-4">Características</h3>
                <ul className="space-y-4">
                  <li className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Truck className="h-5 w-5 text-red-500 mr-3" />
                    <span className="text-sm">Envío express disponible</span>
                  </li>
                  <li className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Star className="h-5 w-5 text-red-500 mr-3" />
                    <span className="text-sm">Producto destacado</span>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <main className="order-1 lg:order-2">
            <Button
              variant="ghost"
              className="w-full sm:w-auto mb-4 hover:bg-red-50"
              onClick={() => router.back()}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Button>

            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeImage}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={images[activeImage]}
                        alt={product.name}
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                  {product.discount && product.originalPrice && (
                    <Badge className="absolute top-4 right-4 bg-red-500">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                          100
                      )}
                      % OFF
                    </Badge>
                  )}
                </div>

                <div className="relative">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={8}
                    slidesPerView="auto"
                    className="!p-1"
                  >
                    {images.map((img, index) => (
                      <SwiperSlide key={index} style={{ width: "auto" }}>
                        <button
                          onClick={() => setActiveImage(index)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden ${
                            activeImage === index
                              ? "ring-2 ring-red-500 ring-offset-2"
                              : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`${product.name} vista ${index + 1}`}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </button>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>

              <div>
                <div className="space-y-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {product.name}
                  </h1>

                  <div className="space-y-2">
                    {product.discount && product.originalPrice ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <p className="text-3xl font-bold text-red-600">
                            ${product.price.toFixed(2)}
                          </p>
                          <p className="text-lg text-gray-400 line-through">
                            ${product.originalPrice.toFixed(2)}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-600"
                        >
                          Ahorra $
                          {(product.originalPrice - product.price).toFixed(2)}
                        </Badge>
                      </>
                    ) : (
                      <p className="text-3xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-700 mr-3">
                        Cantidad:
                      </span>
                      <div className="flex border border-gray-200 rounded-lg">
                        <button
                          onClick={decrementQuantity}
                          className="px-3 py-2 hover:bg-gray-50"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <span className="w-12 flex items-center justify-center border-x border-gray-200">
                          {quantity}
                        </span>
                        <button
                          onClick={incrementQuantity}
                          className="px-3 py-2 hover:bg-gray-50"
                        >
                          <ChevronUp className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {product.stock} disponibles
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
                      onClick={addProduct}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Agregar al carrito
                    </Button>
                    <div className="flex gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setFavorite()}
                        className={isLiked ? "text-red-600" : ""}
                      >
                        <Heart fill={isLiked ? "currentColor" : "none"} />
                      </Button>
                      <Button size="icon" variant="outline">
                        <Share2 />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <aside className="order-3">
            <div className="hidden lg:block sticky top-4 space-y-4">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-lg mb-4">
                  Productos Relacionados
                </h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={product.imageUrl}
                          alt={`Producto similar ${item}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium line-clamp-2">
                          Producto Similar {item}
                        </p>
                        <p className="text-sm text-red-600 font-semibold mt-1">
                          ${(product.price * 0.9).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-semibold text-lg mb-4">
                  Beneficios Exclusivos
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-gradient-to-r from-red-500 to-red-600">
                        15% OFF
                      </Badge>
                      <span className="text-sm font-medium text-gray-800">
                        Compra Mayorista
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      15% de descuento en compras mayores a $15,000
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-blue-600">
                        COMBO
                      </Badge>
                      <span className="text-sm font-medium text-gray-800">
                        Pack Limpieza
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      20% OFF en pack de productos de limpieza seleccionados
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-gradient-to-r from-green-500 to-green-600">
                        ENVÍO
                      </Badge>
                      <span className="text-sm font-medium text-gray-800">
                        Envío Sin Cargo
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Envío gratis en compras superiores a $8,000
                    </p>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="bg-gradient-to-r from-purple-500 to-purple-600">
                        CLIENTE
                      </Badge>
                      <span className="text-sm font-medium text-gray-800">
                        Cliente Frecuente
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      10% extra en tu 5ta compra del mes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
