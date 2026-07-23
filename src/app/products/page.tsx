import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { getCatalogProducts } from "@/lib/catalog";
import { categories } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Shop Safna Products sauces, juices, lassi, yoghurt drinks, sets and food products online.",
};

type ProductsPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const { category } = await searchParams;
  const products = await getCatalogProducts();
  const selectedCategory = categories.find((item) => item === category);
  const displayProducts = selectedCategory ? products.filter((product) => product.category === selectedCategory) : products;
  const activeCategories = categories.filter((item) => displayProducts.some((product) => product.category === item));

  if (!products.length) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <span className="eyebrow">
              <Bell size={16} /> Products
            </span>
            <h1>Safna products are coming soon.</h1>
            <p>
              Safna is preparing sauces, seasonings, bundles, pantry products and gift boxes for online ordering. Contact
              Safna for current availability or product updates.
            </p>
            <Link className="button yellow" href="/contact">
              Get product updates
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Shop Safna</span>
          <h1>{selectedCategory ? `Safna ${selectedCategory.toLowerCase()}.` : "Safna products."}</h1>
          <p>Browse sauces, juices, lassi, yoghurt drinks, sets and food products from Safna.</p>
        </div>

        <div className="shop-filter-shell" aria-label="Product filters">
          <label className="shop-search">
            <Search size={18} />
            <input placeholder="Search products" />
          </label>
          <button type="button">Availability</button>
          <button type="button">Price</button>
          <button type="button">Sort</button>
          <button type="button">Clear filters</button>
        </div>

        <p style={{ color: "#526158", marginTop: 18 }}>{displayProducts.length} product{displayProducts.length === 1 ? "" : "s"}</p>

        {activeCategories.map((category) => (
          <div key={category} style={{ marginTop: 44 }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", marginBottom: 18 }}>{category}</h2>
            <div className="grid-3 product-grid">
              {displayProducts
                .filter((product) => product.category === category)
                .map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
