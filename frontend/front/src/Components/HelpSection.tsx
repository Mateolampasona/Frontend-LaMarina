'use client'

import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { HelpCircle, Mail, Phone, MapPin, Truck, RotateCcw, CreditCard } from 'lucide-react'
import FAQSection from './FAQSection'
import ContactForm from './ContactForm'
import OrderTrackingForm from './OrderTrackingForm'
import ReturnForm from './ReturnForm'

export default function HelpSection() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Centro de Ayuda La Marina</h1>
      
      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="faq" className="bg-[#ef233c] data-[state=active]:bg-[#ef233c]/80 text-white">Preguntas Frecuentes</TabsTrigger>
          <TabsTrigger value="contact" className="bg-[#ef233c] data-[state=active]:bg-[#ef233c]/80 text-white">Contáctanos</TabsTrigger>
          <TabsTrigger value="track" className="bg-[#ef233c] data-[state=active]:bg-[#ef233c]/80 text-white">Seguimiento de Pedido</TabsTrigger>
          <TabsTrigger value="return" className="bg-[#ef233c] data-[state=active]:bg-[#ef233c]/80 text-white">Devoluciones</TabsTrigger>
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

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <Phone className="w-12 h-12 text-[#ef233c] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Llámanos</h3>
          <p>0800-555-MARINA</p>
          <p>Lun-Vie: 9am-6pm</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <Mail className="w-12 h-12 text-[#ef233c] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Escríbenos</h3>
          <p>ayuda@lamarina.com</p>
          <p>Respondemos en 24hs</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
          <MapPin className="w-12 h-12 text-[#ef233c] mb-4" />
          <h3 className="text-xl font-semibold mb-2">Visítanos</h3>
          <p>Av. del Mar 1234</p>
          <p>Mar del Plata, Argentina</p>
        </div>
      </div>
    </div>
  )
}

