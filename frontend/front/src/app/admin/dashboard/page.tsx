"use client";

import { Card } from "@/Components/ui/card";
import { StatsCard } from "@/Components/dashboard/StatsCard";
import {
  Users,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  ArrowRight,
  FileText,
  Settings,
} from "lucide-react";
import {
  getLastUser,
  getTotalUsers,
  getUserById,
} from "@/helpers/users.helpers";
import { useEffect, useState } from "react";
import { IUser } from "@/interfaces/IUser";
import Cookies from "js-cookie";
import { useUserContext } from "@/Context/userContext";
import { getLastCompra, getTotalVentas } from "@/helpers/compras.helper";
import { getLastOrder, getTotalCarts } from "@/helpers/orders.helper";
import { IOrder } from "@/interfaces/IOrder";
import socket from "@/utils/socket";

export default function DashboardPage() {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalVentas, setTotalVentas] = useState<number>(0);
  const [totalCarts, setTotalCarts] = useState<number>(0);
  const [lastCart, setLastCart] = useState<IOrder>();
  const [lastUser, setLastUser] = useState<IUser>();
  const [minutesAgoUser, setMinutesAgoUser] = useState<number>(0);
  const [hoursAgoUser, setHoursAgoUser] = useState<number>(0);
  const [hoursAgoCart, setHoursAgoCart] = useState<number>(0);
  const [minutesAgoCart, setMinutesAgoCart] = useState<number>(0);
  const [lastCompra, setLastCompra] = useState<IOrder>();
  const [minutesAgoCompra, setMinutesAgoCompra] = useState<number>(0);
  const [hoursAgoCompra, setHoursAgoCompra] = useState<number>(0);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [minutesAgoUpdate, setMinutesAgoUpdate] = useState<number>(0);
  const token = Cookies.get("accessToken") || "null";
  const { userId } = useUserContext();
  const [user, setUser] = useState<IUser>();
  console.log(user);

  const stats = [
    {
      title: "Total de usuarios",
      value: `${totalUsers}`,
      icon: Users,
      trend: "+12% from last month",
    },
    {
      title: "Ventas",
      value: `${totalVentas}`,
      icon: DollarSign,
      trend: "+8% from last month",
    },
    {
      title: "Carritos",
      value: `${totalCarts}`,
      icon: ShoppingCart,
      trend: "+5% from last month",
    },
    {
      title: "Estadisticas",
      value: "23%",
      icon: TrendingUp,
      trend: "+2% from last month",
    },
  ];

  const recentActivities = [
    {
      action: "Ultimo usuario registrado",
      time: `${hoursAgoUser} hours and ${minutesAgoUser} minutes ago`,
      icon: Users,
    },
    {
      action: "Ultimo carrito realizado",
      time: `${hoursAgoCart} hours and ${minutesAgoCart} minutes ago`,
      icon: ShoppingCart,
    },
    {
      action: "Ultima venta realizada",
      time: `${hoursAgoCompra} hours and ${minutesAgoCompra} minutes ago`,
      icon: FileText,
    },
  ];

  // Fetch totals data
  useEffect(() => {
    const fetchTotalsData = async () => {
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
        const totalUsers = await getTotalUsers(parsedToken);
        setTotalUsers(totalUsers);
        const totalVentas = await getTotalVentas(parsedToken);
        setTotalVentas(totalVentas);
        const totalCarts = await getTotalCarts(parsedToken);
        setTotalCarts(totalCarts);
        const lastCart = await getLastOrder(parsedToken);
        setLastCart(lastCart);
        const lastCompra = await getLastCompra(parsedToken);
        setLastCompra(lastCompra);
        const lastUser = await getLastUser(parsedToken);
        setLastUser(lastUser);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    if (token) {
      fetchTotalsData();
    }
  }, [token]);

  // Socket
  useEffect(() => {
    const handleDashboardUpdate = async () => {
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
        const totalUsers = await getTotalUsers(parsedToken);
        setTotalUsers(totalUsers);
        const totalVentas = await getTotalVentas(parsedToken);
        setTotalVentas(totalVentas);
        const totalCarts = await getTotalCarts(parsedToken);
        setTotalCarts(totalCarts);
        const lastCart = await getLastOrder(parsedToken);
        setLastCart(lastCart);
        const lastCompra = await getLastCompra(parsedToken);
        setLastCompra(lastCompra);
        const lastUser = await getLastUser(parsedToken);
        setLastUser(lastUser);
        setLastUpdate(new Date());
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };
    socket.on("adminDashboardUpdate", handleDashboardUpdate);

    return () => {
      socket.off("adminDashboardUpdate", handleDashboardUpdate);
    };
  }, [token]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = now.getTime() - lastUpdate.getTime();
      const minutes = Math.floor(timeDifference / (1000 * 60));
      setMinutesAgoUpdate(minutes);
    }, 60000);

    return () => clearInterval(interval);
  }, [lastUpdate]);

  // Calcular tiempo desde el ultimo cart
  useEffect(() => {
    const calculateTimeDifferenceCart = () => {
      if (lastCart) {
        const now = new Date();
        const orderDate = new Date(lastCart.createdAt);
        const timeDifference = now.getTime() - orderDate.getTime();

        if (timeDifference >= 0) {
          setHoursAgoCart(Math.floor(timeDifference / (1000 * 60 * 60)));
          setMinutesAgoCart(
            Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
          );
        } else {
          console.error("Order date is in the future");
          setHoursAgoCart(0);
          setMinutesAgoCart(0);
        }
      }
    };

    calculateTimeDifferenceCart();
    const interval = setInterval(calculateTimeDifferenceCart, 60000);

    return () => clearInterval(interval);
  }, [lastCart]);

  // Calcular diferencia de tiempo del último usuario
  useEffect(() => {
    const calculateTimeDifferenceUser = () => {
      if (lastUser) {
        const now = new Date();
        const userDate = new Date(lastUser.createdAt);
        const timeDifference = now.getTime() - userDate.getTime();

        if (timeDifference >= 0) {
          setHoursAgoUser(Math.floor(timeDifference / (1000 * 60 * 60)));
          setMinutesAgoUser(
            Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
          );
        } else {
          console.error("User date is in the future");
          setHoursAgoUser(0);
          setMinutesAgoUser(0);
        }
      }
    };

    calculateTimeDifferenceUser();
    const interval = setInterval(calculateTimeDifferenceUser, 60000);

    return () => clearInterval(interval);
  }, [lastUser]);

  // Calcular diferencia de tiempo de la última compra
  useEffect(() => {
    const calculateTimeDifferenceCompra = () => {
      if (lastCompra) {
        const now = new Date();
        const orderDate = new Date(lastCompra.createdAt);
        const timeDifference = now.getTime() - orderDate.getTime();

        if (timeDifference >= 0) {
          setHoursAgoCompra(Math.floor(timeDifference / (1000 * 60 * 60)));
          setMinutesAgoCompra(
            Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
          );
        } else {
          console.error("Order date is in the future");
          setHoursAgoCompra(0);
          setMinutesAgoCompra(0);
        }
      }
    };

    calculateTimeDifferenceCompra();
    const interval = setInterval(calculateTimeDifferenceCompra, 60000); // Update every minute

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [lastCompra]);

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
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    if (userId && token) {
      fetchUser();
    }
  }, [userId, token]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#ef233c]">
          Resumen del Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Última actualización: hace {minutesAgoUpdate} minutos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Actividad Reciente</h2>
            <button className="flex items-center text-sm text-[#ef233c] hover:underline">
              Ver Todo <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                <div className="rounded-full bg-[#edede9] p-2">
                  <item.icon className="h-5 w-5 text-[#ef233c]" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Add User", icon: Users },
              { label: "Create Report", icon: FileText },
              { label: "View Analytics", icon: TrendingUp },
              { label: "Update Settings", icon: Settings },
            ].map((action) => (
              <button
                key={action.label}
                className="flex items-center justify-center space-x-2 rounded-lg bg-[#edede9] px-4 py-3 text-sm font-medium text-[#ef233c] transition-colors hover:bg-opacity-80"
              >
                <action.icon className="h-4 w-4" />
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
