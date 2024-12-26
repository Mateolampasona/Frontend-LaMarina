"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingCart, HelpCircle, ChevronDown } from "lucide-react";

const navItems = [
  {
    name: "Productos",
    href: "/productos",
    submenu: [
      { name: "Nuevos Productos", href: "/productos/nuevos" },
      { name: "Ofertas", href: "/productos/ofertas" },
      { name: "Todos los Productos", href: "./categories" },
    ],
  },
  {
    name: "Categorías",
    href: "/Categories",
    submenu: [
      { name: "Limpieza", href: "/categories" },
      { name: "Utencilios", href: "/categories" },
      { name: "Hogar", href: "/categories" },
      { name: "Quimicos", href: "/categories" },
      { name: "Todas Las categorias", href: "/Categories" },
    ],
  },
  { name: "Carrito", href: "/cart", icon: ShoppingCart },
  { name: "Ayuda", href: "/help", icon: HelpCircle },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#f5ebe0] shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/assets/logo.png"
                alt="La Marina Logo"
                width={62}
                height={62}
                className="h-8 w-auto"
              />
            </Link>
            <nav className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      pathname === item.href
                        ? "text-white bg-blue-600"
                        : "text-gray-700 hover:bgPrincipal hover:text-gray-900"
                    }`}
                  >
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    {item.name}
                    {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
                  </Link>
                  {item.submenu && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
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
          <div className="hidden md:flex items-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#ef233c] hover:bg-[#a93240] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </Link>
          </div>
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-red-500 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.name}>
                <button
                  onClick={() =>
                    setOpenSubmenu(openSubmenu === item.name ? null : item.name)
                  }
                  className={`${
                    pathname === item.href
                      ? "text-white bg-blue-600"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  } group flex items-center px-3 py-2 text-base font-medium rounded-md w-full`}
                >
                  {item.icon && <item.icon className="mr-3 h-5 w-5" />}
                  {item.name}
                  {item.submenu && (
                    <ChevronDown
                      className={`ml-auto h-5 w-5 transform transition-transform duration-200 ${
                        openSubmenu === item.name ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </button>
                {item.submenu && openSubmenu === item.name && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 rounded-md"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2">
              <Link
                href="/Login"
                className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
