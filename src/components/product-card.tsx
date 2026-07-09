"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBasket } from "lucide-react";
import { Product, formatPrice, getStockLabel } from "@/lib/products";
import { useCart } from "./cart-provider";

export function ProductCard({ product, compact = false }: { product: Product; compact?: boolean }) {
  const { addItem } = useCart();

  return (
    <article className={`product-card${compact ? " compact" : ""}`}>
      <div className="product-packshot" style={{ "--pack-colour": product.colour } as React.CSSProperties}>
        <span>{product.category}</span>
        <strong>{product.name.split(" ")[0]}</strong>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        <span className="product-badge">
          {product.badge}
        </span>
        <h3 style={{ margin: 0, fontSize: "1.35rem" }}>{product.name}</h3>
        <p style={{ margin: 0, color: "#526158", lineHeight: 1.55 }}>{product.description}</p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
          {[product.size, product.heatLevel, product.dietary, getStockLabel(product.stock)].map((item) => (
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
        <div>
          {product.salePrice ? (
            <span style={{ display: "block", color: "#6b756e", textDecoration: "line-through", fontWeight: 800 }}>
              {formatPrice(product.price)}
            </span>
          ) : null}
          <strong style={{ fontSize: "1.2rem" }}>{formatPrice(product.salePrice || product.price)}</strong>
        </div>
        <button className="button yellow" type="button" onClick={() => addItem(product)} disabled={product.stock <= 0}>
          <ShoppingBasket size={18} /> Add
        </button>
      </div>
      <Link className="product-link" href={`/products/${product.slug}`}>
        View details <ArrowRight size={16} />
      </Link>
    </article>
  );
}
