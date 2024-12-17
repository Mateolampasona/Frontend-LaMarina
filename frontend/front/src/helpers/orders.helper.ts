const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getAllOrders = async (token: string) => {
  try {
    const response = await fetch(`${APIURL}/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en getAllOrders", error);
    throw error;
  }
};

export const getOrderById = async (token: string) => {
  try {
    const response = await fetch(`${APIURL}/orders/get-order`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en getOrderById", error);
    throw error;
  }
};

export const deleteOrder = async (token: string, id: string) => {
  try {
    const response = await fetch(`${APIURL}/orders/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en deleteOrder", error);
    throw error;
  }
};
