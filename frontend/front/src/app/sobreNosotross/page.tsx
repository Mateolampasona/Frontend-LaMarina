"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Users,
  Truck,
  PhoneCall,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Calidad Superior",
    description:
      "Ofrecemos productos de la más alta calidad para satisfacer todas tus necesidades de limpieza y hogar.",
  },
  {
    icon: ShieldCheck,
    title: "Confiabilidad",
    description:
      "Con años de experiencia, nos hemos ganado la confianza de nuestros clientes por nuestra dedicación y servicio excepcional.",
  },
  {
    icon: TrendingUp,
    title: "Innovación Constante",
    description:
      "Nos mantenemos al día con las últimas tendencias y tecnologías en productos de limpieza y artículos de bazar.",
  },
  {
    icon: Users,
    title: "Atención Personalizada",
    description:
      "Nuestro equipo está comprometido a brindarte una atención personalizada y asesoramiento experto.",
  },
  {
    icon: Truck,
    title: "Entrega Rápida",
    description:
      "Garantizamos entregas rápidas y seguras para que tengas tus productos cuando los necesites.",
  },
  {
    icon: PhoneCall,
    title: "Soporte 24/7",
    description:
      "Estamos disponibles las 24 horas, los 7 días de la semana para atender tus consultas y pedidos.",
  },
];

export default function SobreNosotrosMejorado() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#edede9] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-mono font-semibold text-gray-900 sm:text-4xl">
            Nuestra Historia
          </h2>
          <p className="mt-4 text-md text-gray-600 max-w-3xl mx-auto">
            Desde 1960, en <span className="text-[#ef233c]">La Marina</span> nos
            dedicamos a hacer brillar hogares y negocios con nuestros productos
            de limpieza y artículos de bazar de primera calidad.
          </p>
        </motion.div>

        <div className="mt-20 grid font-mono grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="absolute inset-0 bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out"
                style={{
                  transform:
                    hoveredIndex === index ? "scale(1.05)" : "scale(1)",
                  boxShadow:
                    hoveredIndex === index
                      ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      : "none",
                }}
              />
              <div className="relative p-6 flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#ef233c] text-white mb-4">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-20 text-center"
        >
          <p className="text-md text-gray-600 max-w-4xl mx-auto">
            En <span className="text-[#ef233c]">La Marina</span>, no solo
            vendemos productos, creamos soluciones. Entendemos que cada hogar y
            negocio es único, por eso ofrecemos una amplia gama de artículos de
            limpieza y bazar cuidadosamente seleccionados para satisfacer tus
            necesidades específicas. Nuestro compromiso va más allá de la venta;
            estamos aquí para asesorarte y asegurarnos de que encuentres
            exactamente lo que buscas.
          </p>
          <motion.a
            href="/productos"
            className="mt-8 inline-flex items-center font-mono justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-[#ef233c] hover:bg-[#d90429] transition-all duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Descubre Nuestra Gama de Productos
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
