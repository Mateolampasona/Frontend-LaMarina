import { ShoppingCart, Sparkles } from "lucide-react";

export default function SectionOne() {
  return (
    <section className="relative h-screen bg-[#edede9] overflow-hidden">
      <div className="absolute inset-0"></div>
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center z-10">
        <Sparkles className="text-[#ef233c] w-16 h-16 mb-8 animate-pulse" />
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-600 mb-6 tracking-tight">
          Bienvenido a <span className="text-[#ef233c]">La Marina</span>
        </h1>
        <p className="text-xl md:text-2xl font-mono text-gray-600 mb-12 max-w-2xl">
          Tu destino para productos de limpieza y bazar de calidad superior
        </p>
        <button className="group bg-[#ef233c] text-white-50 font-bold py-4 px-8 rounded-full hover:bg-[#e5384c] transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg flex items-center space-x-2">
          <span className="text-white">Comprar Ahora</span>
          <ShoppingCart className="w-5 h-5 group-hover:animate-bounce text-white" />
        </button>
      </div>
      <div className="absolute bottom-0  left-0 w-full h-24 bg-gradient-to-t from-white opacity-20"></div>
    </section>
  );
}
