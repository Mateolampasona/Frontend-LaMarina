import { ICreatePayment } from "@/interfaces/IPayment";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const createPreference = async (token: string, data: ICreatePayment) => {
  try {
    const response = await fetch(`${APIURL}/payment/create_preference`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en createPreference", error);
    throw error;
  }
};
