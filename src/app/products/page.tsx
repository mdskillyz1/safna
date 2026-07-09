import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { categories, getPublicProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse Safna Products sauces, seasonings, bundles, pantry items, and launch product listings.",
};

export default function ProductsPage() {
  const products = getPublicProducts();

  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Shop Safna</span>
          <h1>Sauces, seasonings, bundles, and pantry products.</h1>
          <p>
            Browse the launch product structure below. Final photos, ingredients, allergens, stock levels, delivery rules,
            VAT, and discount codes can be connected when the ecommerce platform is confirmed.
          </p>
        </div>
        {categories.map((category) => (
          <div key={category} style={{ marginTop: 44 }}>
            <h2>{category}</h2>
            <div className="grid-3">
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
