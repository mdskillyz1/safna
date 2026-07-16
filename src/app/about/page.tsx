import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Safna Products and the upcoming ecommerce launch.",
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container grid-2" style={{ alignItems: "center" }}>
        <div className="page-title">
          <span className="eyebrow">About Safna</span>
          <h1>Safna&apos;s ecommerce store is being prepared.</h1>
          <p>
            Safna Products is preparing a customer-facing online store. The final product range, packaging, product
            photography, ingredients, allergens, pricing and delivery setup are still being confirmed by the business.
          </p>
          <p>
            The public website is now designed to display only content that has been entered, reviewed and published
            through the backend. Draft product or marketing information is not shown to customers.
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
