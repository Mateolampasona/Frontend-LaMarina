"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

interface UserContextProps {
  role: string | null;
  setRole: React.Dispatch<React.SetStateAction<string | null>>;
  userId: string;
}
interface DecodedToken {
  role?: string;
  sub?: string;
  email?:string
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');  
  
  useEffect(() => {
    const token = Cookies.get("accessToken");
    const parsedToken = JSON.parse(token || "null");
    if (parsedToken) {
      try {
        const decodedToken = jwt.decode(parsedToken) as DecodedToken | null;
        console.log("Decoded token:", decodedToken);
        const role = decodedToken?.role;
        console.log("Roles:", role);
        if (role) {
          setRole(role);
        }
        const userId = decodedToken?.sub;
        console.log("UserId:", userId);
        if (userId) {
          setUserId(userId);
        }
      } catch (error: unknown) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ role, setRole, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
