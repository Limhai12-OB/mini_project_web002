import { NextResponse } from "next/server";
import { getAllCategories } from "@/service/category.service";

export async function GET() {
  const categories = await getAllCategories();
  return NextResponse.json({ payload: categories });
}

