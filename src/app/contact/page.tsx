import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Safna Products for product, delivery, wholesale and customer enquiries.",
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container grid-2" style={{ alignItems: "start" }}>
        <div className="page-title">
          <span className="eyebrow">Contact</span>
          <h1>Ask about products, delivery or wholesale.</h1>
          <p>
            Use the form for product enquiries, delivery questions, wholesale conversations or customer support.
          </p>
          <p>
            Email: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
