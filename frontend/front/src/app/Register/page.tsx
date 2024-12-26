"use client";
import { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Link from "next/link";
import Swal from "sweetalert2";
import validateRegisterForm from "@/helpers/ValidateRegisterForm";
import { register } from "@/helpers/authHelper";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log("hola");
  

  const [error, setError] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched({ ...touched, [e.target.name]: true });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  useEffect(() => {
    const errors = validateRegisterForm(userData);
    setError(errors);
  }, [userData]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateRegisterForm(userData);
    if (Object.values(errors).some((error) => error)) {
      setError(errors);
      return;
    }
  
    try {
      const res = await register(userData);
      console.log(res);
      Swal.fire({
        title: "Registro exitoso",
        icon: "success",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton: "bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
  
      const UrlParams = new URLSearchParams(window.location.search);
      const redirect = UrlParams.get("redirect");
      if (redirect) {
        router.push(`/login?redirect=${redirect}`);
      } else {
        router.push("/");
      }
    } catch (error: unknown) {
      console.log("Error en el catch:", error);
      let errorMessage = "Ocurrió un error en el registro.";
      if (error instanceof Error) {
        if (error.message.includes("User already exists")) {
          errorMessage = "El correo electrónico ya está registrado.";
        } else {
          errorMessage = error.message;
        }
      }
      Swal.fire({
        title: "Error en el registro",
        text: errorMessage,
        icon: "error",
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          confirmButton: "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edede9] relative overflow-hidden">
      <div>
        <div className="bg-white p-8 rounded-lg shadow-2xl w-96 z-10 relative backdrop-blur-sm bg-opacity-80">
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-[#ef233c] rounded-full p-3 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-4">
            Registro
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-gray-700">
                Nombre
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                required
                className="w-full bg-gray-50 border-gray-300 focus:border-[#ef233c] focus:ring-[#ef233c]"
              />
              {error.name && touched.name && (
                <p className="text-red-500">{error.name}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-700">
                Correo Electrónico
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                required
                className="w-full bg-gray-50 border-gray-300 focus:border-[#ef233c] focus:ring-[#ef233c]"
              />
              {error.email && touched.email && (
                <p className="text-red-500">{error.email}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-700">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={userData.password}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  required
                  className="w-full bg-gray-50 border-gray-300 focus:border-[#ef233c] focus:ring-[#ef233c]"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeClosed className="w-6 h-6 text-gray-500" />
                  ) : (
                    <Eye className="w-6 h-6 text-gray-500" />
                  )}
                </button>
              </div>
              {error.password && touched.password && (
                <p className="text-red-500">{error.password}</p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  required
                  className="w-full bg-gray-50 border-gray-300 focus:border-[#ef233c] focus:ring-[#ef233c]"
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeClosed className="w-6 h-6 text-gray-500" />
                  ) : (
                    <Eye className="w-6 h-6 text-gray-500" />
                  )}
                </button>
              </div>
              {error.confirmPassword && touched.confirmPassword && (
                <p className="text-red-500">{error.confirmPassword}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-[#ef233c] hover:bg-[#d90429] transition-colors duration-300 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg"
            >
              Registrarse
            </Button>
          </form>
          <p className="mt-6 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/Login"
              className="text-[#ef233c] hover:underline font-semibold"
            >
              Inicia Sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
