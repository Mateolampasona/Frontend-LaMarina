"use client";
import { useState, useEffect } from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  X,
  Truck,
  Gift,
  CreditCard,
  Loader2,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import Image from 'next/image';
import { Separator } from "@/Components/ui/separator";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Progress } from "@/Components/ui/progress";
import { Badge } from "@/Components/ui/badge";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { Toast } from "@/Components/ui/toast";
import { motion, AnimatePresence } from "framer-motion";
import { IProduct } from "@/interfaces/IProducts";

const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 10;

export default function ShoppingCart() {
  const [products, setProducts] = useState<IProduct[]>([
    {
      id: 1,
      name: "Detergente Líquido",
      description:
        "Detergente líquido para lavar platos y utensilios de cocina.",
      price: 150,
      discount: 10,
      originalPrice: 165,
      imageUrl:
        "https://i.pinimg.com/736x/00/46/32/004632cced90e09a29f0f0a4345d42b3.jpg",
      stock: 200,
      quantitySell: 50,
      isActive: true,
      createdAt: "2024-12-01T08:00:00Z",
      updatedAt: "2024-12-10T10:00:00Z",
      category_id: {
        categoryId: 1,
        name: "Limpieza",
        description: "Productos para la limpieza del hogar y oficina.",
      },
    },
    {
      id: 2,
      name: "Limpiador Multiusos",
      description: "Limpiador multiusos ideal para superficies duras.",
      price: 250,
      discount: 0,
      originalPrice: null,
      imageUrl:
        "https://i.pinimg.com/736x/00/46/32/004632cced90e09a29f0f0a4345d42b3.jpg",
      stock: 150,
      quantitySell: 80,
      isActive: true,
      createdAt: "2024-11-15T09:30:00Z",
      updatedAt: "2024-11-20T11:00:00Z",
      category_id: {
        categoryId: 1,
        name: "Limpieza",
        description: "Productos para la limpieza del hogar y oficina.",
      },
    },
    {
      id: 3,
      name: "Desinfectante en Aerosol",
      description:
        "Desinfectante en aerosol para eliminar gérmenes y bacterias.",
      price: 120,
      discount: null,
      originalPrice: null,
      imageUrl:
        "https://i.pinimg.com/736x/00/46/32/004632cced90e09a29f0f0a4345d42b3.jpg",
      stock: 500,
      quantitySell: 200,
      isActive: true,
      createdAt: "2024-10-30T10:00:00Z",
      updatedAt: "2024-11-01T12:00:00Z",
      category_id: {
        categoryId: 1,
        name: "Limpieza",
        description: "Productos para la limpieza del hogar y oficina.",
      },
    },
    {
      id: 4,
      name: "Limpiador de Vidrios",
      description:
        "Limpiador especializado en cristales y superficies vidriadas.",
      price: 180,
      discount: 5,
      originalPrice: 190,
      imageUrl:
        "https://i.pinimg.com/736x/00/46/32/004632cced90e09a29f0f0a4345d42b3.jpg",
      stock: 300,
      quantitySell: 150,
      isActive: true,
      createdAt: "2024-11-05T08:30:00Z",
      updatedAt: "2024-11-10T09:00:00Z",
      category_id: {
        categoryId: 1,
        name: "Limpieza",
        description: "Productos para la limpieza del hogar y oficina.",
      },
    },
  ]);

  const [isGift, setIsGift] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const updateQuantity = (id: number, change: number) => {
    setProducts(
      products
        .map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: Math.max(0, product.quantitySell + change),
              }
            : product
        )
        .filter((product) => product.quantitySell > 0)
    );
  };

  const subtotal = products.reduce((sum, product) => {
    const discountedPrice = product.discount
      ? product.price * (1 - product.discount / 100)
      : product.price;
    return sum + discountedPrice * product.quantitySell;
  }, 0);

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const applyPromoCode = () => {
    setIsLoading(true);
    // Simulamos una llamada a la API
    setTimeout(() => {
      setIsLoading(false);
      Toast({
        title: "Código promocional aplicado",
      });
    }, 1500);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        Toast({
          title: "Carrito guardado",
        });
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="min-h-screen bg-[#edede9] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl w-full"
      >
        <div className="p-6 bg-[#ef233c] text-white flex justify-between items-center">
          <h2 className="text-2xl font-bold flex items-center">
            <ShoppingBag className="mr-2" />
            Tu Carrito
          </h2>
          <Badge variant="secondary" className="text-[#ef233c]">
            {products.length} {products.length === 1 ? "artículo" : "artículos"}
          </Badge>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollArea className="md:col-span-2 h-[calc(100vh-20rem)] pr-4">
            <AnimatePresence>
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-4 mb-6"
                >
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={96}
                    height={96}
                    className="object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <div className="flex items-center">
                      <p className="text-gray-600">
                        ${product.price.toFixed(2)}
                      </p>
                      {product.discount && (
                        <Badge variant="destructive" className="ml-2">
                          -{product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 w-8 text-center">
                        {product.quantitySell}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(product.id, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-4"
                        onClick={() =>
                          updateQuantity(product.id, -product.quantitySell)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="font-semibold">
                    $
                    {(
                      (product.discount
                        ? product.price * (1 - product.discount / 100)
                        : product.price) * product.quantitySell
                    ).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Resumen del pedido</h3>
            <div className="space-y-2">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between text-sm">
                  <span>
                    {product.name} (x{product.quantitySell})
                  </span>
                  <span>
                    $
                    {(
                      (product.discount
                        ? product.price * (1 - product.discount / 100)
                        : product.price) * product.quantitySell
                    ).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Envío</span>
              <span>
                {shipping === 0 ? "Gratis" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">
                  Te faltan ${(SHIPPING_THRESHOLD - subtotal).toFixed(2)} para
                  envío gratis
                </p>
                <Progress
                  value={(subtotal / SHIPPING_THRESHOLD) * 100}
                  className="mt-2"
                />
              </div>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-4 flex items-center space-x-2">
              <Switch id="gift" checked={isGift} onCheckedChange={setIsGift} />
              <Label htmlFor="gift">¿Es un regalo?</Label>
            </div>
            {isGift && (
              <div className="mt-2 text-sm text-gray-600 flex items-center">
                <Gift className="mr-2 h-4 w-4" />
                Incluiremos un mensaje de regalo
              </div>
            )}
            <div className="mt-4">
              <Label htmlFor="promo">Código promocional</Label>
              <div className="flex mt-1">
                <Input
                  id="promo"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Ingresa tu código"
                />
                <Button
                  onClick={applyPromoCode}
                  disabled={isLoading}
                  className="ml-2"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Aplicar"
                  )}
                </Button>
              </div>
            </div>
            <Button className="w-full mt-6 bg-[#ef233c] hover:bg-[#d90429] text-white">
              <CreditCard className="mr-2 h-4 w-4" /> Proceder al pago
            </Button>
            <Button variant="outline" className="w-full mt-2">
              <Truck className="mr-2 h-4 w-4" /> Calcular envío
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
