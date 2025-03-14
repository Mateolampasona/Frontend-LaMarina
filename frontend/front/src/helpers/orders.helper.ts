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

export const getOrderByUserId = async (token: string) => {
  try {
    const response = await fetch(`${APIURL}/orders/get-order-by-user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const res = await response.json();
    console.log("res", res);
    return res;
  } catch (error) {
    console.log("Ocurrio un error en getOrderByUserId", error);
    throw error;
  }
};

export const getTotalCarts = async (token: string) => {
  try {
    const response = await fetch(`${APIURL}/orders/total-orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en getTotalOrders", error);
    throw error;
  }
};

export const getLastOrder = async (token: string) => {
  try {
    const response = await fetch(`${APIURL}/orders/last-order`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log("Ocurrio un error en getLastOrder", error);
    throw error;
  }
};

export const putDiscount = async (
  token: string,
  id: string,
  discountCode: string
) => {
  try {
    const response = await fetch(`${APIURL}/orders/apply-discount/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ discountCode }),
    });
    const res = await response.json();

    return { success: response.ok, res: res };
  } catch (error) {
    throw error;
  }
};

export const removeDiscount = async (token: string, orderId: string) => {
  try {
    const response = await fetch(
      `${APIURL}/orders/remove-discount/${orderId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const res = await response.json();
    return { success: response.ok, res: res };
  } catch (error) {
    console.log("Ocurrio un error en removeDiscount", error);
    throw error;
  }
};
