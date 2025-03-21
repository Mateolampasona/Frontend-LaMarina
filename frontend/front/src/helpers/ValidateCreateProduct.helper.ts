interface ICreateProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: number;
  isActive: boolean;
  image: File | null;
}

interface ValidationErrors {
  name?: string;
  description?: string;
  price?: string;
  stock?: string;
  category_id?: string;
  image?: string;
}

const ValidateCreateProduct = (product: ICreateProduct): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (!product.name) {
    errors.name = "El nombre del producto es obligatorio.";
  }

  if (!product.description) {
    errors.description = "La descripción del producto es obligatoria.";
  }

  if (product.price <= 0) {
    errors.price = "El precio debe ser mayor que cero.";
  }

  if (product.stock < 0) {
    errors.stock = "Las existencias no pueden ser negativas.";
  }

  if (product.category_id <= 0) {
    errors.category_id = "Debe seleccionar una categoría válida.";
  }

  return errors;
};

export default ValidateCreateProduct;
