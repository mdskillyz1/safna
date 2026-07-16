"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getPublicProducts } from "@/lib/products";
import { useCart } from "./cart-provider";
import styles from "./header.module.css";

const shopLinks = [
  { href: "/products?category=Bundles", label: "Safna Sets" },
  { href: "/products", label: "Shop All" },
  { href: "/blog", label: "Recipes" },
];

const storyLinks = [
  { href: "/about", label: "Our Story" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { count, openBag } = useCart();
  const products = getPublicProducts();
  const results = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) return products.slice(0, 4);
    return products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(cleanQuery) ||
          product.category.toLowerCase().includes(cleanQuery) ||
          product.description.toLowerCase().includes(cleanQuery),
      )
      .slice(0, 5);
  }, [products, query]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <Link href="/products" className={styles.announcement}>
        Safna food products, sauces, seasonings and sets
      </Link>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Safna home">
          <Image src="/safna-logo.jpg" alt="Safna Products logo" width={78} height={88} priority />
        </Link>

        <nav className={`${styles.desktop} ${styles.shopNav}`} aria-label="Shop navigation">
          {shopLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <nav className={`${styles.desktop} ${styles.storyNav}`} aria-label="Brand navigation">
          {storyLinks.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={searchOpen ? "Close product search" : "Search products"}
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((value) => !value)}
          >
            <Search size={20} />
          </button>
          <Link href="/account" className={styles.iconButton} aria-label="Customer account">
            <UserRound size={20} />
          </Link>
          <button type="button" className={styles.cartButton} aria-label={`Basket with ${count} items`} onClick={openBag}>
            <ShoppingBag size={19} />
            <span>{count}</span>
          </button>
          <button
            className={styles.menuButton}
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {searchOpen ? (
        <div className={styles.searchPanel}>
          <div className={`container ${styles.searchInner}`}>
            <label>
              <Search size={18} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search sauces, sets, seasonings and recipes"
              />
            </label>
            <div className={styles.searchResults}>
              {results.length ? (
                results.map((product) => (
                  <Link href={`/products/${product.slug}`} key={product.id} onClick={() => setSearchOpen(false)}>
                    <span>{product.category}</span>
                    <strong>{product.name}</strong>
                  </Link>
                ))
              ) : (
                <div>
                  <span>Product search</span>
                  <strong>No products match that search yet.</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}

      {open ? (
        <nav className={styles.mobile} aria-label="Mobile navigation">
          {[...shopLinks, ...storyLinks].map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
