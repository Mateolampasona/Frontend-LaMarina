"use client";

import {
  Menu,
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/Components/ui/avatar";
import Image from "next/image";
import { useUserContext } from "@/Context/userContext";
import Cookies from "js-cookie";
import {  useEffect, useState } from "react";
import { getUserById } from "@/helpers/users.helpers";
import { IUser } from "@/interfaces/IUser";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "#" },
  { icon: Users, label: "Usuarios", href: "#" },
  { icon: FileText, label: "Reportes", href: "#" },
  { icon: BarChart3, label: "Analiticas", href: "#" },
  { icon: Settings, label: "Ajustes", href: "#" },
  { icon: LogOut, label: "Logout", href: "#" },
];

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {

  const token = Cookies.get("accessToken") || "null";
  const {userId} = useUserContext();

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
        const user = await getUserById(parsedToken, userId);
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
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 transform bg-[#edede9] transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="flex h-16 items-center justify-between px-4">
        <h1 className="text-xl font-semibold text-[#ef233c]">Admin Panel</h1>
        <button onClick={onClose} className="rounded p-1 hover:bg-gray-100">
          <Menu className="h-6 w-6 text-[#ef233c]" />
        </button>
      </div>


      <div className="mx-4 my-3 flex items-center space-x-4 border-b border-gray-200 pb-2">
        <Avatar className="h-12 w-12">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            width={340}
            height={340}
            alt="Profile"
            className="rounded-full"
          />
        </Avatar>
        <div>
          <p className="font-mono">Admin</p>
          <p className="text-sm text-gray-500">{user?.name}</p>
        </div>
      </div>

      <nav className="px-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="mb-1 flex items-center rounded-lg px-4 py-2 text-gray-700 transition-colors hover:bg-[#edede9] hover:text-[#ef233c]"
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
