import type { Metadata } from "next";
import Link from "next/link";
import { Bell, Search } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { categories, getPublicProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Safna Products catalogue. Products appear after they are confirmed and published by the Safna admin team.",
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
              <Bell size={16} /> Store opening soon
            </span>
            <h1>Safna&apos;s first collection is being prepared.</h1>
            <p>
              No products are published yet. Safna will add products here only after names, prices, photos, ingredients,
              allergens, stock and delivery details have been confirmed.
            </p>
            <Link className="button yellow" href="/contact">
              Join the launch list
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
          <h1>Published Safna products.</h1>
          <p>Every product shown here has been published from the Safna backend.</p>
        </div>

        <div className="shop-filter-shell" aria-label="Product filters">
          <label className="shop-search">
            <Search size={18} />
            <input placeholder="Search published products" />
          </label>
          <button type="button">Availability</button>
          <button type="button">Price</button>
          <button type="button">Sort</button>
          <button type="button">Clear filters</button>
        </div>

        <p style={{ color: "#526158", marginTop: 18 }}>{products.length} published product{products.length === 1 ? "" : "s"}</p>

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
