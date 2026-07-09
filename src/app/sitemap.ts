import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

const routes = ["", "/products", "/about", "/contact", "/faq", "/testimonials", "/blog", "/privacy-policy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/products" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
