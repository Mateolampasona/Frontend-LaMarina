"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  bgColor?: string; // Hacer opcional
}

console.log(process.env.NEXT_PUBLIC_BACKEND_URL);

export default function Cards() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products`;
        console.log("Fetching from URL:", url);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    }

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight">
          Nuestros Productos <span className="text-indigo-600">Destacados</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className={`flex-shrink-0 m-6 relative overflow-hidden ${product.bgColor || 'bg-default'} rounded-lg max-w-xs shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                className="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                  }}
                ></div>
                {product.image ? (
                  <Image
                    className="relative w-40 h-40 object-contain"
                    src={product.image}
                    alt={product.name}
                  />
                ) : (
                  <div className="relative w-40 h-40 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                <span className="block opacity-75 -mb-1">
                  {product.category}
                </span>
                <div className="flex justify-between">
                  <span className="block font-semibold text-xl">
                    {product.name}
                  </span>
                  <span
                    className={`block bg-white rounded-full text-${(product.bgColor || 'bg-default').replace(
                      "bg-",
                      ""
                    )} text-xs font-bold px-3 py-2 leading-none flex items-center`}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}