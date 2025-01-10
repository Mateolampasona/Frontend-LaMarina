import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { IProfileInfoProps } from "@/interfaces/IProfileInfoProps";
import { User } from "lucide-react";

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function ProfileInfo({name,email}:IProfileInfoProps) {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src="/placeholder-avatar.jpg" alt="Avatar" />
        <AvatarFallback>
          <User className="h-10 w-10" />
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold text-[#2d2d2d]">{capitalizeFirstLetter(name) || "Nombre"}</h3>
        <p className="text-sm text-gray-600">{capitalizeFirstLetter(email) || "Client@mail.com"}</p>
      </div>
    </div>
  );
}
