import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { Label } from "@/Components/ui/label";

export default function ReturnForm() {
  const [formData, setFormData] = useState({
    orderNumber: "",
    reason: "",
    details: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Return request submitted:", formData);
    // Aquí iría la lógica para procesar la solicitud de devolución
  };

  return (
    <>
      <div className="bg-white  rounded-lg shadow-lg p-6 mt-16">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="orderNumber">Número de Pedido</Label>
            <Input
              id="orderNumber"
              name="orderNumber"
              value={formData.orderNumber}
              onChange={handleChange}
              placeholder="Ej: LM123456"
              required
            />
          </div>
          <div>
            <Label htmlFor="reason">Razón de la Devolución</Label>
            <Select
              name="reason"
              onValueChange={(value) =>
                setFormData((prevState) => ({ ...prevState, reason: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecciona una razón" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="defectuoso">Producto defectuoso</SelectItem>
                <SelectItem value="equivocado">Producto equivocado</SelectItem>
                <SelectItem value="insatisfecho">
                  No satisfecho con el producto
                </SelectItem>
                <SelectItem value="otro">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="details">Detalles Adicionales</Label>
            <Textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Por favor, proporciona más detalles sobre tu solicitud de devolución"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-[#ef233c] hover:bg-[#ef233c]/80 text-white"
          >
            Solicitar Devolución
          </Button>
        </form>
      </div>
      <div className="mt-6 p-4 border border-gray-200 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Política de Devoluciones</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Las devoluciones deben solicitarse dentro de los 30 días posteriores
            a la compra.
          </li>
          <li>Los productos deben estar sin usar y en su empaque original.</li>
          <li>
            Los gastos de envío para devoluciones son responsabilidad del
            cliente, excepto en casos de productos defectuosos.
          </li>
          <li>
            El reembolso se procesará en un plazo de 5-10 días hábiles una vez
            recibido y revisado el producto.
          </li>
        </ul>
      </div>
    </>
  );
}
