"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product, getPublicProductById } from "@/lib/products";

export type CartLine = {
  id: string;
  merchandiseId?: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  salePrice?: number;
  stock: number;
  colour: string;
  image: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  total: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  bagOpen: boolean;
  openBag: () => void;
  closeBag: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function productToLine(product: Product, quantity = 1): CartLine {
  return {
    id: product.id,
    merchandiseId: product.shopifyVariantId,
    slug: product.slug,
    name: product.name,
    size: product.size,
    price: product.price,
    salePrice: product.salePrice,
    stock: product.stock,
    colour: product.colour,
    image: product.image,
    quantity,
  };
}

function normaliseSavedLines(value: string | null) {
  if (!value) return [];

  try {
    const saved = JSON.parse(value) as Array<Partial<CartLine> & { id: string; quantity: number }>;
    return saved.flatMap((line) => {
      if (line.name && typeof line.price === "number") {
        return [{ ...line, quantity: Math.max(1, line.quantity) } as CartLine];
      }

      const product = getPublicProductById(line.id);
      return product ? [productToLine(product, line.quantity)] : [];
    });
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [bagOpen, setBagOpen] = useState(false);
  const [lines, setLines] = useState<CartLine[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    return normaliseSavedLines(window.localStorage.getItem("safna-cart"));
  });

  useEffect(() => {
    window.localStorage.setItem("safna-cart", JSON.stringify(lines));
  }, [lines]);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    const total = lines.reduce((sum, line) => {
      return sum + (line.salePrice || line.price) * line.quantity;
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
          return [...current, productToLine(product)];
        });
        setBagOpen(true);
      },
      removeItem(id) {
        setLines((current) => current.filter((line) => line.id !== id));
      },
      clearCart() {
        setLines([]);
      },
      bagOpen,
      openBag() {
        setBagOpen(true);
      },
      closeBag() {
        setBagOpen(false);
      },
    };
  }, [bagOpen, lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
