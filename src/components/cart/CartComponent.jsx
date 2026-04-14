"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCart } from "./cart-context";

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

export default function CartComponent() {
  const {
    items,
    increment,
    decrement,
    removeItem,
    clear,
    subtotal,
    totalQuantity,
  } = useCart();

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-10 lg:py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Your cart
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Cart is stored in memory for this visit — refreshing the page clears
            it.
          </p>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-600">
        {totalQuantity} product{totalQuantity === 1 ? "" : "s"} in cart
      </p>

      <div className="mt-6">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
              <p className="text-gray-700">Your cart is empty.</p>
            </div>
          ) : (
            items.map((item) => {
              const imgOk = isValidImageSrc(item.imageUrl);
              const lineTotal =
                Number(item.price ?? 0) * Number(item.quantity ?? 0);
              return (
                <div
                  key={`${item.productId}::${item.color ?? ""}::${item.size ?? ""}`}
                  className="flex items-center gap-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="relative size-16 overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                    {imgOk ? (
                      <Image
                        src={String(item.imageUrl).trim()}
                        alt={item.name ?? "Product"}
                        fill
                        className="object-contain p-2"
                        sizes="64px"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-xl text-gray-300">
                        ◇
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {item.name ?? "Product"}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {(item.color ?? "green") +
                        (item.size ? ` · ${item.size}` : "")}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {toCurrency(item.price)}{" "}
                      <span className="text-xs font-medium text-gray-500">
                        each
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 items-center overflow-hidden rounded-full border border-gray-200 bg-white">
                      <button
                        type="button"
                        onClick={() =>
                          decrement(item.productId, {
                            color: item.color ?? null,
                            size: item.size ?? null,
                          })
                        }
                        className="h-full px-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="min-w-9 text-center text-sm font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          increment(item.productId, {
                            color: item.color ?? null,
                            size: item.size ?? null,
                          })
                        }
                        className="h-full px-3 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex min-w-24 flex-col items-end">
                    <p className="text-sm font-semibold text-gray-900">
                      {toCurrency(lineTotal)}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.productId, {
                          color: item.color ?? null,
                          size: item.size ?? null,
                        })
                      }
                      className="mt-1 text-xs font-semibold text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <aside className="h-full mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-900">Subtotal</p>
              <p className="mt-1 text-xs text-gray-500">
                Tax and shipping calculated at checkout (demo).
              </p>
            </div>
            <p className="text-sm font-semibold text-gray-900">
              {toCurrency(subtotal)}
            </p>
          </div>

          <button
            type="button"
            className="mt-5 h-10 w-full rounded-full bg-indigo-900 text-sm font-semibold text-white hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Checkout
          </button>
          <button
            type="button"
            onClick={clear}
            className="mt-3 h-10 w-full rounded-full bg-gray-100 text-sm font-semibold text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Clear cart
          </button>
        </aside>
      </div>
    </section>
  );
}
