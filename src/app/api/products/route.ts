import { NextResponse } from "next/server";
import { getCatalogProducts } from "@/lib/catalog";

export async function GET() {
  const products = await getCatalogProducts();

  return NextResponse.json({
    products: products.map((product) => ({
      id: product.id,
      slug: product.slug,
      name: product.name,
      category: product.category,
      description: product.description,
    })),
  });
}
