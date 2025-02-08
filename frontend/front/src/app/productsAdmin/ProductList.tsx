import type { IProduct } from "@/Interfaces/IProducts"
import { Pencil, Trash2 } from 'lucide-react'

interface ProductListProps {
  products: IProduct[]
  onEdit: (product: IProduct) => void
  onDelete: (productId: number) => void
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg px-6 pt-4 pb-6 mb-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Lista de Productos</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Precio
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Existencias
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-4 py-2 border-b border-gray-200 bg-gray-50 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.productId} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8">
                      <img
                        className="w-full h-full rounded-md object-cover"
                        src={product.imageUrl || "/placeholder.svg"}
                        alt={product.name}
                      />
                    </div>
                    <div className="ml-2">
                      <p className="text-gray-900 font-medium">{product.name}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  <p className="text-gray-900 font-medium">${product.price.toFixed(2)}</p>
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100">
                    {product.stock}
                  </span>
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  <span className="text-gray-700">{product.category_id.name}</span>
                </td>
                <td className="px-4 py-3 border-b border-gray-200 text-sm">
                  <div className="flex space-x-3">
                    <button 
                      onClick={() => onEdit(product)} 
                      className="text-blue-600 hover:text-blue-900 transition-colors duration-150 p-1 rounded-full hover:bg-blue-50"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(product.productId)} 
                      className="text-[#ef233c] hover:text-red-700 transition-colors duration-150 p-1 rounded-full hover:bg-red-50"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

