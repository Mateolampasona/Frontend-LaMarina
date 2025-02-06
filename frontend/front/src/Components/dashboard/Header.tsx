"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import Cookies from "js-cookie";
import { getUserById } from "@/helpers/users.helpers";
import { useUserContext } from "@/Context/userContext";
import { IUser } from "@/interfaces/IUser";

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
        {user && (
          <div className="flex items-center">
            <span className="mr-2 text-gray-700">{user.name}</span>
          </div>
        )}
    </header>
  );
}
