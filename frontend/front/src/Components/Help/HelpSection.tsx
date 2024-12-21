"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

import { Mail, Phone, MapPin } from "lucide-react";
import FAQSection from "./FAQSection";
import ContactForm from "./ContactForm";
import OrderTrackingForm from "./OrderTrackingForm";
import ReturnForm from "./ReturnForm";

export default function HelpSection() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="  rounded-lg shadow-sm p-6 mb-8">
        <h1 className="text-3xl font-mono text-center text-gray-900 tracking-wide ">
          Centro de Ayuda La Marina
        </h1>
      </div>
      <div className="m-auto">
        <Tabs defaultValue="faq" className="w-full ">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4  gap-2 mb-8 border-b border-gray-200">
            <TabsTrigger
              value="faq"
              className="relative group font-mono text-gray-600 hover:text-[#ef233c] transition-colors duration-200 py-2 px-4 text-center text-sm sm:text-base"
            >
              Preguntas Frecuentes
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#ef233c] scale-x-0 group-hover:scale-x-100 group-data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
            </TabsTrigger>
            <TabsTrigger
              value="contact"
              className="relative group font-mono text-gray-600 hover:text-[#ef233c] transition-colors duration-200 py-2 px-4 text-center text-sm sm:text-base"
            >
              Contáctanos
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#ef233c] scale-x-0 group-hover:scale-x-100 group-data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
            </TabsTrigger>
            <TabsTrigger
              value="track"
              className="relative group text-gray-600 font-mono hover:text-[#ef233c] transition-colors duration-200 py-2 px-4 text-center text-sm sm:text-base"
            >
              Seguimiento de Pedido
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#ef233c] scale-x-0 group-hover:scale-x-100 group-data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
            </TabsTrigger>
            <TabsTrigger
              value="return"
              className="relative  group text-gray-600 font-mono hover:text-[#ef233c] transition-colors duration-200 py-2 px-4 text-center text-sm sm:text-base"
            >
              Devoluciones
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#ef233c] scale-x-0 group-hover:scale-x-100 group-data-[state=active]:scale-x-100 transition-transform duration-300 origin-left" />
            </TabsTrigger>
          </TabsList>
          <TabsContent value="faq">
            <FAQSection />
          </TabsContent>
          <TabsContent value="contact">
            <ContactForm />
          </TabsContent>
          <TabsContent value="track">
            <OrderTrackingForm />
          </TabsContent>
          <TabsContent value="return">
            <ReturnForm />
          </TabsContent>
        </Tabs>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <a
            href="tel:2645724251"
            className="flex flex-col items-center text-center"
          >
            <Phone className="w-12 h-12 text-[#ef233c] mb-4" />
            <h3 className="text-xl font-mono mb-2">Llámanos</h3>
            <p>2645724251</p>
            <p>Lun-Vie: 9am-6pm</p>
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <a
            href="mailto:clubmayoristacmc@gmail.com"
            className="flex flex-col items-center text-center"
          >
            <Mail className="w-12 h-12 text-[#ef233c] mb-4" />
            <h3 className="text-xl font-mono mb-2">Escríbenos</h3>
            <p>clubmayoristacmc@gmail.com</p>
            <p>Respondemos en 24hs</p>
          </a>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <a
            href="https://www.google.com/maps?q=General+M.+Acha+Sur+395,+San+Juan,+Argentina"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-center"
          >
            <MapPin className="w-12 h-12 text-[#ef233c] mb-4" />
            <h3 className="text-xl font-mono mb-2">Visítanos</h3>
            <p>General M. Acha Sur 395</p>
            <p>San Juan, Argentina</p>
          </a>
        </div>
      </div>
    </div>
  );
}
