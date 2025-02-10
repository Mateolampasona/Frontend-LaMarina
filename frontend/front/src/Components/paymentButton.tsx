import React, { useEffect } from "react";
import "../styles/styles.css";

interface PaymentButtonProps {
  preferenceId: string;
}

interface MercadoPagoWindow extends Window {
  MercadoPago: new (publicKey: string, options: { locale: string }) => {
    checkout: (options: {
      preference: { id: string };
      render: { container: string; label: string };
    }) => void;
  };
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ preferenceId }) => {
  useEffect(() => {
    const scriptId = "mercadoPagoScript";

    const initializeMercadoPago = () => {
      const container = document.querySelector(".cho-container");
      if (container) {
        container.innerHTML = ""; // Limpiar el contenedor antes de inicializar
      }

      if ((window as unknown as MercadoPagoWindow).MercadoPago) {
        const mp = new (window as unknown as MercadoPagoWindow).MercadoPago(
          "APP_USR-c29ec53f-efbf-4045-8660-e280f542bf50",
          {
            locale: "es-AR",
          }
        );
        mp.checkout({
          preference: {
            id: preferenceId,
          },
          render: {
            container: ".cho-container",
            label: "Pagar", // Etiqueta del botón
          },
        });
      } else {
        console.error("MercadoPago SDK no está disponible.");
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      script.onload = initializeMercadoPago;
      script.onerror = () =>
        console.error("Error al cargar el SDK de MercadoPago.");
      document.body.appendChild(script);
    } else {
      // Esperar a que el script se cargue completamente antes de inicializar
      const interval = setInterval(() => {
        if ((window as unknown as MercadoPagoWindow).MercadoPago) {
          clearInterval(interval);
          initializeMercadoPago();
        }
      }, 100);
    }

    // Cleanup function to remove the script and prevent multiple buttons
    return () => {
      const container = document.querySelector(".cho-container");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [preferenceId]);

  return <div className="cho-container" />;
};

export default PaymentButton;
