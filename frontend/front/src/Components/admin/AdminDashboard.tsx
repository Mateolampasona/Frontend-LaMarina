"use client";
import React from "react";

import { Card } from "@/Components/ui/card";
import {
  Users, // Usuarios
  DollarSign, // Signo de dólar
  ShoppingCart, // Carrito de compras
  ArrowRight, // Flecha derecha
} from "lucide-react";

interface StatItem {
  title: string; // Título
  value: string; // Valor
  trend: string; // Tendencia
}

interface RecentActivity {
  action: string; // Acción
  time: string; // Hora
}

interface QuickAction {
  label: string; // Etiqueta
  onClick?: () => void; // Acción al hacer clic
}

const recentActivityIcons = [Users, DollarSign, ShoppingCart]; // Iconos de actividades recientes
const quickActionIcons = [Users, DollarSign]; // Iconos de acciones rápidas

export function AdminDashboard() {
  const stats: StatItem[] = [
    {
      title: "Usuarios Totales",
      value: "1,234",
      trend: "+12% desde el mes pasado",
    },
    {
      title: "Ingresos",
      value: "$45,678",
      trend: "+8% desde el mes pasado",
    },
    {
      title: "Órdenes",
      value: "892",
      trend: "+5% desde el mes pasado",
    },
    {
      title: "Crecimiento",
      value: "23%",
      trend: "+2% desde el mes pasado",
    },
  ];

  const recentActivity: RecentActivity[] = [
    { action: "Usuario registrado", time: "Hace 2 horas" },
    { action: "Orden realizada", time: "Hace 3 horas" },
    { action: "Pago recibido", time: "Hace 4 horas" },
  ];

  const quickActions: QuickAction[] = [
    {
      label: "Agregar Usuario",
      onClick: () => console.log("Agregar Usuario clickeado"),
    },
    {
      label: "Generar Reporte",
      onClick: () => console.log("Generar Reporte clickeado"),
    },
  ];

  return (
    <div className="p-6 bg-[#edede9]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#ef233c]">
          Resumen del Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Última actualización: Hace 5 minutos
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
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
            {recentActivity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0"
              >
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-gray-500">{item.time}</p>
                </div>
                <div className="rounded-full bg-[#edede9] p-2">
                  {React.createElement(recentActivityIcons[index], {
                    className: "h-5 w-5 text-[#ef233c]",
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="mb-4 text-lg font-semibold">Acciones Rápidas</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={action.label}
                onClick={action.onClick}
                className="flex items-center justify-center space-x-2 rounded-lg bg-[#edede9] px-4 py-3 text-sm font-medium text-[#ef233c] transition-colors hover:bg-opacity-80"
              >
                {React.createElement(quickActionIcons[index], {
                  className: "h-5 w-5",
                })}
                <span>{action.label}</span>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, trend }: StatItem) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
            <p className="mt-1 text-sm text-green-500">{trend}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#edede9] px-6 py-2">
        <button className="text-sm text-[#ef233c] hover:underline">
          Ver Detalles →
        </button>
      </div>
    </Card>
  );
}
