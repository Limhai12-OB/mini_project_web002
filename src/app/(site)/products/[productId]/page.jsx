import { getProductById } from "../../../../service/product.service";
import ProductDetailComponent from "../../../../components/product/ProductDetailComponent";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const product = await getProductById(resolvedParams?.productId);

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h1 className="text-2xl font-semibold text-gray-900">
          Product not found
        </h1>
        <p className="mt-2 text-gray-600">Please go back and try another.</p>
      </div>
    );
  }

  return <ProductDetailComponent product={product} />;
}