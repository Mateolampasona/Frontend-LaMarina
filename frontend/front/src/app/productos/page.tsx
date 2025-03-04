"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { getAllProducts, getProductById } from "@/helpers/products.helpers";
import ProductGrid from "@/Components/productsUI/Product-grid";
import Sidebar from "@/Components/productsUI/Sidebar";
import SearchSort from "@/Components/productsUI/Search-sort";
import { IProduct, ICategory } from "@/interfaces/IProducts";
import socket from "@/utils/socket";

function ProductsPageContent() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[] | null>(
    null
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data);

        const uniqueCategories: ICategory[] = Array.from(
          new Set(data.map((product: IProduct) => product.category_id))
        );
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const handleStockUpdate = async (data: number) => {
      try {
        const updatedProduct = await getProductById(data);
        setProducts((prevProducts) =>
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

  useEffect(() => {
    let filtered = products;

    if (selectedCategories && selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category_id.categoryId)
      );
    }

    if (categoria) {
      filtered = filtered.filter(
        (product) =>
          product.category_id.name.toLowerCase() ===
          (Array.isArray(categoria)
            ? categoria[0].toLowerCase()
            : categoria.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    setFilteredProducts(filtered);
  }, [selectedCategories, priceRange, products, categoria]);

  const handleSearch = (term: string) => {
    let filtered = products;

    if (categoria) {
      filtered = filtered.filter(
        (product) =>
          product.category_id.name.toLowerCase() ===
          (Array.isArray(categoria)
            ? categoria[0].toLowerCase()
            : categoria.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(term.toLowerCase()) ||
        product.description.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredProducts(filtered);
  };

  const handleSort = (sortBy: string) => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "popular":
        sorted.sort((a, b) => b.quantitySell - a.quantitySell);
        break;
      default:
        break;
    }
    setFilteredProducts(sorted);
  };

  const handleCategoryFilter = (categoryIds: number[] | null) => {
    setSelectedCategories(categoryIds);
  };

  const handlePriceRangeFilter = (range: [number, number]) => {
    setPriceRange(range);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#edede9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ef233c]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#edede9]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {!categoria && (
            <aside className="w-full md:w-64 flex-shrink-0">
              <Sidebar
                categories={categories}
                onCategoryChange={handleCategoryFilter}
                onPriceRangeChange={handlePriceRangeFilter}
              />
            </aside>
          )}

          <main className="flex-1">
            {categoria && (
              <h1 className="text-2xl font-bold mb-4">
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </h1>
            )}
            <SearchSort onSearch={handleSearch} onSort={handleSort} />
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsPageContent />
    </Suspense>
  );
}
