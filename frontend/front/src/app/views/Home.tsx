import Image from "next/image";
import {
  ShoppingCart,
  Search,
  User,
  Truck,
  Shield,
  Repeat,
} from "lucide-react";
import { CountdownTimer } from "../../Components/CountdownTimer";

export default function Homee() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <Image
              src="/logo-la-marina.svg"
              alt="La Marina Logo"
              width={150}
              height={50}
            />
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Inicio
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Productos
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Ofertas
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Contacto
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 transition">
              <Search className="h-6 w-6" />
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition">
              <User className="h-6 w-6" />
            </button>
            <button className="text-gray-700 hover:text-blue-600 transition">
              <ShoppingCart className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-blue-600 h-96">
        <Image
          src="/hero-cleaning.jpg"
          alt="Productos de limpieza"
          layout="fill"
          objectFit="cover"
          className="mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Bienvenido a La Marina
          </h1>
          <p className="text-xl text-white mb-8">
            Tu destino para productos de limpieza y bazar de calidad
          </p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-full hover:bg-blue-100 transition">
            Comprar Ahora
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Categorías Destacadas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {["Limpieza del Hogar", "Cuidado de la Ropa", "Cocina", "Baño"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition"
                >
                  <Image
                    src={`/category-${category
                      .toLowerCase()
                      .replace(" ", "-")}.svg`}
                    alt={category}
                    width={80}
                    height={80}
                    className="mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">
                    {category}
                  </h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Productos Populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Detergente Multiusos", price: "$5.99" },
              { name: "Set de Esponjas", price: "$3.49" },
              { name: "Limpiador de Vidrios", price: "$4.29" },
              { name: "Escoba y Recogedor", price: "$12.99" },
            ].map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <Image
                  src={`/product-${product.name
                    .toLowerCase()
                    .replace(" ", "-")}.jpg`}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold">{product.price}</p>
                  <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
            Por qué elegirnos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Envío Gratis",
                description: "En pedidos superiores a $50",
              },
              {
                icon: Shield,
                title: "Productos de Calidad",
                description: "Garantía de satisfacción",
              },
              {
                icon: Repeat,
                title: "Devoluciones Fáciles",
                description: "30 días para cambios",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center"
              >
                <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Sobre Nosotros</h4>
              <p className="text-gray-400">
                La Marina es tu tienda de confianza para productos de limpieza y
                bazar de alta calidad.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Productos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Ofertas
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <p className="text-gray-400">Calle Principal 123, Ciudad</p>
              <p className="text-gray-400">Teléfono: (123) 456-7890</p>
              <p className="text-gray-400">Email: info@lamarina.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              &copy; 2023 La Marina. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
