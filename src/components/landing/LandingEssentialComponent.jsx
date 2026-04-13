"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@heroui/react";
import ProductCardComponent from "../ProductCardComponent";

const PAGE_SIZE = 8;

function toCardProduct(p) {
  return {
    ...p,
    productId: p.productId,
    name: p.name ?? p.productName ?? "Product",
    price: p.price,
    imageUrl: p.imageUrl ?? p.image ?? null,
  };
}

export default function LandingEssentialsGrid({ products = [] }) {
  const [tab, setTab] = useState("All");
  const [showAll, setShowAll] = useState(false);
  const [categoryMap, setCategoryMap] = useState({});
  const [activeProducts, setActiveProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const list = useMemo(
    () => (Array.isArray(products) ? products : []),
    [products],
  );

  const tabs = useMemo(() => {
    const keys = Object.keys(categoryMap);
    return ["All", ...keys.map((k) => categoryMap[k]?.label ?? k)];
  }, [categoryMap]);

  useEffect(() => {
    setActiveProducts(list);
  }, [list]);

  useEffect(() => {
    let cancelled = false;

    async function loadCategories() {
      try {
        const res = await fetch("/api/categories", { cache: "no-store" });
        const data = await res.json();
        const payload = Array.isArray(data?.payload) ? data.payload : [];

        const picked = {};
        for (const c of payload) {
          const label = String(c?.name ?? "").trim();
          const id = String(c?.categoryId ?? "").trim();
          if (!label || !id) continue;
          const key = label.toLowerCase();
          picked[key] = { label, id };
        }

        if (!cancelled) setCategoryMap(picked);
      } catch {
        if (!cancelled) setCategoryMap({});
      }
    }

    loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProductsByCategory(categoryKey) {
      const entry = categoryMap[categoryKey];
      if (!entry?.id) return;

      setLoading(true);
      try {
        const res = await fetch(`/api/categories/${entry.id}/products`, {
          cache: "no-store",
        });
        const data = await res.json();
        const payload = Array.isArray(data?.payload) ? data.payload : [];
        if (!cancelled) setActiveProducts(payload);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (tab === "All") {
      setActiveProducts(list);
      return;
    }

    const categoryKey = tab.toLowerCase();
    if (categoryMap[categoryKey]) {
      loadProductsByCategory(categoryKey);
    } else {
      // If we somehow don't have an id, show empty list instead of incorrect data.
      setActiveProducts([]);
    }

    return () => {
      cancelled = true;
    };
  }, [tab, categoryMap, list]);

  const filtered = activeProducts;
  const visible = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const canLoadMore = !showAll && filtered.length > PAGE_SIZE;

  return (
    <section id="shop" className="mx-auto w-full max-w-7xl py-16 lg:py-20">
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          Our skincare essentials
        </h2>
        <p className="mt-2 max-w-lg text-gray-500">
          Browse the full catalog — filter by category to narrow things down.
        </p>
      </div>

      <div
        className="mt-10 flex flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Product categories"
      >
        {tabs.map((label) => {
          const on = tab === label;
          return (
            <Button
              key={label}
              role="tab"
              aria-selected={on}
              onPress={() => {
                setTab(label);
                setShowAll(false);
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                on
                  ? "bg-lime-400 text-gray-900 shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {label}
            </Button>
          );
        })}
      </div>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {loading ? (
          <div className="col-span-full flex h-40 items-center justify-center">
            <p className="text-center text-gray-500">Loading products...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full flex h-40 items-center justify-center">
            <p className="text-center text-gray-500">
              No products loaded yet.
            </p>
          </div>
        ) : (
          visible.map((product, index) => (
            <ProductCardComponent
              product={toCardProduct(product)}
              key={product.productId ?? index}
            />
          ))
        )}
      </div>
      {tab !== "All" && !loading && filtered.length === 0 && (
        <p className="mt-12 text-center text-gray-500">
          No products in this category — try &quot;All&quot;.
        </p>
      )}
      {canLoadMore && (
        <div className="mt-12 flex justify-center">
          <Button
            variant="secondary"
            onPress={() => setShowAll(true)}
            className="rounded-full border border-gray-200 bg-white px-10 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:border-gray-300 hover:bg-gray-50"
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
