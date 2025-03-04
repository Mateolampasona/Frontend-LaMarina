"use client";
import { useState, useEffect } from "react";
import { ShoppingCart, Search, HelpCircle, User } from "lucide-react";
import Link from "next/link";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import SideBar from "./SideBar";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserContext } from "@/Context/userContext";
import { getUserById } from "@/helpers/users.helpers";
import { getAllProducts } from "@/helpers/products.helpers"; // Importa la función para obtener productos
import type { IUser } from "@/interfaces/IUser";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import { IProduct } from "@/interfaces/IProducts";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>();
  const { userId } = useUserContext();
  const token = Cookies.get("accessToken");
  const router = useRouter();
  const [isUserDataReady, setIsUserDataReady] = useState(false);
  const [searchResults, setSearchResults] = useState<IProduct[]>([]); // Estado para almacenar los resultados de búsqueda
  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar la consulta de búsqueda

  useEffect(() => {
    const fetchUserData = async () => {
      if (token && userId) {
        setIsUserDataReady(true);
      } else {
        setTimeout(fetchUserData, 25);
      }
    };

    const timeoutId = setTimeout(() => {
      if (!token || !userId) {
        setIsUserDataReady(true);
      }
    }, 25);

    fetchUserData();

    return () => clearTimeout(timeoutId);
  }, [userId, token]); // Removed isUserDataReady from dependencies

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      if (!isUserDataReady) {
        return;
      }
      if (!token || !userId) {
        return;
      }
      if (!token) {
        console.error("No token found");
        return;
      }
      const parsedToken = JSON.parse(token);
      if (typeof parsedToken !== "string") {
        throw new Error("Invalid token format");
      }

      try {
        const data = await getUserById(parsedToken, Number(userId));
        setUser(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchUser();
  }, [userId, token, isUserDataReady]);

  useEffect(() => {
    // Verificar si la cookie de autenticación existe
    const token = Cookies.get("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Quieres cerrar sesión?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "bg-[#edede9] shadow-lg rounded-lg p-6",
        title: "text-2xl font-semibold text-gray-800",
        confirmButton:
          "bg-[#ef233c] hover:bg-[#d61e36] text-white font-bold py-2 px-4 rounded mr-2",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-2",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("accessToken");
        setIsAuthenticated(false);

        router.push("/login");
      }
    });
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const products = await getAllProducts(); // Obtén todos los productos
        const filteredProducts = products.filter((product: IProduct) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <nav className={`${montserrat.className} bg-[#edede9] sticky top-0 z-50`}>
      <header className="border-b border-gray-300/50">
        <div className="container mx-auto px-4 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden lg:block flex-shrink-0 mr-4">
              <Image
                src="/assets/logo.png"
                alt="La Marina Logo"
                width={62}
                height={62}
                className="h-8 w-auto"
              />
            </Link>
            <SideBar />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex relative w-64">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pr-8 bg-white/30 border-gray-200/20 text-gray-800 placeholder-gray-600 rounded-full backdrop-blur-xl shadow-lg focus:ring-2 focus:ring-[#ef233c]/20 focus:border-[#ef233c]/20 transition-all duration-300"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-600/70" />
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                  {searchResults.map((product) => (
                    <Link
                      key={product.productId}
                      href={`/product/${product.productId}`}
                    >
                      <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="h-12 w-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-gray-600">${product.price}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="md:hidden bg-white/30 p-2 rounded-full text-gray-800 backdrop-blur-xl shadow-lg hover:bg-white/40 transition-all duration-300"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Buscar</span>
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/cart">
                <Button className="bg-white/30 hover:bg-white/40 text-gray-800 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 p-2 md:p-2.5">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Carrito</span>
                </Button>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/help">
                <Button className="bg-white/30 hover:bg-white/40 text-gray-800 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 hidden md:inline-flex p-2.5">
                  <HelpCircle className="h-5 w-5" />
                  <span className="sr-only">Ayuda</span>
                </Button>
              </Link>
            </motion.div>
            {isAuthenticated && user && (
              <>
                {user.role === "admin" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/admin/dashboard">
                      <Button className="bg-white/30 hover:bg-white/40 text-gray-800 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 hidden md:inline-flex p-2.5">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Admin</span>
                      </Button>
                    </Link>
                  </motion.div>
                )}
                {user.role === "user" && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/user/dashboard">
                      <Button className="bg-white/30 hover:bg-white/40 text-gray-800 rounded-full backdrop-blur-xl shadow-lg transition-all duration-300 hidden md:inline-flex p-2.5">
                        <User className="h-5 w-5" />
                        <span className="sr-only">Mi Perfil</span>
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </>
            )}
            {isAuthenticated ? (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Button
                  className="bg-[#ef233c]/90 hover:bg-[#ef233c] backdrop-blur-xl shadow-lg rounded-full px-6 py-2 font-semibold text-white transition-all duration-300"
                  onClick={handleLogout}
                >
                  Cerrar Sesión
                </Button>
              </motion.div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link href="/login">
                  <Button className="bg-[#ef233c]/90 hover:bg-[#ef233c] backdrop-blur-xl shadow-lg rounded-full px-6 py-2 font-semibold text-white transition-all duration-300">
                    Iniciar Sesión
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden p-4 border-t border-gray-300/50"
          >
            <div className="relative">
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full bg-white/30 border-gray-200/20 text-gray-800 placeholder-gray-600 rounded-full backdrop-blur-xl shadow-lg pr-8"
                value={searchQuery}
                onChange={handleSearch}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-600/70" />
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white shadow-lg rounded-lg z-10">
                  {searchResults.map((product) => (
                    <Link
                      key={product.productId}
                      href={`/product/${product.productId}`}
                    >
                      <div className="p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={50}
                          height={50}
                          className="h-12 w-12 object-cover rounded"
                        />
                        <div>
                          <div className="font-semibold">{product.name}</div>
                          <div className="text-gray-600">${product.price}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </header>
    </nav>
  );
}
