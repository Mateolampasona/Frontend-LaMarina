import { LucideIcon } from "lucide-react";
import { Card } from "@/Components/ui/card";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendColor?: string;
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendColor = "text-green-500",
}: StatsCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">{title}</p>
            <h3 className="mt-1 text-2xl font-semibold">{value}</h3>
            <p className={`mt-1 text-sm ${trendColor}`}>{trend}</p>
          </div>
          <div className="rounded-full bg-[#edede9] p-3">
            <Icon className="h-6 w-6 text-[#ef233c]" />
          </div>
        </div>
      </div>
      <div className="bg-[#edede9] px-6 py-2">
        <button className="text-sm text-[#ef233c] hover:underline">
          View Details →
        </button>
      </div>
    </Card>
  );
}
