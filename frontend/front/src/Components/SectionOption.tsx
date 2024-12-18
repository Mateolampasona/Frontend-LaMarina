"use client";

import { ShoppingCart, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  "Limpieza", "Cocina", "Baño", "Jardín", "Ofertas", "Novedades"
];

export default function HeroSection() {
  return (
    <section className="bg-white min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-[#ef233c] mb-2">La Marina</h2>
            </motion.div>
            <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-gray-800 mb-6 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Bienvenido a{" "}
          <span className="text-[#ef233c] relative">
            La Marina
            <span className="absolute -bottom-1 left-0 w-full h-2 bg-[#ef233c] transform -skew-x-12"></span>
          </span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl font-mono text-gray-600 mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Tu destino para productos de limpieza y bazar de calidad superior
        </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button 
                className="bg-[#ef233c] text-white px-8 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-[#d90429] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Comprar Ahora
                <ShoppingCart className="w-5 h-5" />
              </motion.button>
              <motion.button 
                className="bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver Más
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="relative h-[400px] lg:h-[500px]"
            initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              src="/placeholder.svg?height=500&width=500"
              alt="Productos de limpieza premium de La Marina"
              fill
              className="object-cover rounded-2xl shadow-lg"
              priority
            />
            <motion.div
              className="absolute -bottom-4 -right-4 bg-[#ef233c] text-white p-4 rounded-full shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 500, damping: 15 }}
            >
              <span className="text-2xl font-bold">20%</span>
              <br />
              <span className="text-sm">OFF</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Categories */}
        <motion.div 
          className="mt-12 pt-8 border-t"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ul className="flex flex-wrap items-center justify-start gap-x-8 gap-y-4 text-gray-600">
            {categories.map((category, index) => (
              <motion.li 
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <button className="text-sm hover:text-[#ef233c] transition-colors">
                  {category}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

