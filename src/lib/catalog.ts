import { getPublicProductById, getPublicProductBySlug, getPublicProducts, Product } from "@/lib/products";
import { getShopifyProductByHandle, getShopifyProducts, isShopifyConfigured } from "@/lib/shopify";

export async function getCatalogProducts(): Promise<Product[]> {
  if (!isShopifyConfigured()) {
    return getPublicProducts();
  }

  try {
    const products = await getShopifyProducts();
    return products.length ? products : getPublicProducts();
  } catch {
    return getPublicProducts();
  }
}

export async function getCatalogProductBySlug(slug: string): Promise<Product | null> {
  if (!isShopifyConfigured()) {
    return getPublicProductBySlug(slug) || null;
  }

  try {
    return (await getShopifyProductByHandle(slug)) || getPublicProductBySlug(slug) || null;
  } catch {
    return getPublicProductBySlug(slug) || null;
  }
}

export async function getCatalogProductById(id: string): Promise<Product | null> {
  const products = await getCatalogProducts();
  return products.find((product) => product.id === id || product.shopifyVariantId === id) || getPublicProductById(id) || null;
}

export function getLocalCatalogProducts() {
  return getPublicProducts();
}
