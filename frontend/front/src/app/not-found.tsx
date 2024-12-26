import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center bg-[#edede9] justify-center min-h-screen  text-foreground">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-8">Página no encontrada</h2>
      <p className="text-lg mb-8 text-center max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <Button asChild>
        <Link href="/" className="flex items-center font-mono ">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver a la página principal
        </Link>
      </Button>
    </div>
  );
}
