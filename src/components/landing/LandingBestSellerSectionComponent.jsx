"use client";

import React from "react";
import ProductCardComponent from "../ProductCardComponent";
import { useSession } from "next-auth/react";
import { div } from "framer-motion/client";

export default function LandingBestSellerSectionComponent({ items }) {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  return (
    <section className="mx-auto w-full max-w-7xl py-16 lg:py-20">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Best selling products
          </h2>
          <p className="mt-2 text-gray-500">
            Tap + to add — state syncs with your cart in the header.
          </p>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-6">
        {isAuthenticated ? (
          items.map((product, index) => (
            <div>
              <p>pro</p>
              <ProductCardComponent product={product} key={index} />
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-full w-full">
            <p className="text-gray-500 text-center">no products to show</p>
          </div>
        )}
      </div>
    </section>
  );
}
