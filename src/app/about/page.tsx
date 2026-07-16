import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Safna Products, a food product brand for sauces, seasonings, sets and pantry staples.",
};

export default function AboutPage() {
  return (
    <section className="section">
      <div className="container grid-2" style={{ alignItems: "center" }}>
        <div className="page-title">
          <span className="eyebrow">About Safna</span>
          <h1>Food products made for flavourful everyday meals.</h1>
          <p>
            Safna Products is building a range of sauces, seasonings, bundles, pantry products and gift boxes for
            customers who want bold flavour at home.
          </p>
          <p>
            The online shop is designed to make browsing, ordering, product information, delivery details and customer
            support simple from the first visit.
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
