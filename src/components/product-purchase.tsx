"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { Product } from "@/lib/products";

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  function addToBasket() {
    for (let index = 0; index < quantity; index += 1) {
      addItem(product);
    }
    setAdded(true);
  }

  return (
    <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
      <label className="field" style={{ maxWidth: 180 }}>
        <span>Quantity</span>
        <input
          type="number"
          min="1"
          max={Math.max(product.stock, 1)}
          value={quantity}
          onChange={(event) => setQuantity(Math.max(1, Number(event.target.value)))}
        />
      </label>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <button className="button yellow" type="button" onClick={addToBasket} disabled={product.stock <= 0}>
          <ShoppingBasket size={18} /> Add to basket
        </button>
        <Link className="button secondary" href="/checkout">
          View basket
        </Link>
      </div>
      {added ? <p role="status">Added to basket.</p> : null}
    </div>
  );
}
