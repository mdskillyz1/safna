import type { Metadata } from "next";
import { AnalyticsScripts } from "@/components/analytics-scripts";
import { CartProvider } from "@/components/cart-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { site } from "@/lib/content";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Safna Products | Fresh product ecommerce",
    template: "%s | Safna Products",
  },
  description:
    "Safna Products is a bright, simple ecommerce website for browsing and buying sauces, seasonings, bundles, and pantry essentials online.",
  keywords: ["Safna", "Safna Products", "sauces", "seasonings", "food products", "online shop", "ecommerce"],
  openGraph: {
    title: "Safna Products",
    description: "Sauces, seasonings, pantry products, and bundles ready for online ordering.",
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
        </CartProvider>
      </body>
    </html>
  );
}
