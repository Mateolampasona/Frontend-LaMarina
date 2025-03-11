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
import { motion, AnimatePresence } from "framer-motion";
import { IProduct } from "@/interfaces/IProducts";
import Image from "next/image";
import { useUserContext } from "@/Context/userContext";
import Cookies from "js-cookie";
import {
  getOrderByUserId,
  putDiscount,
  removeDiscount,
} from "@/helpers/orders.helper";
import {
  addProductToOrder,
  deleteOrderDetail,
} from "@/helpers/orderDetail.helper";
import socket from "@/utils/socket";
import { createPreference } from "@/helpers/payment.helper";
import { getUserById } from "@/helpers/users.helpers";
import { IUser } from "@/interfaces/IUser";
import PaymentButton from "./paymentButton";
import { IOrder } from "@/interfaces/IOrder";
import Swal from "sweetalert2";

const SHIPPING_THRESHOLD = 100;
const SHIPPING_COST = 0;

// Interfaces

interface ProductWithQuantity {
  orderDetailId: string;
  quantity: number;
  product: IProduct;
}

const validateUserData = (token: string, userId: string) => {
  if (!token) {
    console.error("No token found");
    return { isValid: false, parsedToken: "" };
  }
  const parsedToken = JSON.parse(token);
  if (typeof parsedToken !== "string") {
    throw new Error("Invalid token format");
  }
  if (!userId) {
    console.error("No userId found");
    return { isValid: false, parsedToken: "" };
  }
  return { isValid: true, parsedToken, userId };
};

export default function ShoppingCart() {
  const { userId } = useUserContext();
  const token = Cookies.get("accessToken") || "null";
  const [isGift, setIsGift] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCartItems] = useState<IOrder | null>(null);
  const [productsWithQuantities, setProductsWithQuantities] = useState<
    ProductWithQuantity[]
  >([]);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<
    "efectivo" | "mercadopago"
  >();
  const [discountAmmount, setDiscountAmmount] = useState(0);
  const [loadingQuantities, setLoadingQuantities] = useState<{
    [key: string]: boolean;
  }>({});
  const [isUserDataReady, setIsUserDataReady] = useState(false);
  const [isCartReady, setIsCartReady] = useState(false);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  console.log("IsCartReady", isCartReady);

  useEffect(() => {
    const fetchUserData = async () => {
      if (token && userId) {
        setIsUserDataReady(true);
      } else {
        setTimeout(fetchUserData, 25);
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      setIsUserDataReady(true);
    }, 1000); // Timeout after 1 second to handle the case when not logged in

    fetchUserData();

    return () => clearTimeout(timeoutId);
  }, [userId, token]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!isUserDataReady) return;

      const { isValid, parsedToken } = validateUserData(token, userId);
      if (!isValid) {
        setCartItems(null);
        setIsLoading(false);
        return;
      }

      try {
        const id = Number(userId);
        const [data, user] = await Promise.all([
          getOrderByUserId(parsedToken),
          getUserById(parsedToken, id),
        ]);
        setUser(user);
        setCartItems(data);
        console.log("DATAAAA", data.discountAmmount);

        // Verifica si hay un descuento aplicado y actualiza el estado
        if (data.discount) {
          setPromoCode(data.discount.discountCode);
          setDiscountAmmount(data.discountAmmount ?? 0);
          setIsDiscountApplied(true);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
          setIsCartReady(true);
        }, 1000); // Delay of 1 second before setting isLoading to false
      }
    };

    fetchCartItems();
  }, [isUserDataReady, userId, token]);

  useEffect(() => {
    if (cart?.discount?.id) {
      setPromoCode(cart.discount.discountCode);
      setDiscountAmmount(cart.discountAmmount ?? 0);
      setIsDiscountApplied(true);
    }
  }, [cart]);

  // Crear preferencia de pago si existe el usuario y la orden.Y si la orden es mayor a 0
  useEffect(() => {
    const createPaymentPreference = async () => {
      const { isValid, parsedToken } = validateUserData(token, userId);
      if (!isValid) {
        setCartItems(null);
        setIsLoading(false);
        return;
      }
      try {
        if (!user) {
          console.error("User is null");
          return;
        }
        if (user.order.totalOrder === 0) {
          console.error("User has total to pay 0");
          return;
        }
        const data = {
          email: user.email,
        };
        const response = await createPreference(parsedToken, data);
        setPreferenceId(response.preferenceId);
      } catch (error) {
        console.error("Error creating preference:", error);
      }
    };

    createPaymentPreference();
  }, [token, user]);

  // Funcion para eliminar producto del carrito
  const deleteProduct = async (id: string) => {
    try {
      const { isValid, parsedToken } = validateUserData(token, userId);
      if (!isValid) {
        setCartItems(null);
        setIsLoading(false);
        return;
      }

      await deleteOrderDetail(parsedToken, id);
      const updatedCart = await getOrderByUserId(parsedToken);
      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Socket para actualizar los productos del carrito
  useEffect(() => {
    socket.on("cartUpdate", async (socketUserId: number) => {
      if (Number(userId) !== socketUserId) {
        console.log("User ID does not matchas", userId, socketUserId);
        return;
      }
      const { isValid, parsedToken } = validateUserData(token, userId);
      if (!isValid) {
        setCartItems(null);
        setIsLoading(false);
        return;
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
  const total = subtotal + shipping - discountAmmount;

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
        const { isValid, parsedToken } = validateUserData(token, userId);
        if (!isValid) {
          setCartItems(null);
          setIsLoading(false);
          return;
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

  const applyPromoCode = async () => {
    setIsLoading(true);
    try {
      const { isValid, parsedToken } = validateUserData(token, userId);
      if (!isValid) {
        setCartItems(null);
        setIsLoading(false);
        return;
      }

      if (cart?.orderId) {
        const response = await putDiscount(
          parsedToken,
          cart.orderId,
          promoCode
        );

        if (response.success == true) {
          setDiscountAmmount(response.res);
          setIsDiscountApplied(true);
          const updatedCart = await getOrderByUserId(parsedToken);
          setCartItems(updatedCart);

          // Forzar re-renderización
          setTimeout(() => {
            Swal.fire({
              title: "Código promocional aplicado",
              text: `Descuento de $${response.res.toFixed(2)}`,
              icon: "success",
            });
          }, 0);
        } else {
          Swal.fire({
            title: "Error",
            text: "Código promocional inválido",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error applying promo code:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al aplicar el código promocional",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removePromoCode = async () => {
    setIsLoading(true);
    try {
      const { isValid, parsedToken } = validateUserData(token, userId);
      if (!isValid) {
        setCartItems(null);
        setIsLoading(false);
        return;
      }

      if (cart?.orderId) {
        const response = await removeDiscount(parsedToken, cart.orderId);
        console.log(response);
        if (response.success == true) {
          setPromoCode("");
          setDiscountAmmount(0);
          setIsDiscountApplied(false);
          Swal.fire({
            title: "Código promocional eliminado",
            text: "Se eliminó el descuento aplicado",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el código promocional",
            icon: "error",
          });
        }
      }
    } catch (error) {
      console.error("Error removing promo code:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al eliminar el código promocional",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
        <p>Cargando...</p>
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
                  Tu carrito está vacío.{" "}
                  {(!token || !userId) &&
                    "Inicia sesión para añadir productos."}
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
            {discountAmmount > 0 && (
              <div className="flex justify-between text-sm mt-2 text-green-600">
                <span>Descuento</span>
                <span>-${discountAmmount.toFixed(2)}</span>
              </div>
            )}
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
                  className={discountAmmount > 0 ? "border-green-500" : ""}
                  disabled={isDiscountApplied}
                />
                {isDiscountApplied ? (
                  <Button onClick={removePromoCode} className="ml-2">
                    <X className="h-4 w-4" />
                  </Button>
                ) : (
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
                )}
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
