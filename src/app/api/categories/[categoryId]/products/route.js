import { NextResponse } from "next/server";
import { getProductsByCategoryId } from "@/service/product.service";

export async function GET(_req, { params }) {
  // Next.js 16: dynamic route params can be async.
  const resolvedParams = (await params) ?? {};
  const { categoryId } = resolvedParams;
  const products = categoryId ? await getProductsByCategoryId(categoryId) : [];
  return NextResponse.json({ payload: products });
}

