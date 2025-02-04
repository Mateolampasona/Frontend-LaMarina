"use client";
import {
  ChevronDown,
  LogOut,
  Menu,
  ShoppingBag,
  Home,
  Tag,
  Grid,
  HelpCircle,
  User,
} from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

const navItems = [
  {
    name: "Inicio",
    href: "/",
    icon: Home,
  },
  {
    name: "Productos",
    href: "#",
    icon: ShoppingBag,
    submenu: [
      { name: "Ofertas", href: "/ofertas", icon: Tag },
      { name: "Productos", href: "/productos", icon: Grid },
    ],
  },
  {
    name: "Categorías",
    href: "/categorias",
    icon: Grid,
    submenu: [
      { name: "Limpieza", href: "/categorias/limpieza", icon: ShoppingBag },
      { name: "Utensilios", href: "/categorias/utensilios", icon: ShoppingBag },
      { name: "Hogar", href: "/categorias/hogar", icon: ShoppingBag },
      { name: "Químicos", href: "/categorias/quimicos", icon: ShoppingBag },
    ],
  },
];

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const isAuthenticated = true; // Replace with actual authentication logic

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    // Add your logout logic here
  };

  return (
    <div className={`${montserrat.className} flex items-center`}>
      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="lg:hidden bg-[#ef233c]/90 p-2 rounded-full text-white backdrop-blur-xl shadow-lg hover:bg-[#ef233c] transition-all duration-300"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </motion.button>
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-full sm:w-[340px] p-0 bg-[#edede9]/95 backdrop-blur-xl text-gray-800"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200/20">
              <SheetTitle className="text-xl font-bold text-gray-800">
                Menu
              </SheetTitle>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="p-4 space-y-6">
                <div className="flex items-center justify-center">
                  <Avatar className="h-16 w-16 ring-2 ring-white/50 shadow-lg">
                    <AvatarImage
                      src="/placeholder.svg?height=64&width=64"
                      alt="User"
                    />
                    <AvatarFallback>
                      <Image
                        src="/assets/logo.png"
                        alt="La Marina Logo"
                        width={64}
                        height={64}
                        className="h-12 w-auto"
                      />
                    </AvatarFallback>
                  </Avatar>
                </div>

                <Accordion
                  type="single"
                  collapsible
                  className="w-full space-y-2"
                >
                  {navItems.map((item, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={item.name}
                      className="border-none bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden"
                    >
                      {item.submenu ? (
                        <>
                          <AccordionTrigger className="flex justify-between items-center w-full py-3 px-4 text-left text-sm font-semibold text-gray-800 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-[#ef233c]/20 transition-all duration-200">
                            <span className="flex items-center">
                              {item.icon && (
                                <item.icon className="mr-3 h-5 w-5 text-[#ef233c]" />
                              )}
                              {item.name}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent className="bg-white/10 px-4 py-2 space-y-1">
                            {item.submenu.map((subItem) => (
                              <motion.div
                                key={subItem.name}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Link
                                  href={subItem.href}
                                  className="flex items-center py-2 px-3 text-sm text-gray-700 hover:text-[#ef233c] rounded-xl hover:bg-white/30 transition-all duration-200"
                                  onClick={handleSidebarClose}
                                >
                                  {subItem.icon && (
                                    <subItem.icon className="mr-2 h-4 w-4" />
                                  )}
                                  {subItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </AccordionContent>
                        </>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-1"
                        >
                          <Link
                            href={item.href}
                            className={`flex items-center w-full py-3 px-4 text-sm font-semibold rounded-xl transition-all duration-200
                              ${
                                pathname === item.href
                                  ? "bg-white/40 text-[#ef233c]"
                                  : "text-gray-800 hover:bg-white/30"
                              }`}
                            onClick={handleSidebarClose}
                          >
                            {item.icon && (
                              <item.icon className="mr-3 h-5 w-5" />
                            )}
                            {item.name}
                          </Link>
                        </motion.div>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>

                {/* Mobile-only buttons */}
                <div className="lg:hidden space-y-2 mt-4">
                  <Link href="/help">
                    <Button className="w-full bg-white/30 hover:bg-white/40 text-gray-800 rounded-xl backdrop-blur-xl shadow-lg transition-all duration-300 h-11">
                      <HelpCircle className="mr-2 h-5 w-5" />
                      Ayuda
                    </Button>
                  </Link>
                  {isAuthenticated ? (
                    <Button
                      className="w-full bg-[#ef233c]/90 hover:bg-[#ef233c] backdrop-blur-xl shadow-lg rounded-xl h-11 font-semibold text-white transition-all duration-300"
                      onClick={() => {
                        handleSidebarClose();
                        handleLogout();
                      }}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Cerrar Sesión
                    </Button>
                  ) : (
                    <Link href="/login" className="w-full">
                      <Button
                        className="w-full bg-[#ef233c]/90 hover:bg-[#ef233c] backdrop-blur-xl shadow-lg rounded-xl h-11 font-semibold text-white transition-all duration-300"
                        onClick={handleSidebarClose}
                      >
                        <User className="mr-2 h-5 w-5" />
                        Iniciar Sesión
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <nav className="hidden lg:flex lg:space-x-2">
        {navItems.map((item) => (
          <div key={item.name} className="relative group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={item.href}
                className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  pathname === item.href
                    ? "text-[#ef233c] bg-white/50 backdrop-blur-xl shadow-lg"
                    : "text-gray-800 hover:bg-white/30 hover:backdrop-blur-xl"
                }`}
              >
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                {item.name}
                {item.submenu && <ChevronDown className="ml-1 h-4 w-4" />}
              </Link>
            </motion.div>
            {item.submenu && (
              <div className="absolute left-0 mt-2 w-48 rounded-2xl shadow-lg bg-white/95 backdrop-blur-xl ring-1 ring-black/5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out z-50">
                <div className="py-2" role="menu" aria-orientation="vertical">
                  {item.submenu.map((subItem) => (
                    <motion.div
                      key={subItem.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-1 mx-1"
                    >
                      <Link
                        href={subItem.href}
                        className="flex items-center px-3 py-2 text-sm text-gray-700 rounded-xl hover:bg-gray-100 hover:text-[#ef233c] transition-all duration-200"
                        role="menuitem"
                      >
                        {subItem.icon && (
                          <subItem.icon className="mr-2 h-4 w-4" />
                        )}
                        {subItem.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
