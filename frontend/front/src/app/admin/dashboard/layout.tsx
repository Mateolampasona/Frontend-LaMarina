"use client";

import { useState } from "react";
import { Sidebar } from "@/Components/dashboard/SideBar";
import { Header } from "@/Components/dashboard/Header";
import { UserProvider } from "@/Context/userContext";
// import { useAuth } from "@/Context/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const { isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //   if (!isAuthenticated) {
  //     return (
  //       <div>
  //         Por favor, inicia sesión para acceder al panel de administración.
  //       </div>
  //     );
  //   }

  return (
    <UserProvider>
    <div className="min-h-screen bg-[#edede9]">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={`
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? "ml-64 blur-sm" : "ml-0 blur-none"}
          `}
          >
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          isSidebarOpen={sidebarOpen}
          />
        <main className="container mx-auto p-6">{children}</main>
      </div>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-transparent" />}
    </div>
          </UserProvider>
  );
}
