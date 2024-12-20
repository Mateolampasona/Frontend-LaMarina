"use client";
import { useState, useEffect } from "react";
import { ProductCard } from "./Card";
import { getAllProducts } from "@/helpers/products.helpers";
import { IProduct } from "@/interfaces/IProducts";

export function ProductSection() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        setProducts(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-[#edede9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Productos</h2>
        <ProductCard products={products} />
      </div>
    </section>
  );
}
