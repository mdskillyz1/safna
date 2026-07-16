import type { Metadata } from "next";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about Safna Products, ordering, delivery and food information.",
};

export default function FAQPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">FAQ</span>
          <h1>Helpful answers about Safna.</h1>
          <p>
            Find answers about products, delivery, food information, accounts and ordering.
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
