import { IDiscount, IDiscountProps } from "@/interfaces/IDiscount";
import Swal from "sweetalert2";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createDiscount = async (
  discountData: IDiscountProps,
  token: string
) => {
  try {
    console.log("Datos enviados:", discountData);
    const response = await fetch(`${APIURL}/discounts/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(discountData),
    });
    console.log("Estado de la respuesta:", response.status);
    if (!response.ok) {
      const resText = await response.text();
      console.log("Texto de la respuesta de error:", resText);
      let res;
      try {
        res = JSON.parse(resText);
      } catch (e) {
        console.error("Error al parsear la respuesta como JSON:", e);
        throw new Error("Respuesta no es un JSON válido");
      }
      if (response.status === 400) {
        Swal.fire({
          title: res.message,
          icon: "error",
          customClass: {
            popup: "bg-white shadow-lg rounded-lg p-6",
            title: "text-2xl font-semibold text-gray-800",
            confirmButton:
              "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        });
        throw new Error(res.message);
      }
    } else {
      const res = await response.json();
      console.log("Respuesta exitosa:", res);
      return res;
    }
  } catch (error) {
    console.error("Error al crear descuento:", error);
    throw error;
  }
};

export const deleteDiscount = async (discountId: number, token: string) => {
  try {
    const response = await fetch(`${APIURL}/discounts/delete/${discountId}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Estado de la respuesta:", response.status);
    if (!response.ok) {
      const resText = await response.text();
      console.log("Texto de la respuesta de error:", resText);
      let res;
      try {
        res = JSON.parse(resText);
      } catch (e) {
        console.error("Error al parsear la respuesta como JSON:", e);
        throw new Error("Respuesta no es un JSON válido");
      }
      if (response.status === 400) {
        Swal.fire({
          title: res.message,
          icon: "error",
          customClass: {
            popup: "bg-white shadow-lg rounded-lg p-6",
            title: "text-2xl font-semibold text-gray-800",
            confirmButton:
              "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        });
        throw new Error(res.message);
      }
    } else {
      const res = await response.json();
      console.log("Respuesta exitosa:", res);
      return res;
    }
  } catch (error) {
    console.error("Error al eliminar descuento:", error);
    throw error;
  }
};

export const getAllDiscounts = async (token: string) => {
  try {
    const response = await fetch(`${APIURL}/discounts`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Estado de la respuesta:", response.status);
    if (!response.ok) {
      const resText = await response.text();
      console.log("Texto de la respuesta de error:", resText);
      let res;
      try {
        res = JSON.parse(resText);
      } catch (e) {
        console.error("Error al parsear la respuesta como JSON:", e);
        throw new Error("Respuesta no es un JSON válido");
      }
      if (response.status === 400) {
        Swal.fire({
          title: res.message,
          icon: "error",
          customClass: {
            popup: "bg-white shadow-lg rounded-lg p-6",
            title: "text-2xl font-semibold text-gray-800",
            confirmButton:
              "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        });
        throw new Error(res.message);
      }
    } else {
      const res = await response.json();
      console.log("Respuesta exitosa:", res);
      return res as IDiscount[];
    }
  } catch (error) {
    console.error("Error al obtener descuentos:", error);
    throw error;
  }
};

export const updateDiscount = async (
  iUpdateDiscount: IDiscountProps,
  id: number,
  token: string
) => {
  try {
    console.log("Datos enviados:", iUpdateDiscount);
    const response = await fetch(`${APIURL}/discounts/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(iUpdateDiscount),
    });
    console.log("Estado de la respuesta:", response.status);
    if (!response.ok) {
      const resText = await response.text();
      console.log("Texto de la respuesta de error:", resText);
      let res;
      try {
        res = JSON.parse(resText);
      } catch (e) {
        console.error("Error al parsear la respuesta como JSON:", e);
        throw new Error("Respuesta no es un JSON válido");
      }
      if (response.status === 400) {
        Swal.fire({
          title: res.message,
          icon: "error",
          customClass: {
            popup: "bg-white shadow-lg rounded-lg p-6",
            title: "text-2xl font-semibold text-gray-800",
            confirmButton:
              "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        });
        throw new Error(res.message);
      }
    } else {
      const res = await response.json();
      console.log("Respuesta exitosa:", res);
      return res;
    }
  } catch (error) {
    console.error("Error al actualizar descuento:", error);
    throw error;
  }
};

export const getDiscountByName = async (name: string, token: string) => {
  try {
    const response = await fetch(`${APIURL}/discounts/name/${name}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Estado de la respuesta:", response.status);
    if (!response.ok) {
      const resText = await response.text();
      console.log("Texto de la respuesta de error:", resText);
      let res;
      try {
        res = JSON.parse(resText);
      } catch (e) {
        console.error("Error al parsear la respuesta como JSON:", e);
        throw new Error("Respuesta no es un JSON válido");
      }
      if (response.status === 400) {
        Swal.fire({
          title: res.message,
          icon: "error",
          customClass: {
            popup: "bg-white shadow-lg rounded-lg p-6",
            title: "text-2xl font-semibold text-gray-800",
            confirmButton:
              "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        });
        throw new Error(res.message);
      }
    } else {
      const res = await response.json();
      console.log("Respuesta exitosa:", res);
      return res as IDiscount;
    }
  } catch (error) {
    console.error("Error al obtener descuento por nombre:", error);
    throw error;
  }
};

export const getDiscountById = async (id: number, token: string) => {
  try {
    const response = await fetch(`${APIURL}/discounts/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Estado de la respuesta:", response.status);
    if (!response.ok) {
      const resText = await response.text();
      console.log("Texto de la respuesta de error:", resText);
      let res;
      try {
        res = JSON.parse(resText);
      } catch (e) {
        console.error("Error al parsear la respuesta como JSON:", e);
        throw new Error("Respuesta no es un JSON válido");
      }
      if (response.status === 400) {
        Swal.fire({
          title: res.message,
          icon: "error",
          customClass: {
            popup: "bg-white shadow-lg rounded-lg p-6",
            title: "text-2xl font-semibold text-gray-800",
            confirmButton:
              "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
          },
          buttonsStyling: false,
        });
        throw new Error(res.message);
      }
    } else {
      const res = await response.json();
      console.log("Respuesta exitosa:", res);
      return res as IDiscount;
    }
  } catch (error) {
    console.error("Error al obtener descuento por ID:", error);
    throw error;
  }
};
