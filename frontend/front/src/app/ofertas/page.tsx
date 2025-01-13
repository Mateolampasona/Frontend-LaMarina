"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

import "swiper/css";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Search, Star, ShoppingCart } from "lucide-react";
import { getAllProducts } from "@/Helpers/products.helpers";
import { IProduct } from "@/interfaces/IProducts";
import { Skeleton } from "@/Components/ui/skeleton";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < Math.floor(rating)
              ? "text-yellow-400 fill-yellow-400"
              : "text-gray-300"
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

const ProductCard = ({ product }: { product: IProduct }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "0px 0px 200px 0px",
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden bg-white shadow-lg rounded-lg transition transform hover:scale-105">
        <CardHeader className="p-0 relative">
          <Image
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            width={400}
            height={200}
            className="w-full h-48 object-cover"
          />
          <Badge variant="destructive" className="absolute top-2 right-2">
            -{product.discount}%
          </Badge>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
            {product.name}
          </CardTitle>
          <StarRating rating={product.rating || 0} />
          <div className="flex justify-between items-center mt-2">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4">
          <Button className="w-full bg-red-500 hover:bg-red-600">
            <ShoppingCart className="mr-2 h-4 w-4" /> Agregar al carrito
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const SkeletonCard = () => (
  <Card className="overflow-hidden bg-white shadow-lg rounded-lg">
    <CardHeader className="p-0">
      <Skeleton className="w-full h-48" />
    </CardHeader>
    <CardContent className="p-4">
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <Skeleton className="h-6 w-1/3" />
    </CardContent>
    <CardFooter className="bg-gray-50 p-4">
      <Skeleton className="h-10 w-full" />
    </CardFooter>
  </Card>
);

const VistaOfertas = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError("Ocurrió un error al cargar las ofertas.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.discount &&
      product.discount > 0 &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "todas" ||
        product.category_id.name === selectedCategory)
  );

  const categories = [
    "todas",
    ...new Set(products.map((product) => product.category_id.name)),
  ];

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-b from-[#edede9] to-white min-h-screen p-8 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-gray-800 mb-8 text-center"
      >
        Ofertas Especiales
      </motion.h1>

      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Buscar ofertas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Categoría" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-red-500 mt-8">{error}</p>
      ) : (
        <>
          <AnimatePresence>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </AnimatePresence>

          {filteredProducts.length > productsPerPage && (
            <div className="flex justify-center mt-8">
              {[
                ...Array(Math.ceil(filteredProducts.length / productsPerPage)),
              ].map((_, index) => (
                <Button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  variant={currentPage === index + 1 ? "default" : "outline"}
                  className="mx-1"
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          )}
        </>
      )}

      {filteredProducts.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500 mt-8">
          No se encontraron ofertas que coincidan con tu búsqueda.
        </p>
      )}
    </div>
  );
};

export default VistaOfertas;
