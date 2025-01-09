const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTotalVentas = async (token:string) => {
    try{
        const response = await fetch(`${APIURL}/compras/total-ventas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        const res = await response.json();
        return res;
    } catch(error){
        console.log("Ocurrio un error en getTotalVentas", error);
        throw error;
    }

    
}

export const getLastCompra = async (token:string) => {
    try{
        const response = await fetch(`${APIURL}/compras/last-compra`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response);
        const res = await response.json();
        return res;
    } catch(error){
        console.log("Ocurrio un error en getLastCompra", error);
        throw error;
    }
}