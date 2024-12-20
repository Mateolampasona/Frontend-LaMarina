import Swal from "sweetalert2";
import { ILoginProps } from "@/interfaces/ILoginProps";
import { IRegisterProps } from "@/interfaces/IRegisterProps";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (userData: ILoginProps) => {
  try {
    console.log("Datos enviados:", userData); // Verifica los datos que estás enviando
    const response = await fetch(`${APIURL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Estado de la respuesta:", response.status); // Verifica el estado de la respuesta

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
          buttonsStyling: false, // Necesario para desactivar los estilos por defecto de los botones
        });
        throw new Error(res.message);
      }
    } else {
      const res = await response.json();
      console.log("Respuesta exitosa:", res); // Verifica la respuesta exitosa del servidor
      return res;
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    throw error;
  }
};

export const register = async (userData: IRegisterProps) => {
  console.log(userData);
  try {
    const response = await fetch(`${APIURL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const res = await response.json();
    if (res.statusCode === 400) {
      throw new Error(res.message);
    } else {
      return res;
    }
  } catch (error: unknown) {
    throw new Error(String(error));
  }
};
