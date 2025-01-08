import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { User } from "lucide-react";

export function ProfileInfo() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
        <AvatarFallback>
          <User className="h-10 w-10" />
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold text-[#2d2d2d]">Juan Pérez</h3>
        <p className="text-sm text-gray-600">juan.perez@ejemplo.com</p>
      </div>
    </div>
  );
}
