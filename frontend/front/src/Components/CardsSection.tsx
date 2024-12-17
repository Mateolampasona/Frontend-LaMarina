import { ProductCard } from "./Card"

const products = [
    // Productos de limpieza y utensilios
    {
      id: "1",
      name: "Detergente Multiusos",
      description: "Limpiador efectivo para todo tipo de superficies",
      price: 4.99,
      imageUrl: "/assets/logo.png",
      category: "Artículos de limpieza"
    },
    {
      id: "2",
      name: "Trapeador de Microfibra",
      description: "Trapeador suave y absorbente para pisos",
      price: 12.99,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "Utensilios de limpieza"
    },
    {
      id: "3",
      name: "Escoba de Cerdas Suaves",
      description: "Escoba ideal para barrer superficies duras sin rayar",
      price: 9.99,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "Utensilios de limpieza"
    },
    {
      id: "4",
      name: "Guantes de Limpieza",
      description: "Guantes resistentes para proteger las manos durante la limpieza",
      price: 5.99,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "Artículos de limpieza"
    },
    {
      id: "5",
      name: "Aspiradora Portátil",
      description: "Aspiradora compacta y potente para limpiar tu hogar",
      price: 39.99,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "Electrodomésticos"
    },
    {
      id: "6",
      name: "Limpiador de Vidrios",
      description: "Producto especializado para dejar los vidrios brillantes y sin marcas",
      price: 6.99,
      imageUrl: "/placeholder.svg?height=300&width=300",
      category: "Artículos de limpieza"
    },
    {
        id: "7",
        name: "Limpiador de Vidrios",
        description: "Producto especializado para dejar los vidrios brillantes y sin marcas",
        price: 6.99,
        imageUrl: "/placeholder.svg?height=300&width=300",
        category: "Artículos de limpieza"
      },
      {
        id: "8",
        name: "Limpiador de Vidrios",
        description: "Producto especializado para dejar los vidrios brillantes y sin marcas",
        price: 6.99,
        imageUrl: "/placeholder.svg?height=300&width=300",
        category: "Artículos de limpieza"
      }
  ];
  
export function ProductSection() {
  return (
    <section className="py-12 px-4 md:px-6 lg:px-8 bg-[#edede9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 ">Nuestros Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}