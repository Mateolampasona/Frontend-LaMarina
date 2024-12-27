"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { ShoppingCart, Heart, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { IProduct } from "@/Interfaces/IProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";

interface ProductDetailProps {
  product: IProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stock));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
          {product.discount && product.originalPrice && (
            <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" />
            ))}
            <span className="ml-2 text-sm text-gray-600">(4.0) 120 reviews</span>
          </div>

          <div className="mb-6">
            {product.discount && product.originalPrice ? (
              <div className="flex items-baseline">
                <p className="text-4xl font-bold text-red-600">${product.price.toFixed(2)}</p>
                <p className="ml-2 text-xl font-medium text-gray-500 line-through">${product.originalPrice.toFixed(2)}</p>
              </div>
            ) : (
              <p className="text-4xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
            )}
          </div>

          <p className="text-lg text-gray-700 mb-8">{product.description}</p>

          <div className="flex items-center mb-8">
            <span className="mr-3 text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded">
              <button onClick={decrementQuantity} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronDown className="h-4 w-4" />
              </button>
              <span className="px-4 py-1 text-lg font-semibold">{quantity}</span>
              <button onClick={incrementQuantity} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors">
                <ChevronUp className="h-4 w-4" />
              </button>
            </div>
            <span className="ml-4 text-sm text-gray-500">{product.stock} available</span>
          </div>

          <div className="flex space-x-4 mb-8">
            <Button
              size="lg"
              className="flex-1 bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to cart
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 border-gray-300 hover:bg-gray-100 transition-colors duration-200"
            >
              <Heart className="mr-2 h-5 w-5" />
              Add to favorites
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-gray-700">{product.description}</p>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <Accordion type="single" collapsible>
                <AccordionItem value="dimensions">
                  <AccordionTrigger>Dimensions</AccordionTrigger>
                  <AccordionContent>
                    10 x 5 x 2 inches
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="weight">
                  <AccordionTrigger>Weight</AccordionTrigger>
                  <AccordionContent>
                    1.5 lbs
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="material">
                  <AccordionTrigger>Material</AccordionTrigger>
                  <AccordionContent>
                    High-quality plastic and metal components
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p className="text-gray-700">Customer reviews will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

