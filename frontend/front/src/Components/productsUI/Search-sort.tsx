"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

interface SearchSortProps {
  onSearch: (term: string) => void;
  onSort: (sortBy: string) => void;
}

export default function SearchSort({ onSearch, onSort }: SearchSortProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
      </div>

      <Select onValueChange={onSort}>
        <SelectTrigger className="w-full sm:w-[200px]">
          <SelectValue placeholder="Ordenar por" />
        </SelectTrigger>
        <SelectContent>
         
          <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
          <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
          <SelectItem value="name-asc">Nombre: A-Z</SelectItem>
          <SelectItem value="name-desc">Nombre: Z-A</SelectItem>
          <SelectItem value="popular">Más vendidos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
