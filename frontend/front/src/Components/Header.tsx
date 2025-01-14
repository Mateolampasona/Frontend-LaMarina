"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Search, HelpCircle, User } from "lucide-react";
import Link from "next/link";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación
  const router = useRouter();

  useEffect(() => {
    // Verificar si la cookie de autenticación existe
    const token = Cookies.get("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Eliminar la cookie de autenticación
    Cookies.remove("accessToken");
    setIsAuthenticated(false);

    router.push("/login");
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <SideBar />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex relative w-64">
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="pr-8 bg-[#edede9] border-gray-600"
            />
            <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Buscar</span>
          </Button>
          <Link href={"/cart"}>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrito</span>
            </Button>
          </Link>
          <Link href={"/help"}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Ayuda</span>
            </Button>
          </Link>
          <Link href={"/admin/dashboard"}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Ayuda</span>
            </Button>
          </Link>
          <Link href={"/user/dashboard"}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
            >
              <User className="h-5 w-5" />
              <span className="sr-only">Ayuda</span>
            </Button>
          </Link>
          {isAuthenticated ? (
            <Button
              variant="default"
              className="bg-red-500 hover:bg-red-600 w-auto p-3 font-semibold"
              onClick={handleLogout}
            >
              Cerrar Sesión
            </Button>
          ) : (
            <Link href={"/login"}>
              <Button
                variant="default"
                className="bg-red-500 hover:bg-red-600 w-auto p-3 font-semibold"
              >
                Iniciar Sesión
              </Button>
            </Link>
          )}
        </div>
      </div>

      {isSearchOpen && (
        <div className="md:hidden p-4 border-t">
          <Input
            type="search"
            placeholder="Buscar productos..."
            className="w-full"
          />
        </div>
      )}
    </header>
  );
}
