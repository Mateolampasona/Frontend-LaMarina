"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tag, Zap } from "lucide-react";
import { getAllProducts, getProductById } from "@/helpers/products.helpers";
import { IProduct } from "@/interfaces/IProducts";
import socket from "@/utils/socket";

const PromocionesYOfertas = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  console.log(products);
  const [discountProducts, setDiscountProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        const discountedProducts: IProduct[] = products.filter(
          (product: IProduct) => product.discount !== null
        );
        setDiscountProducts(discountedProducts);
        setProducts(products);
        console.log(products);
        console.log(discountedProducts);
      } catch (error) {
        console.error("Error al obtener los productos", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    socket.on("stockUpdate", async (data) => {
      const updatedProduct = await getProductById(data);
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((product) =>
          product.productId === updatedProduct.productId
            ? updatedProduct
            : product
        );
        const updatedDiscountedProducts = updatedProducts.filter(
          (product: IProduct) => product.discount !== null
        );
        setDiscountProducts(updatedDiscountedProducts);
        return updatedProducts;
      });
    });

    return () => {
      socket.off("stockUpdate");
    };
  }, []);
  return (
    <section className="bg-gradient-to-r bg-[#edede9] py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 md:mb-16 animate__animated animate__fadeIn">
          Promociones y Ofertas Especiales
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <CuponesYDescuentos />
          <ProductosEnOferta productos={discountProducts} />
        </div>
      </div>
    </section>
  );
};

const CuponesYDescuentos = () => {
  const [cupones] = useState([
    {
      codigo: "Inauguracion tienda virtual",
      descuento: "20%",
      descripcion: "En toda la tienda",
    },
    {
      codigo: "COMBOS 2X1",
      descuento: "2x1",
      descripcion: "En productos seleccionados",
    },
    {
      codigo: "ENVIO GRATIS",
      descuento: "Envío",
      descripcion: "Gratis en compras +$25.0000",
    },
  ]);

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 hover:shadow-2xl transform transition-all duration-300">
      <h3 className="text-2xl sm:text-3xl font-bold text-[#ef233c] mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <span className="flex items-center mb-2 sm:mb-0">
          <Tag className="mr-2 text-[#ef233c]" /> Cupones y Descuentos
        </span>
        <motion.div
          className="text-lg sm:text-xl font-semibold text-[#ef233c] tracking-widest"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          ¡Aprovecha!
        </motion.div>
      </h3>
      <ul className="space-y-4 sm:space-y-6">
        {cupones.map((cupon, index) => (
          <motion.li
            key={cupon.codigo}
            className="bg-[#edede9] rounded-md p-4 sm:p-6 text-gray-800 shadow-lg border hover:bg-[#f8c6c6] transform transition-all duration-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="font-bold text-base sm:text-lg text-[#ef233c]">
              {cupon.codigo}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold">
              {cupon.descuento} OFF
            </div>
            <div className="text-xs sm:text-sm">{cupon.descripcion}</div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

const ProductosEnOferta = ({ productos }: { productos: IProduct[] }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 border-2 hover:shadow-2xl transform transition-all duration-300">
      <h3 className="text-2xl sm:text-3xl font-bold text-[#ef233c] mb-4 sm:mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <span className="flex items-center mb-2 sm:mb-0">
          <Zap className="mr-2 text-[#ef233c]" /> Productos en Oferta
        </span>
        <motion.div
          className="text-lg sm:text-xl font-semibold text-[#ef233c] tracking-widest"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          ¡No te lo pierdas!
        </motion.div>
      </h3>
      <div className="grid gap-4 sm:gap-8">
        {productos.map((producto, index) => (
          <motion.div
            key={producto.name}
            className="bg-[#edede9] rounded-md p-4 sm:p-6 text-gray-800 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border hover:bg-[#f8c6c6] transform transition-all duration-200"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div>
              <div className="font-bold text-base sm:text-lg">
                {producto.name}
              </div>
              <div className="text-xs sm:text-sm line-through text-gray-500">
                ${producto.originalPrice}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#ef233c]">
                ${producto.price}
              </div>
            </div>
            <div className="bg-[#ef233c] text-white font-bold rounded-full p-2 sm:p-3 text-xs sm:text-sm mt-2 sm:mt-0">
              {producto.originalPrice !== null
                ? (
                    ((producto.originalPrice - producto.price) /
                      producto.originalPrice) *
                    100
                  ).toFixed(0)
                : 0}
              % OFF
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromocionesYOfertas;
