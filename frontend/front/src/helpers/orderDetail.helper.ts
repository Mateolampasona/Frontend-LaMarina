import { IDeleteProduct, IOrderDetailAddProduct } from "@/interfaces/IOrder";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const addProductToOrder = async (
  token: string,
  order: IOrderDetailAddProduct
) => {
  try {
    const response = await fetch(`${APIURL}/orderDetails/addProduct`, {
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

export const deleteOrderDetail = async (token: string, detailId: string) => {
  try {
    const response = await fetch(`${APIURL}/orderDetails/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({detailId}),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log('Ocurrio un error en deleteProductFromOrder', error);
    throw error;
  }
};
