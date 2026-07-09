import type { Metadata } from "next";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Safna Products online ordering, delivery, admin, and payments.",
};

export default function FAQPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">FAQ</span>
          <h1>Helpful answers before customers order.</h1>
          <p>
            Safna is being prepared for UK ecommerce with Stripe checkout, UK delivery settings, food product information,
            customer accounts, and editable policies.
          </p>
        </div>
        <div style={{ display: "grid", gap: 14, marginTop: 28 }}>
          {faqs.map((faq) => (
            <details className="card" key={faq.question} style={{ padding: 20 }}>
              <summary style={{ cursor: "pointer", fontWeight: 950 }}>{faq.question}</summary>
              <p style={{ color: "#526158", lineHeight: 1.65 }}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
