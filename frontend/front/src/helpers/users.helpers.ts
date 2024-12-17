import { IBanUser, ICreateUser, IModifyUser } from "@/interfaces/IUser";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllUsers = async (token: string) => {
  try {
    const response = await fetch(`${APIURL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en GetAllUsers", error);
    throw error;
  }
};

export const getUserById = async (token: string, id: string) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en GetUserById", error);
    throw error;
  }
};

export const modifyUser = async (
  token: string,
  id: number,
  modifyData: IModifyUser
) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(modifyData),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en modifyUser", error);
    throw error;
  }
};

export const createUser = async (token: string, createData: ICreateUser) => {
  try {
    const response = await fetch(`${APIURL}/users/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createData),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en createUser", error);
    throw error;
  }
};

export const deleteUser = async (token: string, id: number) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en deleteUser", error);
    throw error;
  }
};

export const banUser = async (token: string, id: number, data: IBanUser) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}/ban`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en banUser", error);
    throw error;
  }
};

export const unbanUser = async (token: string, id: number) => {
  try {
    const response = await fetch(`${APIURL}/users/${id}/unban`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en unbanUser", error);
    throw error;
  }
};
