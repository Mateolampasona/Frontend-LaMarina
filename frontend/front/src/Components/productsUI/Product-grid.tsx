import { useState, useEffect } from "react";
import SingleProductCard from "@/Components/productsUI/SingleProductCard";
import { IProduct } from "@/interfaces/IProducts";
import socket from "@/utils/socket"; // Asegúrate de importar el socket
import { getProductById } from "@/helpers/products.helpers"; // Asegúrate de importar la función

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState<IProduct[]>(products);
  const productsPerPage = 9;

  useEffect(() => {
    socket.on("stockUpdate", async (data) => {
      const updatedProduct = await getProductById(data);
      setProductList((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === updatedProduct.productId
            ? updatedProduct
            : product
        )
      );
    });

    return () => {
      socket.off("stockUpdate");
    };
  }, []);

  // Filtrar productos activos
  const activeProducts = productList.filter((product) => product.isActive);

  // Verificar duplicados
  const uniqueProducts = Array.from(
    new Set(activeProducts.map((p) => p.productId))
  ).map((id) => activeProducts.find((p) => p.productId === id));

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = uniqueProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(uniqueProducts.length / productsPerPage);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
        {currentProducts.map((product) => (
          <SingleProductCard key={product.productId} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded ${
                currentPage === page
                  ? "bg-[#ef233c] text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
