"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  ShoppingCart,
  ChevronDown,
  Search,
  HelpCircle,
  Menu,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Input } from "@/Components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/Components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  
} from "@/Components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";

const navItems = [
  {
    name: "Productos",
    href: "/productos",
    submenu: [
      { name: "Nuevos Productos", href: "/productos/nuevos" },
      { name: "Ofertas", href: "/productos/ofertas" },
      { name: "Todos los Productos", href: "/productos/todos" },
    ],
  },
  {
    name: "Categorías",
    href: "/categorias",
    submenu: [
      { name: "Limpieza", href: "/categorias/limpieza" },
      { name: "Utensilios", href: "/categorias/utensilios" },
      { name: "Hogar", href: "/categorias/hogar" },
      { name: "Químicos", href: "/categorias/quimicos" },
    ],
  },
];

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar el sidebar

  const handleSidebarClose = () => {
    setIsSidebarOpen(false); // Función para cerrar el sidebar
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-8">
          {/* Botón de abrir el sidebar */}
          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsSidebarOpen(true)} // Abrir el sidebar
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between mb-8">
                  {/* Avatar */}
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                    <AvatarFallback>
                    <Image
              src="/assets/logo.png"
              alt="La Marina Logo"
              width={62}
              height={62}
              className="h-8 w-auto"
            />
                    </AvatarFallback>
                  </Avatar>

                  {/* Botón de cerrar el sidebar */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleSidebarClose} // Cerrar el sidebar
                    aria-label="Close menu"
                  >
                    <LogOut className="h-6 w-6" />
                  </Button>
                </div>

                {/* Menú en el sidebar */}
                <Accordion type="single" collapsible className="space-y-2">
                  {navItems.map((item, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={item.name}
                      className="border-b border-gray-200 last:border-b-0"
                    >
                      {item.submenu ? (
                        <>
                          <AccordionTrigger className="flex justify-between items-center py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            {item.name}
                          </AccordionTrigger>
                          <AccordionContent className="bg-gray-50">
                            <div className="py-2 px-4 space-y-1">
                              {item.submenu.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="flex items-center py-2 px-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                                  onClick={handleSidebarClose} // Cerrar el sidebar al hacer clic
                                >
                                  {subItem.name === "Profile" ? (
                                    <User className="mr-2 h-4 w-4" />
                                  ) : (
                                    <Settings className="mr-2 h-4 w-4" />
                                  )}
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex items-center py-3 px-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={handleSidebarClose} // Cerrar el sidebar al hacer clic
                        >
                          {item.name === "Dashboard" && <Menu className="mr-2 h-4 w-4" />}
                          {item.name === "Help" && <HelpCircle className="mr-2 h-4 w-4" />}
                          {item.name}
                        </Link>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>

                <Button
                  variant="destructive"
                  className="w-full mt-8"
                  onClick={handleSidebarClose} // Cerrar el sidebar al hacer clic
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/assets/logo.png"
              alt="La Marina Logo"
              width={62}
              height={62}
              className="h-8 w-auto"
            />
          </Link>

          {/* Menú en escritorio */}
          <nav className="hidden lg:flex lg:space-x-4">
            {navItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? "text-white bg-blue-600"
                      : "text-gray-700 hover:bg-blue-50 hover:text-gray-900"
                  }`}
                >
                  {item.name}
                  {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          role="menuitem"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* Otros botones */}
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
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Carrito</span>
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">Ayuda</span>
          </Button>
          <Button variant="default" className="bg-red-500 hover:bg-red-600">
            Sign up
          </Button>
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
