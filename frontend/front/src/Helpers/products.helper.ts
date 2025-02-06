import axios from "axios";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Modificar producto
export const updateProduct = async (id: string, productData: Record<string, unknown>) => {
  try {
    const response = await axios.put(`${APIURL}/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

// Eliminar producto
export const deleteProduct = async (id: string) => {
  try {
    const response = await axios.delete(`${APIURL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Crear producto
interface ProductData {
  name: string;
  price: number;
  description?: string;
  // Add other fields as necessary
}

export const createProduct = async (productData: ProductData) => {
  try {
    const response = await axios.post(`${APIURL}/products/create`, productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

// Subir imagen del producto
export const uploadProductImage = async (id: string, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await axios.post(
      `${APIURL}/products/${id}/upload-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading product image:", error);
    throw error;
  }
};

// Aplicar descuento a un producto
export const applyProductDiscount = async (id: string, discount: number) => {
  try {
    const response = await axios.patch(`${APIURL}/products/${id}/discount`, {
      discount,
    });
    return response.data;
  } catch (error) {
    console.error("Error applying discount to product:", error);
    throw error;
  }
};
