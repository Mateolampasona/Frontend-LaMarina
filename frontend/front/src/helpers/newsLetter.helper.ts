import Swal from 'sweetalert2';

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const newsLetterForm = async (email: string) => {
    try {

        const response = await fetch(`${APIURL}/forms/newsletter`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
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
        console.error("Error en el envío del formulario de contacto:", error);
        throw error;
    }
    }

    export const getNewsLetterForm = async () => {
        try{
            const response = await fetch(`${APIURL}/forms/newsletter`, {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                },
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
            console.error("Error en el envío del formulario de contacto:", error);
            throw error;
        }
    }