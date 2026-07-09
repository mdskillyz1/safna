import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Safna Products and the ecommerce launch vision.",
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container grid-2" style={{ alignItems: "center" }}>
        <div className="page-title">
          <span className="eyebrow">About Safna</span>
          <h1>A clean product brand for everyday fresh food.</h1>
          <p>
            Safna Products is being prepared as a modern ecommerce experience for customers who want to browse, compare,
            and buy fresh produce and product bundles online.
          </p>
          <p>
            The site keeps the brand bright and approachable while leaving room for real product photography, customer
            account features, payment integration, fulfilment rules, and admin operations.
          </p>
        </div>
        <Image
          src="/safna-logo.jpg"
          alt="Safna Products brand artwork"
          width={660}
          height={753}
          style={{ width: "100%", height: "auto", borderRadius: 8, boxShadow: "var(--shadow)" }}
        />
      </div>
    </section>
  );
}
