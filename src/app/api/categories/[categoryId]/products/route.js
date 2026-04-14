import { NextResponse } from "next/server";
import { getProductsByCategoryId } from "@/service/product.service";

export async function GET(_req, { params }) {
  const resolvedParams = (await params) ?? {};
  const { categoryId } = resolvedParams;
  const products = categoryId ? await getProductsByCategoryId(categoryId) : [];
  return NextResponse.json({ payload: products });
}

