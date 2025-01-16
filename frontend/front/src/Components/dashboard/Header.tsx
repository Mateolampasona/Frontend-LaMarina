"use client";

import { Bell, Menu } from "lucide-react";
import { Avatar } from "@/Components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import Image from "next/image";
import { getUserById } from "@/helpers/users.helpers";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import Cookies from "js-cookie";
import { useUserContext } from "@/Context/userContext";

export function Header({
  onMenuClick,
  isSidebarOpen,
}: {
  onMenuClick: () => void;
  isSidebarOpen: boolean;
}) {
  const token = Cookies.get("accessToken") || "null";
  const { userId } = useUserContext();

  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      let parsedToken;
      try {
        parsedToken = JSON.parse(token);
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }
      if (typeof parsedToken !== "string") {
        console.error("Invalid token format");
        return;
      }
      try {
        const user = await getUserById(parsedToken, Number(userId));
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId && token) {
      fetchUser();
    }
  }, [userId, token]);

  console.log("user", user);
  return (
    <header className="flex h-16 items-center justify-between bg-[#edede9] px-4 shadow-sm">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className={`mr-4 rounded p-1 hover:bg-gray-100 ${
            isSidebarOpen ? "hidden" : "block"
          }`}
        >
          <Menu className="h-6 w-6 text-[#ef233c]" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="relative">
            <Bell className="h-6 w-6 text-[#ef233c]" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ef233c] text-xs text-white">
              3
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuItem>Nuevo usuario registrado</DropdownMenuItem>
            <DropdownMenuItem>Reportes listos</DropdownMenuItem>
            <DropdownMenuItem>Stock actualizado</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-8 w-8">
              <Image
                src={
                  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                }
                alt="Profile"
                width={300}
                height={300}
                className="rounded-full"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Ajustes</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              Cerrar Sesion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
