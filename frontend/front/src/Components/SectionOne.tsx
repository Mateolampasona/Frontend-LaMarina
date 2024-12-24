"use client";

import { ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  "Limpieza",
  "Cocina",
  "Baño",
  "Jardín",
  "Ofertas",
  "Novedades",
];

export default function HeroSection() {
  return (
    <section className="bgPrincipal overflow-hidden">
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.h1
              className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 tracking-tight"
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
              className="text-xl md:text-xl font-mono text-gray-600 mb-12 max-w-2xl"
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
                <Link href={"/Categories"}>
                Ver Más
    
                </Link>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            className="relative h-[400px] lg:h-[400px]"
            initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              src="/assets/one.jpg"
              alt="Productos de limpieza premium de La Marina"
              fill
              className="object-cover rounded-2xl shadow-lg"
              priority
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-16 pt-8 border-t border-[#ef233c]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <ul className="flex flex-wrap items-center justify-start gap-x-8 gap-y-2 text-gray-600">
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
