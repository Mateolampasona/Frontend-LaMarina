"use client";

import { useState, useEffect } from "react";
import { Bell, CreditCard, Edit, HelpCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { Skeleton } from "@/Components/ui/skeleton";

import { Separator } from "@/Components/ui/separator";
import { ProfileInfo } from "@/Components/ui/profile-info";
import { EditProfileForm } from "@/Components/ui/edit-profile-form";
import Cookies from "js-cookie";
import { getUserById } from "@/helpers/users.helpers";
import { IUser } from "@/interfaces/IUser";
import { useUserContext } from "@/Context/userContext";
import { ICompra } from "@/interfaces/ICompra";
import { IFavorite } from "@/interfaces/IFavorite";
import socket from "@/utils/socket";

export default function UserDashboard() {
  const [compras, setCompras] = useState<ICompra[]>([]);
  const [user, setUser] = useState<IUser>();
  const token = Cookies.get("accessToken") || "null";
  const { userId } = useUserContext();
  const [favorites, setFavorites] = useState<IFavorite[]>([]);
  const [transactions, setTransactions] = useState<ICompra[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeOrders] = useState([
    { id: 4, status: "procesando", date: "2023-05-22", total: "$150.00" },
    { id: 5, status: "enviado", date: "2023-05-21", total: "$95.00" },
  ]);

  // Traemos los datos del usuario
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        console.error("No token found");
        return;
      }
      let parsedToken;
      try {
        parsedToken = JSON.parse(token);
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }
      if (typeof parsedToken !== "string") {
        console.error("Invalid token format");
        return;
      }
      try {
        const user = await getUserById(parsedToken, Number(userId));
        setUser(user);
        setCompras(
          user.compras.map((compra: ICompra) => ({
            compraId: compra.compraId,
            paymentMethod: compra.paymentMethod,
            payment_preference_id: compra.payment_preference_id,
            purchaseDate: compra.purchaseDate,
            purchaseDetails: compra.purchaseDetails,
            status: compra.status,
            total: compra.total,
          }))
        );
        setFavorites(
          user.favorites.map((favorite: IFavorite) => ({
            productId: favorite.productId,
            name: favorite.name,
            price: favorite.price,
            discount: favorite.discount,
            imageUrl: favorite.imageUrl,
            isActive: favorite.isActive,
            originalPrice: favorite.originalPrice,
            stock: favorite.stock,
          }))
        );
        setTransactions(
          user.compras.map((compra: ICompra) => ({
            compraId: compra.compraId,
            paymentMethod: compra.paymentMethod,
            payment_preference_id: compra.payment_preference_id,
            purchaseDate: compra.purchaseDate,
            purchaseDetails: compra.purchaseDetails,
            status: compra.status,
            total: compra.total,
          }))
        );
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (userId && token) {
      fetchUser();
    }
  }, [userId, token]);

  // Timer para recargar la página
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Socket
  useEffect(() => {
    const handleUserUpdate = async (socketUserId: number) => {
      if (socketUserId !== Number(userId)) {
        return;
      }
      if (!token) {
        console.error("No token found");
        return;
      }
      let parsedToken;
      try {
        parsedToken = JSON.parse(token);
      } catch (error) {
        console.error("Error parsing token:", error);
        return;
      }
      if (typeof parsedToken !== "string") {
        console.error("Invalid token format");
        return;
      }
      console.log("try");
      try {
        const user = await getUserById(parsedToken, socketUserId);
        setUser(user);
        setCompras(
          user.compras.map((compra: ICompra) => ({
            compraId: compra.compraId,
            paymentMethod: compra.paymentMethod,
            payment_preference_id: compra.payment_preference_id,
            purchaseDate: compra.purchaseDate,
            purchaseDetails: compra.purchaseDetails,
            status: compra.status,
            total: compra.total,
          }))
        );
        setFavorites(
          user.favorites.map((favorite: IFavorite) => ({
            productId: favorite.productId,
            name: favorite.name,
            price: favorite.price,
            discount: favorite.discount,
            imageUrl: favorite.imageUrl,
            isActive: favorite.isActive,
            originalPrice: favorite.originalPrice,
            stock: favorite.stock,
          }))
        );
        setTransactions(
          user.compras.map((compra: ICompra) => ({
            compraId: compra.compraId,
            paymentMethod: compra.paymentMethod,
            payment_preference_id: compra.payment_preference_id,
            purchaseDate: compra.purchaseDate,
            purchaseDetails: compra.purchaseDetails,
            status: compra.status,
            total: compra.total,
          }))
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    socket.on("updateDashboard", handleUserUpdate);

    return () => {
      socket.off("updateDashboard", handleUserUpdate);
    };
  }, [userId, token]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="min-h-screen p-4 md:p-8 transition-colors duration-200 bg-[#edede9]">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold font-mono text-[#2d2d2d]">
            ¡Hola, {capitalizeFirstLetter(user?.name ?? "Cliente")}! Aquí está
            tu resumen
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-2xl font-semibold font-mono text-[#2d2d2d]">
                Mi Perfil
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
              >
                <Edit className="h-4 w-4 text-[#ef233c]" />
                <span className="sr-only">Editar perfil</span>
              </Button>
            </CardHeader>
            <CardContent>
              {isEditingProfile ? (
                <EditProfileForm
                  name={capitalizeFirstLetter(user?.name ?? "")}
                  email={capitalizeFirstLetter(user?.email ?? "")}
                  onCancel={() => setIsEditingProfile(false)}
                />
              ) : (
                <ProfileInfo
                  name={user?.name || ""}
                  email={user?.email || ""}
                />
              )}
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#2d2d2d]">
                Historial de Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center mb-4"
                        >
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-3 w-[80px]" />
                          </div>
                          <Skeleton className="h-6 w-[80px]" />
                        </div>
                      ))
                  : compras.map((compra, index) => (
                      <div
                        key={compra.compraId}
                        className="flex justify-between items-center mb-4 group"
                      >
                        <div>
                          <p
                            className={`text-sm font-medium text-[#2d2d2d] group-hover:text-[#ef233c] transition-colors duration-200`}
                          >
                            Pedido #{index + 1}
                          </p>
                          <p className="text-xs text-gray-600">
                            {new Date(compra.purchaseDate).toLocaleDateString(
                              "en-CA"
                            )}
                          </p>
                        </div>
                        <Badge
                          variant={
                            compra.status === "delivered"
                              ? "default"
                              : compra.status === "pending"
                              ? "secondary"
                              : "destructive"
                          }
                          className="transition-transform duration-200 group-hover:scale-110"
                        >
                          {compra.status}
                        </Badge>
                      </div>
                    ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#2d2d2d]">
                Pedidos Activos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                {isLoading
                  ? Array(2)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center mb-4"
                        >
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-3 w-[80px]" />
                          </div>
                          <Skeleton className="h-6 w-[80px]" />
                        </div>
                      ))
                  : activeOrders.map((order) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center mb-4 group"
                      >
                        <div>
                          <p
                            className={`text-sm font-medium text-[#2d2d2d] group-hover:text-[#ef233c] transition-colors duration-200`}
                          >
                            Pedido #{order.id}
                          </p>
                          <p className="text-xs text-gray-600">{order.date}</p>
                        </div>
                        <Badge
                          variant="secondary"
                          className="transition-transform duration-200 group-hover:scale-110"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#2d2d2d]">
                Favoritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] pr-4">
                {isLoading
                  ? Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center mb-4"
                        >
                          <Skeleton className="h-4 w-[150px]" />
                          <Skeleton className="h-4 w-[50px]" />
                        </div>
                      ))
                  : favorites.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between items-center mb-4 group"
                      >
                        <p
                          className={`text-sm font-medium text-[#2d2d2d] group-hover:text-[#ef233c] transition-colors duration-200`}
                        >
                          {item.name}
                        </p>
                        <p className="text-sm text-gray-600">$ {item.price}</p>
                      </div>
                    ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#2d2d2d]">
                Gestión Financiera
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-[#2d2d2d] mb-2">
                    Métodos de Pago
                  </h4>
                  {isLoading ? (
                    <Skeleton className="h-6 w-[200px]" />
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        **** **** **** 1234
                      </span>
                    </div>
                  )}
                </div>
                <Separator className="bg-gray-200" />
                <div>
                  <h4 className="text-sm font-medium text-[#2d2d2d] mb-2">
                    Transacciones Recientes
                  </h4>
                  <ScrollArea className="h-[100px] pr-4">
                    {isLoading
                      ? Array(3)
                          .fill(0)
                          .map((_, i) => (
                            <div
                              key={i}
                              className="flex justify-between items-center mb-4"
                            >
                              <div className="space-y-2">
                                <Skeleton className="h-4 w-[100px]" />
                                <Skeleton className="h-3 w-[80px]" />
                              </div>
                              <Skeleton className="h-4 w-[60px]" />
                            </div>
                          ))
                      : transactions.map((transaction) => (
                          <div
                            key={transaction.compraId}
                            className="flex justify-between items-center mb-4 group"
                          >
                            <div>
                              <p
                                className={`text-sm font-medium text-[#2d2d2d] group-hover:text-[#ef233c] transition-colors duration-200`}
                              >
                                {transaction.paymentMethod}
                              </p>
                              <p className="text-xs text-gray-600">
                                {new Date(
                                  transaction.purchaseDate
                                ).toLocaleDateString("en-CA")}
                              </p>
                            </div>
                            <span
                              className={`text-sm ${
                                transaction.total.toString().startsWith("+")
                                  ? "text-green-500"
                                  : "text-[#ef233c]"
                              }`}
                            >
                              $ {transaction.total}
                            </span>
                          </div>
                        ))}
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#2d2d2d]">
                Soporte
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              {isLoading ? (
                <>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </>
              ) : (
                <>
                  <Link href="/help">
                    <Button
                      variant="outline"
                      className={`w-full justify-start hover:bg-gray-100 transition-colors duration-200 text-[#2d2d2d]`}
                      onClick={() =>
                        console.log(
                          "Redirigiendo a las preguntas frecuentes..."
                        )
                      }
                    >
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Preguntas Frecuentes
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className={`w-full justify-start hover:bg-gray-100 transition-colors duration-200 text-[#2d2d2d]`}
                    onClick={() => console.log("Iniciando chat de soporte...")}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Chat de Soporte
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
