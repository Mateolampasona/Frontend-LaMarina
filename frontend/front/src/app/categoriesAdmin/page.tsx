"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { Plus, Edit, Trash2, Save, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Label } from "@/Components/ui/label";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

interface ICategory {
  id: number;
  name: string;
  description: string;
}

interface ICreateCategory {
  name: string;
  description: string;
}



export default function CategoryManagement() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState<ICreateCategory>({
    name: "",
    description: "",
  });
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<ICategory | null>(
    null
  );

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${APIURL}/categories`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al cargar categorías");
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("No se pudieron cargar las categorías.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newCategory.name.trim() && newCategory.description.trim()) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${APIURL}/categories/create`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: newCategory.name,
            description: newCategory.description,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error al crear la categoría");
        }

        await fetchCategories();
        setNewCategory({ name: "", description: "" });
      } catch (error: any) {
        console.error("Error creating category:", error);
        setError(error.message || "No se pudo crear la categoría.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const startEditing = (category: ICategory) => {
    // Si ya estamos editando esta categoría, cancelamos la edición
    if (editingCategory?.id === category.id) {
      setEditingCategory(null);
    } else {
      // Si no, comenzamos a editar
      setEditingCategory({ ...category });
    }
  };

  const cancelEditing = () => {
    setEditingCategory(null);
  };

  const saveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${APIURL}/categories/${editingCategory.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: editingCategory.name,
              description: editingCategory.description,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Error al actualizar la categoría");
        }

        await fetchCategories();
        setEditingCategory(null);
      } catch (error: any) {
        console.error("Error updating category:", error);
        setError(error.message || "No se pudo actualizar la categoría.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const confirmDelete = (category: ICategory) => {
    setCategoryToDelete(category);
    setIsDeleteDialogOpen(true);
  };

  const deleteCategory = async () => {
    if (categoryToDelete) {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${APIURL}/categories/${categoryToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || "Error al eliminar la categoría");
        }

        await fetchCategories();
        setIsDeleteDialogOpen(false);
        setCategoryToDelete(null);
      } catch (error: any) {
        console.error("Error deleting category:", error);
        setError(error.message || "No se pudo eliminar la categoría.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#ef233c]">
          Gestión de Categorías
        </h1>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Agregar Nueva Categoría
          </h2>
          <form onSubmit={addCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-category-name">Nombre</Label>
              <Input
                id="new-category-name"
                placeholder="Nombre de la categoría"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
                className="w-full focus:ring-2 focus:ring-[#ef233c] focus:border-transparent"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-category-description">Descripción</Label>
              <Textarea
                id="new-category-description"
                placeholder="Descripción de la categoría"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
                className="w-full focus:ring-2 focus:ring-[#ef233c] focus:border-transparent"
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#ef233c] text-white hover:bg-[#d90429] transition-colors duration-300"
              disabled={
                isLoading ||
                !newCategory.name.trim() ||
                !newCategory.description.trim()
              }
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Agregar Categoría
            </Button>
          </form>
        </Card>

        <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="mb-6 text-xl font-semibold text-gray-800">
            Categorías Existentes
          </h2>
          {isLoading && categories.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <Loader2 className="h-8 w-8 animate-spin text-[#ef233c]" />
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              No hay categorías disponibles
            </div>
          ) : (
            <div className="space-y-6">
              {categories.map((category) => (
                <div key={category.id} className="border-b pb-4 last:border-0">
                  {editingCategory?.id === category.id ? (
                    <form onSubmit={saveEdit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edit-category-name-${category.id}`}>
                          Nombre
                        </Label>
                        <Input
                          id={`edit-category-name-${category.id}`}
                          value={editingCategory ? editingCategory.name : ""}
                          onChange={(e) =>
                            setEditingCategory({
                              ...editingCategory,
                              name: e.target.value,
                            })
                          }
                          className="w-full focus:ring-2 focus:ring-[#ef233c] focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor={`edit-category-description-${category.id}`}
                        >
                          Descripción
                        </Label>
                        <Textarea
                          id={`edit-category-description-${category.id}`}
                          value={
                            editingCategory ? editingCategory.description : ""
                          }
                          onChange={(e) =>
                            setEditingCategory({
                              ...editingCategory,
                              description: e.target.value,
                            })
                          }
                          className="w-full focus:ring-2 focus:ring-[#ef233c] focus:border-transparent"
                          required
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button
                          type="submit"
                          className="bg-green-500 text-white hover:bg-green-600 transition-colors duration-300"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          ) : (
                            <Save className="mr-2 h-4 w-4" />
                          )}
                          Guardar
                        </Button>
                        <Button
                          onClick={cancelEditing}
                          type="button"
                          className="bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-300"
                          disabled={isLoading}
                        >
                          <X className="mr-2 h-4 w-4" /> Cancelar
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <div className="bg-white rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-gray-700">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        {category.description}
                      </p>
                      <div className="flex justify-end space-x-2 mt-4">
                        <Button
                          onClick={() => startEditing(category)}
                          className="bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
                          disabled={isLoading}
                        >
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </Button>
                        <Button
                          onClick={() => confirmDelete(category)}
                          className="bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                          disabled={isLoading}
                        >
                          <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
          </DialogHeader>
          <p>
            ¿Estás seguro de que quieres eliminar la categoría "
            {categoryToDelete?.name}"?
          </p>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              variant="outline"
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              onClick={deleteCategory}
              variant="destructive"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Eliminar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
