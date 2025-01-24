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
import { IUser } from "@/interfaces/IUser";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser>();
  const { userId } = useUserContext();
  const token = Cookies.get("accessToken");
  const router = useRouter();
  const [isUserDataReady, setIsUserDataReady] = useState(false);

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
  }, [userId, token]);

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
  }, [userId, token]);

  useEffect(() => {
    // Verificar si la cookie de autenticación existe
    const token = Cookies.get("accessToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      customClass: {
        popup: "bg-white shadow-lg rounded-lg p-6",
        title: "text-2xl font-semibold text-gray-800",
        confirmButton:
          "bg-[#D9534F] hover:bg-[#C9302C] text-white font-bold py-2 px-4 rounded",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded",
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

  return (
    <nav>
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
            {isAuthenticated && user && (
              <>
                {user.role === "admin" && (
                  <Link href={"/admin/dashboard"}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:inline-flex"
                    >
                      <User className="h-5 w-5" />
                      <span className="sr-only">Admin</span>
                    </Button>
                  </Link>
                )}
                {user.role === "user" && (
                  <Link href={"/user/dashboard"}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:inline-flex"
                    >
                      <User className="h-5 w-5" />
                      <span className="sr-only">Mi Perfil</span>
                    </Button>
                  </Link>
                )}
              </>
            )}
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
    </nav>
  );
}
