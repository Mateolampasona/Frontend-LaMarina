import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

interface TrackingInfo {
  status: string;
  estimatedDelivery: string;
  lastUpdate: string;
}

export default function OrderTrackingForm() {
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular la obtención de información de seguimiento
    setTrackingInfo({
      status: "En tránsito",
      estimatedDelivery: "3 de Julio, 2023",
      lastUpdate: "Paquete salió del centro de distribución",
    });
  };

  return (
    <div className="bg-white mt-16 rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="orderNumber">Número de Pedido</Label>
          <Input
            id="orderNumber"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Ej: LM123456"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#ef233c] hover:bg-[#ef233c]/80 text-white"
        >
          Rastrear Pedido
        </Button>
      </form>

      {trackingInfo && (
        <div className="mt-6 p-4 border border-gray-200 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Estado del Pedido</h3>
          <p>
            <strong>Estado:</strong> {trackingInfo.status}
          </p>
          <p>
            <strong>Entrega Estimada:</strong> {trackingInfo.estimatedDelivery}
          </p>
          <p>
            <strong>Última Actualización:</strong> {trackingInfo.lastUpdate}
          </p>
        </div>
      )}
    </div>
  );
}
