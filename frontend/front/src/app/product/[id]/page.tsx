import { getProductById } from "@/helpers/products.helpers";
import { ProductDetail } from "@/Components/ProductDetail";
import { notFound } from 'next/navigation';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      <ProductDetail product={product} />
    </div>
  );
}