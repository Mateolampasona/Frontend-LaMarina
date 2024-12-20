import { ILoginProps, ILoginErrors } from "@/interfaces/ILoginProps";

const validateLoginForm = (data: ILoginProps): ILoginErrors => {
  const errors: ILoginErrors = {};

  // Validar el email
  if (!data.email) {
    errors.email = "El email es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "El email no es válido.";
  }

  // Validar la contraseña
  if (!data.password) {
    errors.password = "La contraseña es requerida.";
  } else if (data.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  return errors;
};

export default validateLoginForm;
