"use client";

import { HeroUIProvider } from "@heroui/react";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { CartProvider } from "../components/cart/cart-context";

export default function Provider({ children }) {
  return (
    <SessionProvider>
      <HeroUIProvider>
        <CartProvider>{children}</CartProvider>
      </HeroUIProvider>
    </SessionProvider>
  );
}
