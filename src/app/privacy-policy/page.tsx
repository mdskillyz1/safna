import type { Metadata } from "next";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Safna Products privacy policy for ecommerce enquiries and analytics.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <span className="eyebrow">Privacy</span>
        <h1>Privacy Policy</h1>
        <p className="lead">
          Safna Products collects only the information needed to respond to enquiries, process orders once checkout is
          connected, improve the website, and support customer service.
        </p>
        <h2>Information collected</h2>
        <p>Contact form details, order details, customer account details, analytics events, and communication preferences.</p>
        <h2>How information is used</h2>
        <p>To answer enquiries, fulfil orders, manage customer support, improve products, and measure website performance.</p>
        <h2>Third-party services</h2>
        <p>Payment, analytics, email, hosting, and ecommerce services will be confirmed before launch.</p>
        <h2>Contact</h2>
        <p>
          For privacy questions, email <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>
    </section>
  );
}
