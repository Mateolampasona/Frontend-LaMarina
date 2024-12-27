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
import { contactForm } from "@/helpers/contactFormHelper"; // Importa el helper
import Swal from "sweetalert2"; // Importa SweetAlert

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

  interface SubmitEvent {
    preventDefault: () => void;
  }

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    try {
      await contactForm(formData); // Llama al helper para enviar los datos
      Swal.fire({
        icon: "success",
        title: "Mensaje enviado con éxito",
        showConfirmButton: false,
        timer: 1500,
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      }); // Resetea los inputs
    } catch (error: unknown) {
      console.error("Error al enviar el formulario:", error);
      Swal.fire({
        icon: "error",
        title: "Hubo un error al enviar el mensaje",
        text: (error instanceof Error) ? error.message : "Unknown error",
      });
    }
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
            onValueChange={(value) =>
              setFormData((prevState) => ({ ...prevState, subject: value }))
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