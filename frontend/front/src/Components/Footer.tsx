"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { useState } from "react";
import { newsLetterForm } from "@/helpers/newsLetter.helper";
import Swal from "sweetalert2";

export function Footer() {
  const [email, setEmail] = useState("");
  const handlesubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await newsLetterForm(email);

      Swal.fire({
        title: "¡Gracias por suscribirte!",
        text: "Recibirás nuestras últimas ofertas y novedades en tu correo.",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      setEmail("");
    } catch (error: unknown) {
      let errorMessage = "Ha ocurrido un error, por favor intenta de nuevo.";
      if (error instanceof Error) {
        if (error.message.includes("email should not be empty")) {
          errorMessage = "El correo electrónico no debe estar vacío.";
        } else if (error.message.includes("email must be an email")) {
          errorMessage = "El correo electrónico debe ser válido.";
        }
      }
      Swal.fire({
        title: "¡Ups!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  return (
    <footer className="bg-[#edede9] text-gray-700 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#ef233c]">
              Nuestra Tienda
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/sobreNosotross"
                  className="hover:text-[#ef233c] transition-colors"
                >
                  Sobre Nosotros
                </a>
              </li>
              <li>
                <a
                  href="/tienda"
                  className="hover:text-[#ef233c] transition-colors"
                >
                  Sucursal
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-[#ef233c] transition-colors">
                  Política de Privacidad
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#ef233c]">
              Atención al Cliente
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="help"
                  className="hover:text-[#ef233c] transition-colors"
                >
                  Contacto
                </a>
              </li>

              <li>
                <a
                  href="https://maps.app.goo.gl/tLYbA5hikWgXyDBx5"
                  className="hover:text-[#ef233c] transition-colors"
                  target="_blank"
                >
                  Mapa del Sitio
                </a>
              </li>
              <li>
                <a
                  href="help"
                  className="hover:text-[#ef233c] transition-colors"
                >
                  Preguntas Frecuentes
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#ef233c]">
              Mis Pedidos
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="user/dashboard"
                  className="hover:text-[#ef233c] transition-colors"
                >
                  Estado del Pedido
                </a>
              </li>
              <li>
                <a
                  href="user/dashboard"
                  className="hover:text-[#ef233c] transition-colors"
                >
                  Seguimiento de Envío
                </a>
              </li>
              <li>
                <a
                  href="user/dashboard"
                  className="hover:text-[#ef233c] transition-colors"
                >
                  Historial de Compras
                </a>
              </li>
              
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#ef233c]">Suscríbete</h3>
            <p className="text-sm">
              Recibe nuestras últimas ofertas y novedades.
            </p>
            <div className="flex space-x-2">
              <form onSubmit={handlesubmit}>
                <Input
                  type="email"
                  placeholder="Tu email"
                  className="bg-white mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  className="bg-[#ef233c] hover:bg-[#d90429] text-white transition-colors"
                  type="submit"
                >
                  Suscribir
                </Button>
              </form>
            </div>
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/lamarina.ok"
                className="text-gray-500 hover:text-[#ef233c] transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.instagram.com/lamarina_sanjuann"
                className="text-gray-500 hover:text-[#ef233c] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#ef233c] transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 text-center text-sm">
          <p>&copy; 2024 La Marina. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
