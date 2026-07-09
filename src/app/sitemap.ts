import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { policies } from "@/lib/policies";
import { getPublicProducts } from "@/lib/products";

const routes = ["", "/products", "/about", "/contact", "/faq", "/testimonials", "/blog", "/privacy-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes = getPublicProducts().map((product) => `/products/${product.slug}`);
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
