"use client";

import { useState, useEffect } from "react";
import { getAllProducts, getProductById } from "@/helpers/products.helpers";
import ProductGrid from "@/Components/productsUI/Product-grid";
import Sidebar from "@/Components/productsUI/Sidebar";
import SearchSort from "@/Components/productsUI/Search-sort";
import { IProduct, ICategory } from "@/interfaces/IProducts";
import socket from "@/utils/socket";

export default function ProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleSearch = (term: string) => {
    const filtered = products.filter(
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

  const handleCategoryFilter = (categoryId: number) => {
    const filtered = products.filter(
      (product) => product.category_id.categoryId === categoryId
    );
    setFilteredProducts(filtered);
  };

  const handlePriceRangeFilter = (range: [number, number]) => {
    const filtered = products.filter(
      (product) => product.price >= range[0] && product.price <= range[1]
    );
    setFilteredProducts(filtered);
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
          <aside className="w-full md:w-64 flex-shrink-0">
            <Sidebar
              categories={categories}
              onCategoryChange={handleCategoryFilter}
              onPriceRangeChange={handlePriceRangeFilter}
            />
          </aside>

          <main className="flex-1">
            <SearchSort onSearch={handleSearch} onSort={handleSort} />
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}
