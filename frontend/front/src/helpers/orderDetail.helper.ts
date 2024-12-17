import { IOrderDetailAddProduct } from "@/interfaces/IOrder";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addProductToOrder = async (
  token: string,
  order: IOrderDetailAddProduct
) => {
  try {
    const response = await fetch(`${APIURL}/order-details`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en addProductToOrder", error);
    throw error;
  }
};
