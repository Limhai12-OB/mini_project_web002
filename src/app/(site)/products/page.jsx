import { getProduct } from "@/service/product.service";
import { getAllCategories } from "@/service/category.service";
import ProductsCatalogComponent from "../../../components/shop/ProductsCatalogComponent";
import React from "react";

export default async function Page() {
  const fetchProduct = await getProduct();
  const categories = await getAllCategories();
  return (
    <ProductsCatalogComponent products={fetchProduct} categories={categories} />
  );
}
