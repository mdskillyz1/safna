"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navItems } from "@/lib/content";
import { useCart } from "./cart-provider";
import styles from "./header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={styles.header}>
      <Link href="/products" className={styles.announcement}>
        Safna&apos;s first collection is being prepared
      </Link>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Safna home">
          <Image src="/safna-logo.jpg" alt="Safna Products logo" width={78} height={88} priority />
        </Link>

        <nav className={styles.desktop} aria-label="Main navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/products" className={styles.iconButton} aria-label="Search products">
            <Search size={20} />
          </Link>
          <Link href="/account" className={styles.iconButton} aria-label="Customer account">
            <UserRound size={20} />
          </Link>
          <Link href="/checkout" className={styles.cartButton} aria-label={`Basket with ${count} items`}>
            <ShoppingBag size={19} />
            <span>{count}</span>
          </Link>
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

      {open ? (
        <nav className={styles.mobile} aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </Link>
          ))}
          <Link href="/admin" onClick={() => setOpen(false)}>
            Admin
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
