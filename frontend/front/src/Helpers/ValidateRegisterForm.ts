// validateRegisterForm.ts
import { IRegisterProps, IRegisterErrors } from "@/interfaces/IRegisterProps";

const validateRegisterForm = (values: IRegisterProps): IRegisterErrors => {
  const errors: IRegisterErrors = {
    name: "",
    email: "",
    password: "",
  };

  // Validación para el nombre (no vacío)
  if (!values.name.trim()) {
    errors.name = "El nombre es requerido.";
  } else if (values.name.length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres.";
  }

  // Validación para el email
  if (!values.email.trim()) {
    errors.email = "El correo electrónico es requerido.";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  // Validación para la contraseña
  if (!values.password.trim()) {
    errors.password = "La contraseña es requerida.";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener al menos 6 caracteres.";
  } else if (
    !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&()_+\-=\[\]{};':"\\|,.<>/?]).+$/.test(
      values.password
    )
  ) {
    errors.password =
      "La contraseña debe incluir al menos una letra mayúscula, un número y un carácter especial.";
  }

  // Validación para confirmar que las contraseñas coinciden

  return errors;
};

export default validateRegisterForm;
