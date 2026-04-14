"use client";

import { useState } from "react";
import ShopCardComponent from "./ShopCardComponent";

const QUICK_PRICES = [50, 100, 150];

function normalizeProducts(list) {
  if (!Array.isArray(list)) return [];
  return list.map((p) => ({
    ...p,
    productId: p.productId,
    name: p.name ?? p.productName ?? "Product",
    price: Number(p.price ?? 0),
    description: p.description ?? "",
    categoryId: p.categoryId ?? p.category?.categoryId ?? null,
    imageUrl: p.imageUrl ?? p.image ?? null,
  }));
}

export default function ProductsCatalogComponent({
  products = [],
  categories = [],
}) {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(300);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const normalizedProducts = normalizeProducts(products);
  const safeCategories = Array.isArray(categories)
    ? categories
        .map((c) => ({
          categoryId: String(c?.categoryId ?? "").trim(),
          name: String(c?.name ?? "").trim(),
        }))
        .filter((c) => c.categoryId && c.name)
    : [];

  const needle = search.trim().toLowerCase();

  const filteredProducts = normalizedProducts.filter((p) => {
    const matchesSearch =
      !needle ||
      p.name.toLowerCase().includes(needle) ||
      p.description.toLowerCase().includes(needle);

    const matchesPrice = p.price <= maxPrice;

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(String(p.categoryId));

    return matchesSearch && matchesPrice && matchesCategory;
  });
  const categoryCounts = {};
  for (const p of normalizedProducts) {
    const key = String(p.categoryId ?? "");
    if (!key) continue;
    categoryCounts[key] = (categoryCounts[key] ?? 0) + 1;
  }
  function toggleCategory(id) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }
  function resetFilters() {
    setSearch("");
    setMaxPrice(300);
    setSelectedCategories([]);
  }
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 lg:py-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
            Luxury beauty products
          </h1>
          <p className="mt-2 text-gray-500">
            Use the filters to narrow by price and brand.
          </p>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by product name..."
          className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-700 outline-none ring-lime-300 transition focus:ring md:max-w-xs"
        />
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
              Filters
            </h2>
            <button
              onClick={resetFilters}
              className="rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50"
            >
              Reset filters
            </button>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Price range
            </p>
            <p className="mt-2 text-sm font-medium text-gray-700">
              ${0} - ${maxPrice} (no limit)
            </p>
            <input
              type="range"
              min={0}
              max={300}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-slate-900"
            />
            <div className="mt-1 flex justify-between text-xs text-gray-400">
              <span>$0</span>
              <span>$300</span>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Quick select
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {QUICK_PRICES.map((value) => (
                <button
                  key={value}
                  onClick={() => setMaxPrice(value)}
                  className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
                >
                  Under ${value}
                </button>
              ))}
              <button
                onClick={() => setMaxPrice(300)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                All prices
              </button>
            </div>
          </div>
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Categories
            </p>
            <div className="mt-3 space-y-2">
              {safeCategories.map((category) => {
                const checked = selectedCategories.includes(
                  category.categoryId,
                );
                const count = categoryCounts[category.categoryId] ?? 0;

                return (
                  <label
                    key={category.categoryId}
                    className="flex cursor-pointer items-center justify-between gap-3 text-sm text-gray-700"
                  >
                    <span className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleCategory(category.categoryId)}
                        className="rounded border-gray-300"
                      />
                      {category.name}
                    </span>

                    <span className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Select none to include all categories.
            </p>
          </div>
        </aside>
        <section>
          <p className="mb-4 text-sm text-gray-500">
            Showing {filteredProducts.length} products
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ShopCardComponent key={product.productId} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-12 text-center text-gray-500">
              No products match your filters.
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
