import type { MetadataRoute } from "next";
import { getCatalogProducts } from "@/lib/catalog";
import { site } from "@/lib/content";
import { policies } from "@/lib/policies";

const routes = ["", "/products", "/about", "/contact", "/faq", "/testimonials", "/blog", "/privacy-policy"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getCatalogProducts();
  const productRoutes = products.map((product) => `/products/${product.slug}`);
  const policyRoutes = policies
    .filter((policy) => policy.slug !== "privacy-policy")
    .map((policy) => `/policies/${policy.slug}`);

  return [...routes, ...productRoutes, ...policyRoutes].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/products" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
