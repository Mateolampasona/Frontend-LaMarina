"use client";
import { useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const PaymentFailurePage = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = params.id;
  const collection_status = searchParams.get("collection_status");
  const payment_id = searchParams.get("payment_id");
  const status = searchParams.get("status");
  const preference_id = searchParams.get("preference_id");

  console.log("id:", id);
  console.log("collection_status:", collection_status);
  console.log("payment_id:", payment_id);
  console.log("status:", status);
  console.log("preference_id:", preference_id);

  useEffect(() => {
    const sendPaymentData = async () => {
      if (id && collection_status && payment_id && status && preference_id) {
        try {
          const response = await fetch(
            ${process.env.NEXT_PUBLIC_BACKEND_URL}/payment/failure?id=${id}&collection_status=${collection_status}&payment_id=${payment_id}&status=${status}&preference_id=${preference_id},
            {
              method: "GET",
            }
          );
          console.log("Response:", response);

          if (!response.ok) {
            throw new Error("Error al enviar los datos de pago");
          }

          const data = await response.text();
          console.log("Respuesta del backend:", data);

          // Mostrar modal de error y redirigir al home
          Swal.fire({
            title: "Error",
            text: "Hubo un problema con tu pago",
            icon: "error",
            confirmButtonText: "OK",
            customClass: {
              popup: "bg-gray-800 text-white",
              title: "text-white",
              confirmButton: "bg-red-500 hover:bg-red-600",
            },
          }).then(() => {
            router.push("/"); // Redirigir al home
          });
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    sendPaymentData();
  }, [id, collection_status, payment_id, status, preference_id, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4 text-red-500 animate-pulse">
        Espera un momento
      </h1>
      <p className="text-lg font-medium animate-bounce">
        Procesando tu pago...
      </p>
    </div>
  );
};

export default PaymentFailurePage;