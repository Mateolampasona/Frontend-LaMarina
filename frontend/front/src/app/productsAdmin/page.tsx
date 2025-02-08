"use client"

import { useState, useEffect } from "react"
import { getAllProducts, createProduct, modifyProduct, deleteProduct } from "@/helpers/products.helpers"
import type { IProduct, ICreateProduct, IUpdateproduct } from "@/Interfaces/IProducts"
import ProductForm from "./ProductForm"
import ProductList from "./ProductList"
import DeleteConfirmationModal from "./DeleteConfirmationModal"

export default function ProductManagement() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getAllProducts()
      setProducts(fetchedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
      // You might want to set an error state here and display it to the user
    }
  }

  const handleCreateProduct = async (productData: ICreateProduct) => {
    try {
      const token = "your-auth-token" // Replace with actual auth token
      const newProduct = await createProduct(token, productData)
      setProducts([...products, newProduct])
    } catch (error) {
      console.error("Error creating product:", error)
      // Handle error (e.g., show error message to user)
    }
  }

  const handleUpdateProduct = async (id: number, productData: IUpdateproduct) => {
    try {
      const token = "your-auth-token" 
      const updatedProduct = await modifyProduct(token, id.toString(), productData)
      setProducts(products.map((p) => (p.productId === id ? updatedProduct : p)))
      setEditingProduct(null)
    } catch (error) {
      console.error("Error updating product:", error)
      
    }
  }

  const handleDeleteProduct = async () => {
    if (productToDelete) {
      try {
        const token = "your-auth-token" 
        await deleteProduct(token, productToDelete.toString())
        setProducts(products.filter((p) => p.productId !== productToDelete))
        setIsDeleteModalOpen(false)
        setProductToDelete(null)
      } catch (error) {
        console.error("Error deleting product:", error)
        
      }
    }
  }

  const handleEditProduct = (product: IProduct) => {
    setEditingProduct(product)
  }

  const handleCancelEdit = () => {
    setEditingProduct(null)
  }

  const openDeleteModal = (productId: number) => {
    setProductToDelete(productId)
    setIsDeleteModalOpen(true)
  }

  const handleSubmit = (data: ICreateProduct | IUpdateproduct) => {
    if (editingProduct) {
      handleUpdateProduct(editingProduct.productId, data as IUpdateproduct);
    } else {
      handleCreateProduct(data as ICreateProduct);
    }
  };

  return (
    <div className="min-h-screen bg-[#edede9] text-gray-800">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        
        <div className="grid gap-6 lg:gap-8 md:grid-cols-[1fr,2fr] items-start">
          {/* Formulario */}
          <div className="bg-white/80 rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1">
            <h2 className="text-xl font-semibold font-mono mb-6 pb-2 border-b border-gray-200">
              {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
            </h2>
            <ProductForm
              onSubmit={handleSubmit}
              initialData={editingProduct}
              onCancel={handleCancelEdit}
            />
          </div>

          {/* Lista de Productos */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold font-mono mb-6 pb-2 border-b border-gray-200">
              Lista de Productos
            </h2>
            <div className="overflow-x-auto">
              <ProductList 
                products={products} 
                onEdit={handleEditProduct} 
                onDelete={openDeleteModal} 
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteProduct}
      />
    </div>
  )
}

