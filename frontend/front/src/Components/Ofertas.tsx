"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Tag, Zap } from "lucide-react";

const PromocionesYOfertas = () => {
  return (
    <section className="bg-gradient-to-r bg-[#edede9] py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 md:mb-16 animate__animated animate__fadeIn">
          Promociones y Ofertas Especiales
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <CuponesYDescuentos />
          <ProductosEnOferta />
        </div>
      </div>
    </section>
  );
};

const CuponesYDescuentos = () => {
  const [cupones] = useState([
    {
      codigo: "VERANO2023",
      descuento: "20%",
      descripcion: "en toda la tienda",
    },
    {
      codigo: "COMBO2X1",
      descuento: "2x1",
      descripcion: "en productos seleccionados",
    },
    {
      codigo: "ENVIOGRATIS",
      descuento: "Envío",
      descripcion: "gratis en compras +$50",
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

const ProductosEnOferta = () => {
  const [productos] = useState([
    {
      nombre: "Lavandina",
      precioOriginal: 599,
      precioOferta: 499,
      descuento: 17,
    },
    {
      nombre: "Sartenes",
      precioOriginal: 1299,
      precioOferta: 999,
      descuento: 23,
    },
    {
      nombre: "Papel Higienico",
      precioOriginal: 199,
      precioOferta: 149,
      descuento: 25,
    },
  ]);

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
            key={producto.nombre}
            className="bg-[#edede9] rounded-md p-4 sm:p-6 text-gray-800 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center border hover:bg-[#f8c6c6] transform transition-all duration-200"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div>
              <div className="font-bold text-base sm:text-lg">
                {producto.nombre}
              </div>
              <div className="text-xs sm:text-sm line-through text-gray-500">
                ${producto.precioOriginal}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#ef233c]">
                ${producto.precioOferta}
              </div>
            </div>
            <div className="bg-[#ef233c] text-white font-bold rounded-full p-2 sm:p-3 text-xs sm:text-sm mt-2 sm:mt-0">
              {producto.descuento}% OFF
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PromocionesYOfertas;
