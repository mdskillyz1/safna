"use client";

import { ShoppingBasket } from "lucide-react";
import { Product, formatPrice } from "@/lib/products";
import { useCart } from "./cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <article className="card" style={{ display: "grid", gap: 18, padding: 18 }}>
      <div className="product-blob" style={{ "--blob-colour": product.colour } as React.CSSProperties}>
        {product.name.charAt(0)}
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <span className="eyebrow" style={{ padding: "6px 10px", fontSize: ".72rem" }}>
          {product.badge}
        </span>
        <h3 style={{ margin: 0, fontSize: "1.35rem" }}>{product.name}</h3>
        <p style={{ margin: 0, color: "#526158", lineHeight: 1.55 }}>{product.description}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
          {[product.size, product.heatLevel, product.dietary].map((item) => (
            <span
              key={item}
              style={{
                border: "1px solid rgba(16,23,19,.14)",
                borderRadius: 999,
                padding: "6px 9px",
                background: "#fffdf5",
                color: "#405045",
                fontSize: ".78rem",
                fontWeight: 800,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14 }}>
        <strong style={{ fontSize: "1.2rem" }}>{formatPrice(product.price)}</strong>
        <button className="button yellow" type="button" onClick={() => addItem(product)}>
          <ShoppingBasket size={18} /> Add
        </button>
      </div>
    </article>
  );
}
