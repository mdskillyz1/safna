"use client";

import Link from "next/link";
import { CreditCard, Trash2 } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { formatPrice, getProductById } from "@/lib/products";

export function CheckoutSummary() {
  const { lines, total, removeItem, clearCart } = useCart();
  const [message, setMessage] = useState("");

  async function startCheckout() {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ lines }),
    });
    const payload = (await response.json()) as { message?: string; url?: string };
    if (payload.url) {
      window.location.href = payload.url;
      return;
    }
    setMessage(payload.message || "Checkout provider needs to be connected.");
  }

  if (!lines.length) {
    return (
      <div className="card" style={{ padding: 24 }}>
        <h2>Your basket is empty</h2>
        <p className="lead">Add products to prepare a Safna order.</p>
        <Link className="button yellow" href="/products">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: 24, display: "grid", gap: 16 }}>
      {lines.map((line) => {
      const product = getProductById(line.id);
        if (!product) return null;
        return (
          <div key={line.id} style={{ display: "flex", justifyContent: "space-between", gap: 14 }}>
            <div>
              <strong>{product.name}</strong>
              <p style={{ margin: "5px 0 0", color: "#526158" }}>
                {line.quantity} x {formatPrice(product.price)}
              </p>
            </div>
            <button className="button secondary" type="button" onClick={() => removeItem(line.id)} aria-label="Remove item">
              <Trash2 size={17} />
            </button>
          </div>
        );
      })}
      <div style={{ borderTop: "1px solid rgba(16,23,19,.12)", paddingTop: 16, display: "flex", justifyContent: "space-between" }}>
        <strong>Total before delivery</strong>
        <strong>{formatPrice(total)}</strong>
      </div>
      <button className="button yellow" type="button" onClick={startCheckout}>
        <CreditCard size={18} /> Continue to payment
      </button>
      <button className="button secondary" type="button" onClick={clearCart}>
        Clear basket
      </button>
      {message ? <p role="status">{message}</p> : null}
    </div>
  );
}
