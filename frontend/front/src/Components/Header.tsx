"use client";

import { useState } from "react";

import { ShoppingCart, Search, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Input } from "@/Components/ui/input";

import { Button } from "@/Components/ui/button";

import SideBar from "./SideBar";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
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
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Carrito</span>
          </Button>
          <Link href={"/Help"}>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="sr-only">Ayuda</span>
            </Button>
          </Link>
          <Link href={"/Login"}>
            <Button
              variant="default"
              className="bg-red-500 hover:bg-red-600 w-auto p-3 font-semibold"
            >
              Iniciar Sesion
            </Button>
          </Link>
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
