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

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prevState: FormData) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Aquí iría la lógica para enviar el formulario
  };

  return (
    <div className="bg-white mt-14 rounded-lg shadow-lg p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Nombre</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="subject">Asunto</Label>
            <Select
            name="subject"
            onValueChange={(value: string) =>
              setFormData((prevState: FormData) => ({ ...prevState, subject: value }))
            }
            >
            <SelectTrigger>
              <SelectValue placeholder="Selecciona un asunto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="consulta">Consulta general</SelectItem>
              <SelectItem value="pedido">Información de pedido</SelectItem>
              <SelectItem value="producto">Información de producto</SelectItem>
              <SelectItem value="reclamo">Reclamo</SelectItem>
            </SelectContent>
            </Select>
        </div>
        <div>
          <Label htmlFor="message">Mensaje</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-[#ef233c] hover:bg-[#ef233c]/80 text-white"
        >
          Enviar Mensaje
        </Button>
      </form>
    </div>
  );
}
