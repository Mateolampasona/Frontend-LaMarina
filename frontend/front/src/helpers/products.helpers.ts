import {
  ICreateProduct,
  IProduct,
  IUpdateproduct,
} from "@/interfaces/IProducts";
const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllProducts = async () => {
  try {
    const response = await fetch(`${APIURL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en GetAllProducts", error);
    throw error;
  }
};

export const getProductById = async (id: number): Promise<IProduct> => {
  try {
    const response = await fetch(`${APIURL}/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en GetProductById", error);
    throw error;
  }
};

export const createProduct = async (
  token: string,
  createProductDto: ICreateProduct
) => {
  try {
    const response = await fetch(`${APIURL}/products/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createProductDto),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en createProduct", error);
    throw error;
  }
};

export const modifyProduct = async (
  token: string,
  id: number,
  updateProduct: IUpdateproduct
) => {
  try {
    const response = await fetch(`${APIURL}/products/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en modifyProduct", error);
    throw error;
  }
};

export const deleteProduct = async (token: string, id: number) => {
  try {
    const response = await fetch(`${APIURL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en deleteProduct", error);
    throw error;
  }
};

export const uploadImage = async (token: string, id: string, image: File) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const response = await fetch(`${APIURL}/products/${id}/upload-image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en uploadImage", error);
    throw error;
  }
};
