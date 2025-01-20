import { getProductById } from "@/Helpers/products.helpers";
import { ProductDetail } from "@/Components/ProductDetail";
import { notFound } from "next/navigation";
import { UserProvider } from "@/Context/userContext";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const product = await getProductById(Number(resolvedParams.id));

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <UserProvider>
        <ProductDetail product={product} />
      </UserProvider>
    </div>
  );
}
