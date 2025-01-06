import {
  MapPin,
  Clock,
  Phone,
  ShoppingBag,
  Truck,
  CreditCard,
} from "lucide-react";

import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import Link from "next/link";

export default function TiendaVistaMejorada() {
  return (
    <div className="bg-[#edede9] text-gray-800 min-h-screen">
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-4">Descubre Nuestra Tienda</h1>
          <p className="text-md mb-8 max-w-2xl mx-auto">
            Explora una experiencia de compra única con productos de alta
            calidad y un servicio excepcional.
          </p>
          <Link href={"/"}>
            <Button className="bg-[#ef233c] text-white hover:bg-[#d90429] transition-colors">
              Ver Catálogo
            </Button>
          </Link>
        </section>

        {/* Características de la tienda */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShoppingBag,
                title: "Amplia Selección",
                description: "Miles de productos para elegir",
              },
              {
                icon: Truck,
                title: "Envío Rápido",
                description: "Entrega en 24-48 horas",
              },
              {
                icon: CreditCard,
                title: "Pago Seguro",
                description: "Múltiples opciones de pago",
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-white">
                <CardContent className="flex flex-col items-center text-center p-6">
                  <feature.icon className="w-12 h-12 mb-4 text-[#ef233c]" />
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mapa e información de contacto */}
        <section className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white">
            <CardContent className="p-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54408.02927285013!2d-68.58540268046877!3d-31.53783973014947!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96816a9d5c082971%3A0x37d0f024be8cf4c0!2sLa%20Marina!5e0!3m2!1ses!2sar!4v1736122118695!5m2!1ses!2sar"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                className="rounded-lg"
              ></iframe>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="flex flex-col justify-center h-full p-8">
              <h3 className="text-2xl font-semibold mb-6">
                Información de Contacto
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <MapPin className="mr-4 w-6 h-6" />
                  <span>
                    General M. Acha Sur 395, Santa Fe esquina General Acha
                    <br />
                    <a
                      href="https://g.co/kgs/4oudpWZ"
                      target="_blank"
                      className="text-blue-600"
                    >
                      Ver en el mapa
                    </a>
                  </span>
                </li>
                <li className="flex items-center">
                  <Clock className="mr-4 w-6 h-6" />
                  <span>Lun - Sáb: 9:00 AM - 8:00 PM</span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-4 w-6 h-6" />
                  <span>+264 572 4251</span>
                </li>
              </ul>
              <Button className="mt-8 bg-[#ef233c] text-white hover:bg-[#d90429] transition-colors">
                Contáctanos
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
