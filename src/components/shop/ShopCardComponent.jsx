import Link from "next/link";
import Image from "next/image";
import { StarRow } from "../ProductCardComponent";
import { div } from "framer-motion/client";

export default function ShopCardComponent({ product }) {
  const { price, name, productId, description, imageUrl } = product;

  return (
      <article className="group w-75 flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800"
            }
            alt={name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {name}
            </h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
              {description}
            </p>
          </div>
          <StarRow />
          <div className="mt-auto flex items-center justify-between pt-2">
            <p className="text-xl font-semibold text-gray-900">${price}</p>
          </div>
          <Link
            href={`/products/${productId}`}
            className="mt-2 block w-full rounded-xl bg-gray-900 py-2.5 text-center text-sm font-medium text-white transition hover:bg-gray-800"
          >
            View Product
          </Link>
        </div>
      </article>
  );
}
