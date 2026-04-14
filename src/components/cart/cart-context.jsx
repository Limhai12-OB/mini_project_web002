"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

function normalizeProduct(product) {
  return {
    productId: product?.productId ?? product?.id ?? product?._id,
    name: product?.name ?? product?.productName ?? "Product",
    price: Number(product?.price ?? 0),
    imageUrl: product?.imageUrl ?? product?.image ?? null,
    color: product?.color ?? null,
    size: product?.size ?? null,
  };
}

function lineKey(item) {
  const pid = String(item.productId ?? "");
  const color = String(item.color ?? "");
  const size = String(item.size ?? "");
  return `${pid}::${color}::${size}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, qty = 1, options = {}) => {
    const normalized = normalizeProduct(product);
    const next = {
      ...normalized,
      color: options.color ?? normalized.color,
      size: options.size ?? normalized.size,
      quantity: Math.max(1, Number(qty ?? 1)),
    };
    const key = lineKey(next);

    setItems((prev) => {
      const idx = prev.findIndex((p) => lineKey(p) === key);
      if (idx === -1) return [...prev, next];
      const copy = [...prev];
      copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + next.quantity };
      return copy;
    });
  };

  const increment = (productId, options = {}) => {
    const key = lineKey({
      productId,
      color: options.color ?? null,
      size: options.size ?? null,
    });
    setItems((prev) =>
      prev.map((p) =>
        lineKey(p) === key ? { ...p, quantity: p.quantity + 1 } : p,
      ),
    );
  };

  const decrement = (productId, options = {}) => {
    const key = lineKey({
      productId,
      color: options.color ?? null,
      size: options.size ?? null,
    });
    setItems((prev) =>
      prev
        .map((p) =>
          lineKey(p) === key
            ? { ...p, quantity: Math.max(0, p.quantity - 1) }
            : p,
        )
        .filter((p) => p.quantity > 0),
    );
  };

  const removeItem = (productId, options = {}) => {
    const key = lineKey({
      productId,
      color: options.color ?? null,
      size: options.size ?? null,
    });
    setItems((prev) => prev.filter((p) => lineKey(p) !== key));
  };

  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const totalQuantity = items.reduce((sum, it) => sum + (it.quantity ?? 0), 0);
    const subtotal = items.reduce(
      (sum, it) => sum + Number(it.price ?? 0) * Number(it.quantity ?? 0),
      0,
    );
    return { totalQuantity, subtotal };
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      increment,
      decrement,
      removeItem,
      clear,
      ...totals,
    }),
    [items, totals],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

