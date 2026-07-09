"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, products } from "@/lib/products";

export type CartLine = {
  id: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const saved = window.localStorage.getItem("safna-cart");
      return saved ? (JSON.parse(saved) as CartLine[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    window.localStorage.setItem("safna-cart", JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const total = lines.reduce((sum, line) => {
      const product = products.find((item) => item.id === line.id);
      return sum + (product?.price || 0) * line.quantity;
    }, 0);

    return {
      lines,
      count,
      total,
      addItem(product) {
        setLines((current) => {
          const existing = current.find((line) => line.id === product.id);
          if (existing) {
            return current.map((line) =>
              line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line,
            );
          }
          return [...current, { id: product.id, quantity: 1 }];
        });
      },
      removeItem(id) {
        setLines((current) => current.filter((line) => line.id !== id));
      },
      clearCart() {
        setLines([]);
      },
    };
  }, [lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
