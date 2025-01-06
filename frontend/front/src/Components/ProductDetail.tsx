"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { ShoppingCart, Heart, Star, ChevronDown, ChevronUp, Share2, ArrowLeft, Truck, Shield,  } from 'lucide-react';
import { IProduct } from "@/interfaces/IProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ProductDetailProps {
  product: IProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const router = useRouter();

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stock));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  const images = [product.imageUrl, ...Array(3).fill(product.imageUrl)]; // Simulando múltiples imágenes del producto

  useEffect(() => {
    // Simulando la carga de datos del producto
    const timer = setTimeout(() => {
      console.log("Datos del producto cargados");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#edede9]">

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center bg-[#edede9]">
      <Button variant="ghost" className="mb-8" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Volver a productos
      </Button>
      <div className="w-full lg:flex lg:items-start lg:space-x-8">
        {/* Galería de imágenes */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg mb-4">
            <AnimatePresence>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={images[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
            {product.discount && product.originalPrice && (
              <Badge className="absolute top-4 right-4 bg-red-500">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% DE DESCUENTO
              </Badge>
            )}
          </div>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            className="product-images-slider"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <div 
                  className={`relative aspect-square overflow-hidden rounded-md shadow cursor-pointer ${activeImage === index ? 'ring-2 ring-gray-400' : ''}`}
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={img}
                    alt={`${product.name} vista ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Información del producto */}
        <div className="mt-10 lg:mt-0 lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">{product.name}</h1>
          
          

          <div className="mb-6">
            {product.discount && product.originalPrice ? (
              <div className="flex items-baseline">
                <p className="text-2xl font-bold text-red-600">${product.price.toFixed(2)}</p>
                <p className="ml-2 text-xl font-medium text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            )}
          </div>

          <p className="text-lg text-gray-700 mb-4">{product.description}</p>

          <div className="flex items-center justify-center lg:justify-start mb-8">
            <span className="mr-3 text-sm font-medium text-gray-700">Cantidad:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={decrementQuantity} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronDown className="h-4 w-4" />
              </button>
              <span className="px-4 py-1 text-lg font-semibold">{quantity}</span>
              <button onClick={incrementQuantity} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
            <span className="ml-4 text-sm text-gray-500">{product.stock} disponibles</span>
          </div>

          <div className="flex justify-center lg:justify-start space-x-4 mb-8">
            <Button
              size="lg"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Agregar al carrito
            </Button>
            <Button
              size="icon"
              variant="outline"
              className={`border-gray-300 transition-colors duration-200 ${isLiked ? 'bg-red-100 text-red-600' : 'hover:bg-gray-100'}`}
              onClick={() => setIsLiked(!isLiked)}
            >
              <Heart className="h-5 w-5" fill={isLiked ? "currentColor" : "none"} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            >
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="bg-gray-100 rounded-lg p-4 mb-8 text-center lg:text-left">
            <h3 className="font-semibold text-lg mb-2">Características del producto</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              <li>Materiales de calidad premium</li>
              <li>Duradero y resistente</li>
              <li>Fácil de limpiar y mantener</li>
              <li>Diseño versátil para varios usos</li>
            </ul>
          </div>

          <div className="flex justify-center lg:justify-between mb-8">
            <div className="flex items-center">
              <Truck className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm text-gray-700">Envío gratuito</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-600 mr-2" />
              <span className="text-sm text-gray-700">Retiro por Local</span>
            </div>
            
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Descripción</TabsTrigger>
              <TabsTrigger value="specifications">Especificaciones</TabsTrigger>
              <TabsTrigger value="reviews">Reseñas</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-gray-700">{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="dimensions">
                  <AccordionTrigger>Dimensiones</AccordionTrigger>
                  <AccordionContent>
                    10 x 5 x 2 pulgadas
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="weight">
                  <AccordionTrigger>Peso</AccordionTrigger>
                  <AccordionContent>
                    1.5 lbs
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="material">
                  <AccordionTrigger>Material</AccordionTrigger>
                  <AccordionContent>
                    Componentes de plástico y metal de alta calidad
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-2xl font-bold">4.8</span>
                  <span className="ml-2 text-sm text-gray-500">basado en 120 reseñas</span>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <span className="text-sm w-2">{rating}</span>
                      <Star className="h-4 w-4 text-yellow-400 ml-1 mr-2" fill="currentColor" />
                      <Progress value={rating * 20} className="h-2 w-full max-w-[200px]" />
                      <span className="ml-2 text-sm text-gray-500">{rating * 20}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
    </div>
  );
}

