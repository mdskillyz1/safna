import type { Metadata } from "next";
import { adminModules } from "@/lib/content";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Safna Products admin dashboard readiness page for products, orders, customers, blog, and reviews.",
};

export default function AdminPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Admin management</span>
          <h1>A dashboard structure for the final ecommerce workflow.</h1>
          <p>
            Once the platform is confirmed, this area can be protected and connected to real products, orders, reviews,
            enquiries, blog posts, analytics, ingredients, allergens, stock, and customer data.
          </p>
        </div>
        <div className="grid-3" style={{ marginTop: 28 }}>
          {adminModules.map((module) => (
            <div className="card" key={module} style={{ padding: 22 }}>
              <strong>{module}</strong>
              <p style={{ color: "#526158", lineHeight: 1.6 }}>
                Ready to connect to Shopify, Stripe, a CMS, or a custom database.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
