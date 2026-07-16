import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, getPublicProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Shop Safna Products sauces, seasonings, sets, pantry products and gift ideas online.",
};

export default function ProductsPage() {
  const products = getPublicProducts();
  const activeCategories = categories.filter((category) => products.some((product) => product.category === category));

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
          <h1>Safna products.</h1>
          <p>Browse sauces, seasonings, sets and pantry products from Safna.</p>
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

        <p style={{ color: "#526158", marginTop: 18 }}>{products.length} product{products.length === 1 ? "" : "s"}</p>

        {activeCategories.map((category) => (
          <div key={category} style={{ marginTop: 44 }}>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", marginBottom: 18 }}>{category}</h2>
            <div className="grid-3 product-grid">
              {products
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
