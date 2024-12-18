import { IProduct } from "@/Interfaces/IProduct";

// const APIURL = process.env.NEXT_PUBLIC_API_URL as string;

export async function fetchProducts(): Promise<IProduct[] | null> {
  const APIURL = process.env.NEXT_PUBLIC_API_URL as string;

  console.log("APIURL:", APIURL);
  console.log("Fetching from:", `${APIURL}/products`);
  try {
    const res = await fetch(`${APIURL}/products`);
    if (!res.ok) {
      throw new Error(`Error en la solicitud: ${res.status}`);
    }
    const response: IProduct[] = await res.json();
    return response;
  } catch (error) {
    console.error("Error al realizar el fetch:", error);
    return null;
  }
}
