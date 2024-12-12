import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Search, Menu, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/placeholder.svg?height=32&width=120"
                  width={120}
                  height={32}
                  alt="La Marina Logo"
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  href="#"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inicio
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Productos
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Ofertas
                </Link>
                <Link
                  href="#"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contacto
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-blue-600 text-white">
          <div className="absolute inset-0">
            <Image
              src="/placeholder.svg?height=600&width=1600"
              layout="fill"
              objectFit="cover"
              alt="Hero background"
              className="opacity-50"
            />
          </div>
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Bienvenido a La Marina
            </h1>
            <p className="text-xl sm:text-2xl mb-8">
              Tu destino para productos de limpieza y artículos de bazar de
              calidad
            </p>
            <Button size="lg">
              Explorar productos
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Categorías destacadas
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {["Limpieza", "Cocina", "Baño", "Organización"].map(
                (category) => (
                  <Card
                    key={category}
                    className="hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-4">
                      <Image
                        src={`/placeholder.svg?height=200&width=200&text=${category}`}
                        width={200}
                        height={200}
                        alt={category}
                        className="rounded-lg mb-4"
                      />
                      <h3 className="font-semibold text-lg text-center">
                        {category}
                      </h3>
                    </CardContent>
                  </Card>
                )
              )}
            </div>
          </div>
        </section>

        {/* Popular Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Productos populares
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Detergente multiusos", price: "5.99" },
                { name: "Set de esponjas", price: "3.49" },
                { name: "Escoba con recogedor", price: "12.99" },
                { name: "Organizador de cajones", price: "8.99" },
              ].map((product) => (
                <Card
                  key={product.name}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-4">
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=${product.name}`}
                      width={200}
                      height={200}
                      alt={product.name}
                      className="rounded-lg mb-4"
                    />
                    <h3 className="font-semibold text-lg mb-2">
                      {product.name}
                    </h3>
                    <p className="text-blue-600 font-bold">${product.price}</p>
                    <Button className="w-full mt-4">Añadir al carrito</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Special Offers Section */}
        <section className="py-12 bg-blue-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-8">
              Ofertas especiales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center">
                  <div className="flex-shrink-0 mr-6">
                    <Image
                      src="/placeholder.svg?height=150&width=150&text=Oferta"
                      width={150}
                      height={150}
                      alt="Oferta especial"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      ¡Pack de limpieza completo!
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Llévate un set completo de productos de limpieza con un
                      20% de descuento
                    </p>
                    <Button>Ver oferta</Button>
                  </div>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 flex items-center">
                  <div className="flex-shrink-0 mr-6">
                    <Image
                      src="/placeholder.svg?height=150&width=150&text=2x1"
                      width={150}
                      height={150}
                      alt="Promoción 2x1"
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl mb-2">
                      2x1 en productos de cocina
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Aprovecha esta increíble oferta en una selección de
                      productos para tu cocina
                    </p>
                    <Button>Ver promoción</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-12 bg-blue-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">
                Suscríbete a nuestro boletín
              </h2>
              <p className="text-xl mb-8">
                Recibe las últimas ofertas y novedades directamente en tu correo
              </p>
              <form
                className="flex flex-col sm:flex-row gap-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full sm:w-auto"
                />
                <Button type="submit" className="w-full sm:w-auto">
                  Suscribirme
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="text-center">
              <p>&copy; 2024 La Marina. Todos los derechos reservados.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="#" className="text-white hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2C13.59 2 10 5.59 10 10c0 4.41 3.59 8 8 8s8-3.59 8-8c0-4.41-3.59-8-8-8zm0 14c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z" />
                </svg>
              </Link>
              <Link href="#" className="text-white hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 10c0 4-3 7-7 7s-7-3-7-7 3-7 7-7 7 3 7 7zm-7-2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM4 7c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1-.45-1-1-1z" />
                </svg>
              </Link>
              <Link href="#" className="text-white hover:text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 5.27l1.82-.64c-.07-.29-.12-.58-.12-.89 0-2.76-2.24-5-5-5-2.66 0-4.8 2.03-4.98 4.64l-.94.15C7.08 2.02 9.95 0 13 0c3.87 0 7 3.13 7 7 0 1.27-.36 2.45-.98 3.46L19 9c-1.2-.65-2.57-1.02-3.92-1.02-3.31 0-6 2.69-6 6s2.69 6 6 6c.94 0 1.82-.31 2.56-.85L16 21c-2.18 1.58-5.24 1.58-7.42 0L7.52 14c-.62-.38-1.18-.83-1.68-1.36L4 13c-.29.26-.62.51-.98.72C4.35 15.36 8.42 17.01 13 17.01c5.24 0 9.49-4.25 9.49-9.49-.01-1.5-.41-2.88-1.09-4z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
