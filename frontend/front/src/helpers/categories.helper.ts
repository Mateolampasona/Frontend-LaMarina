import { ICreateCategory, IModifyCategory } from "@/interfaces/ICategory";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllCategories = async () => {
  try {
    const response = await fetch(`${APIURL}/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en GetAllCategories", error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await fetch(`${APIURL}/categories/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en GetCategoryById", error);
    throw error;
  }
};

export const createCategory = async (
  token: string,
  createCategoryDto: ICreateCategory
) => {
  try {
    const response = await fetch(`${APIURL}/categories/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCategoryDto),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en createCategory", error);
    throw error;
  }
};

export const deleteCategory = async (token: string, id: number) => {
  try {
    const response = await fetch(`${APIURL}/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      const res = await response.json();
      console.log("res", res);
      return res;
    } else {
      const text = await response.text();
      return { ok: response.ok, message: text };
    }
  } catch (error) {
    console.log("Ocurrio un error en deleteCategory", error);
    throw error;
  }
};

export const modifyCategory = async (
  token: string,
  id: number,
  createCategoryDto: IModifyCategory
) => {
  try {
    const response = await fetch(`${APIURL}/categories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createCategoryDto),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en modifyCategory", error);
    throw error;
  }
};
