"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Sparkles, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen bg-gradient-to-b from-[#edede9] to-white overflow-hidden">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>
      <div
        className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center z-10"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Sparkles className="text-[#ef233c] w-20 h-20 mb-8 animate-pulse" />
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
        <motion.button
          className="group bg-[#ef233c] text-white font-bold py-4 px-8 rounded-full hover:bg-[#e5384c] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center space-x-2 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">Comprar Ahora</span>
          <ShoppingCart className="w-5 h-5 group-hover:animate-bounce relative z-10" />
          <span className="absolute top-0 left-0 w-full h-full bg-white opacity-20 transform -skew-x-12 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
        </motion.button>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white opacity-50"></div>
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ChevronDown className="w-8 h-8 text-gray-600" />
      </motion.div>
    </section>
  );
}
