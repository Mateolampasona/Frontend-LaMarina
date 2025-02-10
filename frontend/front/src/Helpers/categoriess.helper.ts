import axios from "axios";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Eliminar categoría
export const deleteCategory = async (id: string) => {
  try {
    const response = await axios.delete(`${APIURL}/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

// Modificar categoría
interface CategoryData {
  name: string;
  description?: string;
  // Add other fields as necessary
}

export const updateCategory = async (id: string, categoryData: CategoryData) => {
  try {
    const response = await axios.put(
      `${APIURL}/categories/${id}`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

// Crear categoría
export const createCategory = async (categoryData: CategoryData) => {
  try {
    const response = await axios.post(
      `${APIURL}/categories/create`,
      categoryData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};
