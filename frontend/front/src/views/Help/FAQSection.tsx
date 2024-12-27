import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/Components/ui/accordion";

const faqs = [
  {
    question: "¿Cuáles son los métodos de pago aceptados?",
    answer:
      "Aceptamos tarjetas de crédito/débito, PayPal y transferencias bancarias. Todos nuestros métodos de pago son seguros y están encriptados para proteger tu información.",
  },
  {
    question: "¿Cuál es el tiempo de entrega?",
    answer:
      "El tiempo de entrega varía según tu ubicación. Para zonas urbanas, generalmente entre 3-5 días hábiles. Para zonas rurales, puede tomar hasta 7 días hábiles. Ofrecemos seguimiento en tiempo real de todos los envíos.",
  },
  {
    question: "¿Tienen política de devoluciones?",
    answer:
      "Sí, ofrecemos devoluciones dentro de los 30 días posteriores a la compra. Los productos deben estar sin usar y en su empaque original. Cubrimos los gastos de envío para devoluciones por defectos de fábrica.",
  },
  {
    question: "¿Ofrecen envío gratuito?",
    answer:
      "Sí, en pedidos superiores a $5000. Para pedidos menores, el costo de envío se calcula en base a la ubicación y el peso del paquete. Frecuentemente ofrecemos promociones de envío gratis, ¡estate atento!",
  },
  {
    question: "¿Cómo puedo saber si un producto está en stock?",
    answer:
      "Todos nuestros productos muestran la disponibilidad en tiempo real en la página del producto. Si un artículo está agotado, puedes registrarte para recibir una notificación cuando esté nuevamente disponible.",
  },
  {
    question: "¿Ofrecen descuentos para compras al por mayor?",
    answer:
      "Sí, ofrecemos descuentos especiales para compras al por mayor. Por favor, contáctanos directamente para discutir tus necesidades específicas y obtener una cotización personalizada.",
  },
];

export default function FAQSection() {
  return (
    <div className="bg-white mt-12 rounded-lg shadow-lg p-6">
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-[#ef233c] transition-colors">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 mt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
