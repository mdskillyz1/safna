import type { Metadata } from "next";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Safna Products | Store opening soon",
    template: "%s | Safna Products",
  },
  description:
    "Safna Products is preparing its online store. Products, prices, ingredients, allergens, reviews, recipes, and delivery details appear only when published by the business.",
  keywords: ["Safna", "Safna Products", "sauces", "seasonings", "food products", "online shop", "ecommerce"],
  openGraph: {
    title: "Safna Products",
    description: "Safna Products is preparing its online store with published backend content only.",
    url: site.url,
    siteName: "Safna Products",
    images: [{ url: "/safna-logo.jpg", width: 1320, height: 1506 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnalyticsScripts />
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
