import { useState, useRef } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";

import { IEditProfileFormProps } from "@/interfaces/IEditProfileform";
import { useUserContext } from "@/Context/userContext";
import Cookies from "js-cookie";
import { modifyUser } from "@/helpers/users.helpers";
import Swal from "sweetalert2";

export function EditProfileForm({
  name: initialName,
  email: initialEmail,
  onCancel,
}: IEditProfileFormProps) {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  // const fileInputRef = useRef<HTMLInputElement>(null);
  const token = Cookies.get("accessToken") || "null";
  const { userId } = useUserContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      console.log("No token found");
      return;
    }
    let parsedToken;
    try {
      parsedToken = JSON.parse(token);
    } catch (error) {
      console.log("Error parsing token", error);
      return;
    }
    if (typeof parsedToken !== "string") {
      console.error("Invalid token format");
      return;
    }
    try {
      const modifyData = {
        name: name.toLocaleLowerCase(),
        email: email.toLocaleLowerCase(),
      };
      await modifyUser(parsedToken, Number(userId), modifyData);
      Swal.fire({
        title: "Perfil actualizado",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        onCancel();
      });
      onCancel();
    } catch (error) {
      console.error("Error al actualizar el perfil", error);
    }
  };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePicture(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const triggerFileInput = () => {
  //   fileInputRef.current?.click();
  // };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* <div className="flex flex-col items-center">
        <Avatar
          className="w-24 h-24 cursor-pointer relative"
          onClick={triggerFileInput}
        >
          <AvatarImage src={profilePicture || "/placeholder.svg"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <Camera className="text-white" />
          </div>
        </Avatar>
        <Input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        <Button
          type="button"
          variant="ghost"
          className="mt-2"
          onClick={triggerFileInput}
        >
          Cambiar foto
        </Button>
      </div> */}
      <div>
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit">Guardar cambios</Button>
      </div>
    </form>
  );
}
