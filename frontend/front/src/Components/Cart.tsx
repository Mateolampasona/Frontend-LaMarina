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
import Image from "next/image";
import { useUserContext } from "@/Context/userContext";
import Cookies from "js-cookie";
import { getOrderByUserId } from "@/helpers/orders.helper";

const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 10;

interface IOrderDetail {
  id: string;
  quantity: number;
  product: IProduct;
}

interface ICartItems {
  totalOrder: number;
  orderDetails: IOrderDetail[];
}

interface ProductWithQuantity {
  product: IProduct;
  quantity: number;
}

export default function ShoppingCart() {
  const { userId } = useUserContext();
  const token = Cookies.get("accessToken") || "null";

  const [isGift, setIsGift] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCartItems] = useState<ICartItems | null>(null);
  const [productsWithQuantities, setProductsWithQuantities] = useState<ProductWithQuantity[]>([]);
  console.log("productsWithQuantities", productsWithQuantities);

  useEffect(() => {
    // Hacemos el fetch al backend para obtener la orden del usuario
    const fetchCartItems = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      const parsedToken = JSON.parse(token);
      if (typeof parsedToken !== "string") {
        throw new Error("Invalid token format");
      }

      try {
        console.log("Fetching cart items with token:", parsedToken);
        const data = await getOrderByUserId(parsedToken);
        setCartItems(data);
        console.log("data", data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, [userId, token]);

  // Actualizamos los productos del carrito con sus cantidades
  useEffect(() => {
    if (cart && cart.orderDetails) {
      const newProductsWithQuantities = cart.orderDetails.map(detail => ({
        product: detail.product,
        quantity: detail.quantity,
      }));
      setProductsWithQuantities(newProductsWithQuantities);
    }
  }, [cart]);

  const subtotal = cart?.totalOrder || 0;
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, change: number) => {
    setProductsWithQuantities(
      productsWithQuantities
        .map((item) =>
          item.product.id.toString() === id
            ? {
                ...item,
                quantity: Math.max(0, item.quantity + change),
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

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
            {productsWithQuantities.length} {productsWithQuantities.length === 1 ? "artículo" : "artículos"}
          </Badge>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollArea className="md:col-span-2 h-[calc(100vh-20rem)] pr-4">
            <AnimatePresence>
              {productsWithQuantities.map((item) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-4 mb-6"
                >
                  <Image
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    width={96}
                    height={96}
                    className="object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <div className="flex items-center">
                      <p className="text-gray-600">
                        ${item.product.price}
                      </p>
                      {item.product.discount && (
                        <Badge variant="destructive" className="ml-2">
                          -{item.product.discount}%
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id.toString(), -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-2 w-8 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.product.id.toString(), 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-4"
                        onClick={() =>
                          updateQuantity(item.product.id.toString(), -item.quantity)
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${item.product.price.toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </ScrollArea>
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Resumen del pedido</h3>
            <div className="space-y-2">
              {productsWithQuantities.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>
                    {item.product.name} (x{item.quantity})
                  </span>
                  <span>
                    ${item.product.price}
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