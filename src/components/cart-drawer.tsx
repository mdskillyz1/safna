"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { formatPrice } from "@/lib/products";
import { useCart } from "./cart-provider";

export function CartDrawer() {
  const { bagOpen, closeBag, clearCart, lines, removeItem, total } = useCart();

  useEffect(() => {
    document.body.style.overflow = bagOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [bagOpen]);

  if (!bagOpen) return null;

  return (
    <div className="bag-overlay" role="presentation" onClick={closeBag}>
      <aside className="bag-drawer" role="dialog" aria-modal="true" aria-label="Your bag" onClick={(event) => event.stopPropagation()}>
        <div className="bag-head">
          <div>
            <span className="eyebrow">
              <ShoppingBag size={15} /> Basket
            </span>
            <h2>Your bag</h2>
          </div>
          <div className="bag-head-actions">
            {lines.length ? (
              <button type="button" onClick={clearCart}>
                Clear all
              </button>
            ) : null}
            <button type="button" aria-label="Close bag" onClick={closeBag}>
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="bag-body">
          {!lines.length ? (
            <div className="bag-empty">
              <strong>Your bag is empty.</strong>
              <p>Browse Safna products and add your favourites when they are available online.</p>
              <Link className="button yellow" href="/products" onClick={closeBag}>
                Shop products
              </Link>
            </div>
          ) : null}

          {lines.map((line) => (
            <article className="bag-line" key={line.id}>
              <div className="bag-thumb" style={{ "--bag-colour": line.colour } as React.CSSProperties}>
                {line.name.charAt(0)}
              </div>
              <div>
                <strong>{line.name}</strong>
                <button type="button" className="bag-view">
                  {line.quantity} item{line.quantity === 1 ? "" : "s"} · {line.size}
                </button>
                <p>{line.quantity} x {formatPrice(line.salePrice || line.price)}</p>
              </div>
              <button type="button" aria-label={`Remove ${line.name}`} onClick={() => removeItem(line.id)}>
                <Trash2 size={17} />
              </button>
            </article>
          ))}
        </div>

        <div className="bag-footer">
          <div className="bag-total">
            <span>Total before delivery</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <Link className="bag-checkout" href="/checkout" onClick={closeBag}>
            Checkout {lines.length ? `· ${formatPrice(total)}` : ""} <ArrowRight size={18} />
          </Link>
          <Link href="/contact" onClick={closeBag}>
            Need help before ordering?
          </Link>
        </div>
      </aside>
    </div>
  );
}
