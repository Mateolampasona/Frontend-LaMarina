"use client";
import { useState, useEffect } from "react";
import { Minus, Plus, ShoppingBag, X, Gift, Loader2 } from "lucide-react";
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
import {
  addProductToOrder,
  deleteOrderDetail,
} from "@/helpers/orderDetail.helper";
import socket from "@/utils/socket";
import { createPreference } from "@/helpers/payment.helper";
import { getUserById } from "@/helpers/users.helpers";
import { IUser } from "@/interfaces/IUser";
import PaymentButton from "./paymentButton";

const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 0;

// Interfaces
interface IOrderDetail {
  orderDetailId: string;
  quantity: number;
  product: IProduct;
}

interface ICartItems {
  totalOrder: number;
  orderDetails: IOrderDetail[];
}

interface ProductWithQuantity {
  orderDetailId: string;
  quantity: number;
  product: IProduct;
}

export default function ShoppingCart() {
  const { userId } = useUserContext();
  const token = Cookies.get("accessToken") || "null";
  const [isGift, setIsGift] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCartItems] = useState<ICartItems | null>(null);
  const [productsWithQuantities, setProductsWithQuantities] = useState<
    ProductWithQuantity[]
  >([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "efectivo" | "mercadopago"
  >();
  const [loadingQuantities, setLoadingQuantities] = useState<{
    [key: string]: boolean;
  }>({});

  console.log("USER", user);
  // Fetch para obtener orden del USUARIO y el usuario
  useEffect(() => {
    const fetchCartItems = async () => {
      if (!token || !userId) {
        return;
      }
      if (!token) {
        console.error("No token found");
        return;
      }
      const parsedToken = JSON.parse(token);
      if (typeof parsedToken !== "string") {
        throw new Error("Invalid token format");
      }
      if (!userId) {
        console.error("No userId found");
        return;
      }

      try {
        const id = Number(userId);
        const data = await getOrderByUserId(parsedToken);
        const user = await getUserById(parsedToken, id);
        setUser(user);
        setCartItems(data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setIsLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchCartItems();
  }, [userId, token]);

  useEffect(() => {
    const createPaymentPreference = async () => {
      if (!token || !userId) {
        return;
      }
      if (!token) {
        console.error("No token found");
        return;
      }
      const parsedToken = JSON.parse(token);
      if (typeof parsedToken !== "string") {
        throw new Error("Invalid token format");
      }
      if (!user) {
        console.error("No user found");
        return;
      }
      try {
        const data = {
          email: user.email,
        };
        const response = await createPreference(parsedToken, data);
        console.log("RESPONSE", response);
        setPreferenceId(response.preferenceId);
      } catch (error) {
        console.error("Error creating preference:", error);
      }
    };

    createPaymentPreference();
  }, [token, user]);

  // Eliminar producto del carrito
  const deleteProduct = async (id: string) => {
    console.log("ID del producto a eliminar:", id);
    try {
      const token = Cookies.get("accessToken") || "null";
      if (!token) {
        console.error("No token found");
        return;
      }
      const parsedToken = JSON.parse(token);
      if (typeof parsedToken !== "string") {
        throw new Error("Invalid token format");
      }
      console.log(typeof id);

      await deleteOrderDetail(parsedToken, id);
      console.log("ID del producto a eliminar:", id);

      // Fetch the updated cart from the backend
      const updatedCart = await getOrderByUserId(parsedToken);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Actualizamos los productos del carrito al agregar un producto
  useEffect(() => {
    socket.on("cartUpdate", async (socketUserId: number) => {
      if (Number(userId) !== socketUserId) {
        console.log("User ID does not match", userId, socketUserId);
        return;
      }
      if (!token) {
        console.error("No token found");
        return;
      }
      const parsedToken = JSON.parse(token);
      if (typeof parsedToken !== "string") {
        throw new Error("Invalid token format");
      }
      const data = await getOrderByUserId(parsedToken);
      console.log("DATA", data);
      setCartItems(data);
    });
    return () => {
      socket.off("cartUpdate");
    };
  }, [token, userId]);

  // Actualizamos los productos del carrito al eliminar un producto
  useEffect(() => {
    socket.on("cartUpdate", async (socketUserId: number) => {
      if (Number(userId) !== socketUserId) {
        console.log("User ID does not matchas", userId, socketUserId);
        return;
      }
      if (!token) {
        console.error("No token found");
        return;
      }
      const parsedToken = JSON.parse(token);
      if (typeof parsedToken !== "string") {
        throw new Error("Invalid token format");
      }
      try {
        const updatedCart = await getOrderByUserId(parsedToken);
        setCartItems(updatedCart);
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    });
    return () => {
      socket.off("cartUpdate");
    };
  }, [token, userId]);

  // Actualizamos los productos del carrito con sus cantidades
  useEffect(() => {
    if (cart && cart.orderDetails) {
      const newProductsWithQuantities = cart.orderDetails.map((detail) => ({
        orderDetailId: detail.orderDetailId,
        product: detail.product,
        quantity: detail.quantity,
      }));
      setProductsWithQuantities(newProductsWithQuantities);
    }
  }, [cart]);

  // Calculamos y asignamos los valores de subtotal, envío y total
  const subtotal = productsWithQuantities.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const updateQuantity = async (id: string, change: number) => {
    setLoadingQuantities((prev) => ({ ...prev, [id]: true }));

    const updatedProducts = productsWithQuantities.map((item) =>
      item.product.productId.toString() === id
        ? {
            ...item,
            quantity: Math.max(0, item.quantity + change),
          }
        : item
    );

    setProductsWithQuantities(updatedProducts);

    const productToUpdate = updatedProducts.find(
      (item) => item.product.productId.toString() === id
    );
    if (productToUpdate) {
      try {
        if (!token) {
          console.error("No token found");
          return;
        }
        const parsedToken = JSON.parse(token);
        if (typeof parsedToken !== "string") {
          throw new Error("Invalid token format");
        }
        await addProductToOrder(parsedToken, {
          productId: productToUpdate.product.productId,
          quantity: productToUpdate.quantity,
        });
        const updatedCart = await getOrderByUserId(parsedToken);
        setCartItems(updatedCart);
      } catch (error) {
        console.error("Error updating product quantity:", error);
      } finally {
        setLoadingQuantities((prev) => ({ ...prev, [id]: false }));
      }
    }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

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
            {productsWithQuantities.length}{" "}
            {productsWithQuantities.length === 1 ? "artículo" : "artículos"}
          </Badge>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollArea className="md:col-span-2 h-[calc(100vh-20rem)] pr-4">
            <AnimatePresence>
              {productsWithQuantities.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-gray-500"
                >
                  Tu carrito está vacío.
                </motion.div>
              ) : (
                productsWithQuantities.map((item) => (
                  <motion.div
                    key={item.product.productId}
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
                        <p className="text-gray-600">${item.product.price}</p>
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
                          onClick={() =>
                            updateQuantity(
                              item.product.productId.toString(),
                              -1
                            )
                          }
                          disabled={
                            loadingQuantities[item.product.productId.toString()]
                          }
                        >
                          {loadingQuantities[
                            item.product.productId.toString()
                          ] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Minus className="h-4 w-4" />
                          )}
                        </Button>
                        <span className="mx-2 w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.product.productId.toString(), 1)
                          }
                          disabled={
                            loadingQuantities[item.product.productId.toString()]
                          }
                        >
                          {loadingQuantities[
                            item.product.productId.toString()
                          ] ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-4"
                          onClick={() => deleteProduct(item.orderDetailId)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="font-semibold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </ScrollArea>
          <div className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Resumen del pedido</h3>
            {productsWithQuantities.length > 0 && (
              <div className="space-y-2">
                {productsWithQuantities.map((item) => (
                  <div
                    key={item.product.productId}
                    className="flex justify-between text-sm"
                  >
                    <span>
                      {item.product.name} (x{item.quantity})
                    </span>
                    <span>${item.product.price}</span>
                  </div>
                ))}
              </div>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between font-semibold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span>Envío</span>
              <span>{shipping === 0 ? "Gratis" : `$${shipping}`}</span>
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
              <div className="mt-4">
                <Label>Método de pago</Label>
                <div className="flex mt-1 space-x-2">
                  <Button
                    onClick={() => setPaymentMethod("efectivo")}
                    className={
                      paymentMethod === "efectivo"
                        ? "bg-blue-500 text-white"
                        : ""
                    }
                  >
                    Efectivo
                  </Button>
                  <Button
                    onClick={() => setPaymentMethod("mercadopago")}
                    className={
                      paymentMethod === "mercadopago"
                        ? "bg-blue-500 text-white"
                        : ""
                    }
                  >
                    MercadoPago
                  </Button>
                </div>
                <div className="mt-4">
                  {paymentMethod === "mercadopago" && preferenceId ? (
                    <PaymentButton preferenceId={preferenceId} />
                  ) : (
                    <div className="text-sm text-gray-600">
                      Puedes pagar en efectivo al retirar tu pedido.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
