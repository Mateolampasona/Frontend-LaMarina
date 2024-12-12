import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium transition-colors hover:text-primary"
      >
        Inicio
      </Link>
      <Link
        href="/productos"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Productos
      </Link>
      <Link
        href="/ofertas"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Ofertas
      </Link>
      <Link
        href="/contacto"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Contacto
      </Link>
    </nav>
  );
}
