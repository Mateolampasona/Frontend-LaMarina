"use client";

import { ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#edede9] min-h-screen flex -mt-16 items-center">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 text-gray-800">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Bienvenido a{" "}
              <span className="text-[#ef233c] relative inline-block">
                La Marina
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-2 bg-[#ef233c]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                ></motion.span>
              </span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl lg:text-2xl font-mono mb-12 max-w-2xl leading-relaxed"
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
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/productos"
                  className="bg-[#ef233c] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-mono flex items-center gap-2 hover:bg-[#d90429] transition-colors shadow-lg hover:shadow-xl"
                >
                  Comprar Ahora
                  <ShoppingCart className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/categorias"
                  className="bg-white text-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-mono flex items-center gap-2 hover:bg-gray-100 transition-colors border-2 border-gray-200 shadow-lg hover:shadow-xl"
                >
                  Ver Más
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="relative h-[300px] sm:h-[400px] lg:h-[500px] mt-8 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image
              src="/assets/one.jpg"
              alt="Productos de limpieza premium de La Marina"
              fill
              className="object-cover rounded-3xl shadow-2xl"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            ></motion.div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 lg:mt-16 pt-8 border-t border-[#ef233c] flex flex-wrap justify-center items-center  gap-4 sm:gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {["Calidad", "Variedad", "Servicio", "Confianza"].map(
            (item, index) => (
              <motion.span
                key={item}
                className="text-gray-800 text-sm sm:text-base"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                {item}
              </motion.span>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
