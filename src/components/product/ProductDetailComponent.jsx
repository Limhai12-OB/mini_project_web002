"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cart/cart-context";

function isValidImageSrc(url) {
  if (url == null) return false;
  const value = String(url).trim();
  if (!value || value.toLowerCase() === "string") return false;
  if (value.startsWith("/")) return true;

  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
} 
function toCurrency(value) {
  const price = Number(value ?? 0);
  return `$${price.toFixed(2)}`;
} 
export default function ProductDetailComponent({ product }) {
  const normalized = {
    productId: product?.productId,
    name: product?.name ?? product?.productName ?? "Product",
    description:
      product?.description ??
      "A deep cleansing foam that leaves your skin refreshed and smooth.",
    price: Number(product?.price ?? 0),
    imageUrl: isValidImageSrc(product?.imageUrl)
      ? String(product.imageUrl).trim()
      : null,
  }; 
  const [selectedColor, setSelectedColor] = useState("green");
  const [selectedSize, setSelectedSize] = useState("s");
  const [quantity, setQuantity] = useState(1);
  const colors = ["green", "gray"];
  const sizes = ["s", "m", "l"];
  const { addItem } = useCart();
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 lg:py-14">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-gray-800">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-gray-800">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-gray-700">{normalized.name}</span>
      </nav> 
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          {normalized.imageUrl ? (
            <Image
              src={normalized.imageUrl}
              alt={normalized.name}
              fill
              className="object-contain p-10"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex size-full items-center justify-center text-5xl text-gray-300">
              ◇
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              {normalized.name}
            </h1>
            <p className="pt-2 text-xl text-amber-400">★★★★☆</p>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <p className="text-4xl font-semibold text-indigo-900">
              {toCurrency(normalized.price)}
            </p>
          </div>
          <div className="mt-7">
            <p className="mb-3 text-sm font-semibold text-gray-800">
              Choose a color
            </p>
            <div className="flex items-center gap-3">
              {colors.map((color) => {
                const active = selectedColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
                      active
                        ? "border-green-500 bg-green-100 text-green-800"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {color}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Selected: {selectedColor}
            </p>
          </div>
          <div className="mt-7">
            <p className="mb-3 text-sm font-semibold text-gray-800">
              Choose a size
            </p>
            <div className="flex items-center gap-3">
              {sizes.map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`size-10 rounded-full border text-sm font-semibold uppercase transition ${
                      active
                        ? "border-blue-400 bg-blue-50 text-blue-700"
                        : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
          <p className="mt-7 max-w-xl text-gray-600">
            {normalized.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex h-11 items-center overflow-hidden rounded-full border border-gray-200 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-full px-4 text-lg text-gray-700 hover:bg-gray-100"
              >
                -
              </button>
              <span className="min-w-10 text-center text-sm font-medium text-gray-800">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="h-full px-4 text-lg text-gray-700 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                addItem(
                  {
                    ...normalized,
                    color: selectedColor,
                    size: selectedSize,
                  },
                  quantity,
                )
              }
              className="h-11 min-w-52 rounded-full bg-indigo-900 px-8 text-sm font-semibold text-white hover:bg-indigo-800"
            >
              Add to cart
            </button>
          </div>
          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-5 py-4">
            <p className="text-sm font-semibold text-gray-800">
              Free 30-day returns
            </p>
            <p className="mt-1 text-sm text-gray-500">
              See return policy details in cart.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
