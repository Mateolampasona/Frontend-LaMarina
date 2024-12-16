import React from "react";
import { Filter } from "lucide-react";

interface MobileFilterToggleProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileFilterToggle: React.FC<MobileFilterToggleProps> = ({
  isOpen,
  setIsOpen,
}) => {
  return (
    <button
      className="lg:hidden flex items-center justify-center w-full py-2 mb-4 bg-gray-200 rounded-md"
      onClick={() => setIsOpen(!isOpen)}
    >
      <Filter className="w-5 h-5 mr-2" />
      {isOpen ? "Ocultar filtros" : "Mostrar filtros"}
    </button>
  );
};

export default MobileFilterToggle;
