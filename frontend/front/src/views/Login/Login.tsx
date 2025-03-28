"use client";
import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import { forgotPassword, login } from "@/helpers/auth.helper";
import Cookies from "js-cookie";
import validateLoginForm from "@/helpers/validateLoginForm.helper";
import { Eye, EyeClosed } from "lucide-react";

const APIURL = process.env.NEXT_PUBLIC_BACKEND_URL;
const FRONTURL = process.env.NEXT_PUBLIC_FRONTEND_URL;

export default function Login() {
  const handleGoogleLogin = () => {
    window.location.href = `${APIURL}/auth/google/login`;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      console.log(`Token: ${token}`);
      Cookies.set("accessToken", JSON.stringify(token));
      window.location.href = "/";
    } else {
      console.log("No token found");
    }
  }, []);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const lowerCaseUserData = {
      ...userData,
      email: userData.email.toLowerCase(),
      password: userData.password,
    };

    // Validación del formulario
    const errors = validateLoginForm(lowerCaseUserData);
    setErrors(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      Swal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos antes de continuar.",
        icon: "warning",
        customClass: {
          popup: "bg-[#edede9] shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          htmlContainer: "text-[#ef233c]", 
          confirmButton:
            "bg-[#ef233c] hover:bg-[#d61e36] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
      return;
    }

    try {
      const response = await login(lowerCaseUserData);
      const { accessToken } = response;

      // Guardar token en cookies
      Cookies.set("accessToken", JSON.stringify(accessToken), {
        expires: 1 / 24, // Expiración de 1 hora
      });

      // Pop-up de éxito
     Swal.fire({
       title: "¡Éxito!",
       text: "Has iniciado sesión correctamente.",
       icon: "success",
       customClass: {
         popup: "bg-[#edede9] shadow-lg rounded-lg p-6",
         title: "text-2xl font-semibold text-gray-800",
         htmlContainer: "text-[#ef233c]", 
         confirmButton:
           "bg-[#ef233c] hover:bg-[#d61e36] text-white font-bold py-2 px-4 rounded",
       },
       buttonsStyling: false,
     }).then(() => {
       window.location.href = `${FRONTURL}`;
     });
    } catch (error: unknown) {
      setErrors({ email: "Email o contraseña incorrectos.", password: "" });
      // Pop-up de error
      Swal.fire({
        title: "Error",
        text: `No se pudo iniciar sesión. ${(error as Error).message}`,
        icon: "error",
        customClass: {
          popup: "bg-[#edede9] shadow-lg rounded-lg p-6",
          title: "text-2xl font-semibold text-gray-800",
          htmlContainer: "text-[#ef233c]", 
          confirmButton:
            "bg-[#ef233c] hover:bg-[#d61e36] text-white font-bold py-2 px-4 rounded",
        },
        buttonsStyling: false,
      });
    }
  };
  const handleForgotPassword = () => {
    Swal.fire({
      title: "Recuperar contraseña",
      html: `
    <input type="email" id="swal-input-email" class="swal2-input" placeholder="Correo electrónico">
  `,
      showCancelButton: true,
      confirmButtonText: "Enviar",
      customClass: {
        popup: "bg-[#edede9] shadow-lg rounded-lg p-6",
        title: "text-2xl font-semibold text-gray-800",
        confirmButton:
          "bg-[#164E78] hover:bg-[#169978] text-white font-bold py-2 px-4 rounded",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded",
      },
      buttonsStyling: false,
      preConfirm: () => {
        const email = (
          document.getElementById("swal-input-email") as HTMLInputElement
        ).value;
        if (!email) {
          Swal.showValidationMessage(
            "Por favor, ingresa tu correo electrónico"
          );
        }
        return { email };
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { email } = result.value;
        const minEmail = email.toLowerCase();
        try {
          await forgotPassword(minEmail);
         
        } catch (error: unknown) {
          Swal.fire({
            title: "Error",
            text: `No se pudo enviar el correo de recuperación. Inténtalo de nuevo más tarde. ${
              (error as Error).message
            }`,
            icon: "error",
            customClass: {
              popup: "bg-[#edede9] shadow-lg rounded-lg p-6",
              title: "text-2xl font-semibold text-gray-800",
              confirmButton:
                "bg-[#D9534F] hover:bg-[#C9302C] text-white font-bold py-2 px-4 rounded",
            },
            buttonsStyling: false,
          });
        }
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#edede9] relative">
      <div className="absolute inset-0 z-0 bg-[#edede9] bg-opacity-65 backdrop-blur-sm filter" />

      <div className="bg-white px-6 py-8 rounded-lg shadow-2xl max-w-md w-full z-10 relative backdrop-blur-sm bg-opacity-80">
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-4">
          Iniciar Sesión
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
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
              className="w-full bg-gray-50 border-gray-300 focus:border-[#ef233c] focus:ring-[#ef233c] p-2"
            />
            {touched.email && errors.email && (
              <span className="text-red-500 text-sm block">{errors.email}</span>
            )}
          </div>
          <div className="mb-4">
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
                className="w-full bg-gray-50 border-gray-300 focus:border-[#ef233c] focus:ring-[#ef233c] p-2 pr-10"
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
            {touched.password && errors.password && (
              <span className="text-red-500 text-sm block">
                {errors.password}
              </span>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-[#ef233c] hover:bg-[#d90429] transition-colors duration-300 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:shadow-lg"
          >
            Iniciar Sesión
          </Button>
        </form>
        <div className="flex items-end justify-end mt-4 text-gray-900">
          <button
            onClick={handleGoogleLogin}
            className="mx-auto w-full rounded-lg bg-slate-200 flex flex-row items-center justify-center gap-x-2 px-4 py-3 text-sm duration-200 hover:bg-slate-300"
          >
            Inicia Sesión con Google{" "}
            <Image src="google.svg" alt="google" width={20} height={20} />
          </button>
        </div>
        <div>
          <button
            onClick={handleForgotPassword}
            className="mt-4 text-[#ef233c] hover:underline font-semibold"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>
        <p className="mt-6 text-center text-sm text-gray-600">
          ¿No tienes una cuenta?{" "}
          <Link
            href={`${FRONTURL}/register`}
            className="text-[#ef233c] hover:underline font-semibold"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
