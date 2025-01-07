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

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Users",
      value: "1,234",
      icon: Users,
      trend: "+12% from last month",
    },
    {
      title: "Revenue",
      value: "$45,678",
      icon: DollarSign,
      trend: "+8% from last month",
    },
    {
      title: "Orders",
      value: "892",
      icon: ShoppingCart,
      trend: "+5% from last month",
    },
    {
      title: "Growth",
      value: "23%",
      icon: TrendingUp,
      trend: "+2% from last month",
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#ef233c]">
          Resumen del Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Última actualización: hace 5 minutos
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
            {[
              {
                action: "New user registered",
                time: "2 hours ago",
                icon: Users,
              },
              {
                action: "Sales report generated",
                time: "4 hours ago",
                icon: FileText,
              },
              {
                action: "New order received",
                time: "5 hours ago",
                icon: ShoppingCart,
              },
            ].map((item, index) => (
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
