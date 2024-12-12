import { motion } from "framer-motion";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  bgColor: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Auriculares Premium",
    price: 199.99,
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Auriculares de alta fidelidad con cancelación de ruido activa.",
    category: "Audio",
    bgColor: "bg-orange-500",
  },
  {
    id: 2,
    name: "Smartwatch Deportivo",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=400",
    description: "Reloj inteligente con GPS y monitor de ritmo cardíaco.",
    category: "Wearable",
    bgColor: "bg-teal-500",
  },
  {
    id: 3,
    name: "Cámara DSLR Profesional",
    price: 899.99,
    image: "/placeholder.svg?height=400&width=400",
    description: "Cámara réflex digital de 24MP con lente intercambiable.",
    category: "Fotografía",
    bgColor: "bg-purple-500",
  },
  {
    id: 4,
    name: "Laptop Ultradelgada",
    price: 1299.99,
    image: "/placeholder.svg?height=400&width=400",
    description:
      'Portátil de 13" con procesador de última generación y SSD rápido.',
    category: "Computación",
    bgColor: "bg-blue-500",
  },
  {
    id: 5,
    name: "Altavoz Inteligente",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    description: "Altavoz con asistente virtual integrado y sonido envolvente.",
    category: "Audio",
    bgColor: "bg-red-500",
  },
  {
    id: 6,
    name: "Drone con Cámara 4K",
    price: 599.99,
    image: "/placeholder.svg?height=400&width=400",
    description: "Drone plegable con cámara 4K y 30 minutos de vuelo.",
    category: "Fotografía",
    bgColor: "bg-green-500",
  },
];

export default function Cards() {
  return (
    <section className="py-24 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-tight">
          Nuestros Productos <span className="text-indigo-600">Destacados</span>
        </h2>
        <div className="flex flex-wrap items-center justify-center">
          {products.map((product) => (
            <motion.div
              key={product.id}
              className={`flex-shrink-0 m-6 relative overflow-hidden ${product.bgColor} rounded-lg max-w-xs shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                className="absolute bottom-0 left-0 mb-8"
                viewBox="0 0 375 283"
                fill="none"
                style={{ transform: "scale(1.5)", opacity: 0.1 }}
              >
                <rect
                  x="159.52"
                  y="175"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 159.52 175)"
                  fill="white"
                />
                <rect
                  y="107.48"
                  width="152"
                  height="152"
                  rx="8"
                  transform="rotate(-45 0 107.48)"
                  fill="white"
                />
              </svg>
              <div className="relative pt-10 px-10 flex items-center justify-center">
                <div
                  className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"
                  style={{
                    background: "radial-gradient(black, transparent 60%)",
                    transform: "rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)",
                    opacity: 0.2,
                  }}
                ></div>
                <Image
                  className="relative w-40 h-40 object-contain"
                  src={product.image}
                  alt={product.name}
                />
              </div>
              <div className="relative text-white px-6 pb-6 mt-6">
                <span className="block opacity-75 -mb-1">
                  {product.category}
                </span>
                <div className="flex justify-between">
                  <span className="block font-semibold text-xl">
                    {product.name}
                  </span>
                  <span
                    className={`block bg-white rounded-full text-${product.bgColor.replace(
                      "bg-",
                      ""
                    )} text-xs font-bold px-3 py-2 leading-none flex items-center`}
                  >
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
