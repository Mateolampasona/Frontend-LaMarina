"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/Components/ui/button";
import { ShoppingCart, Heart, Star, ChevronDown, ChevronUp, Share2, ArrowLeft } from 'lucide-react';
import { IProduct } from "@/Interfaces/IProducts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/Components/ui/accordion";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { useRouter } from 'next/navigation';

interface ProductDetailProps {
  product: IProduct;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();

  const incrementQuantity = () => setQuantity(prev => Math.min(prev + 1, product.stock));
  const decrementQuantity = () => setQuantity(prev => Math.max(prev - 1, 1));

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Button variant="ghost" className="mb-4" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to products
      </Button>
      <div className="lg:flex lg:items-start lg:space-x-8">
        {/* Image gallery */}
        <div className="lg:w-1/2">
          <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg mb-4">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.discount && product.originalPrice && (
              <Badge className="absolute top-4 right-4 bg-red-500">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded-md shadow">
                <Image
                  src={product.imageUrl}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 lg:mt-0 lg:w-1/2">
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
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="flex items-center mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-2xl font-bold">4.8</span>
                  <span className="ml-2 text-sm text-gray-500">based on 120 reviews</span>
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
  );
}

