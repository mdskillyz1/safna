"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag, Trash2, X } from "lucide-react";
import { useEffect } from "react";
import { formatPrice, getPublicProductById } from "@/lib/products";
import { useCart } from "./cart-provider";

export function CartDrawer() {
  const { bagOpen, closeBag, clearCart, lines, removeItem, total } = useCart();
  const liveLines = lines
    .map((line) => ({ line, product: getPublicProductById(line.id) }))
    .filter((item): item is { line: typeof lines[number]; product: NonNullable<ReturnType<typeof getPublicProductById>> } =>
      Boolean(item.product),
    );
  const hasStaleItems = lines.length > liveLines.length;

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

          {hasStaleItems ? (
            <div className="bag-warning">
              Some saved items are no longer available. Clear the bag before checkout.
            </div>
          ) : null}

          {liveLines.map(({ line, product }) => (
            <article className="bag-line" key={line.id}>
              <div className="bag-thumb" style={{ "--bag-colour": product.colour } as React.CSSProperties}>
                {product.name.charAt(0)}
              </div>
              <div>
                <strong>{product.name}</strong>
                <button type="button" className="bag-view">
                  {line.quantity} item{line.quantity === 1 ? "" : "s"} · {product.size}
                </button>
                <p>{line.quantity} x {formatPrice(product.salePrice || product.price)}</p>
              </div>
              <button type="button" aria-label={`Remove ${product.name}`} onClick={() => removeItem(line.id)}>
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
            Checkout {liveLines.length ? `· ${formatPrice(total)}` : ""} <ArrowRight size={18} />
          </Link>
          <Link href="/contact" onClick={closeBag}>
            Need help before ordering?
          </Link>
        </div>
      </aside>
    </div>
  );
}
