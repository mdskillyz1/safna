import type { Metadata } from "next";
import Link from "next/link";
import { Star } from "lucide-react";
import { reviews } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Safna Products customer testimonials and review section.",
};

export default function TestimonialsPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Reviews</span>
          <h1>Customer reviews.</h1>
          <p>See what customers say about Safna products as feedback comes in.</p>
        </div>
        {reviews.length ? (
          <div className="grid-3" style={{ marginTop: 28 }}>
            {reviews.map((review) => (
              <article className="card" key={review.name} style={{ padding: 24 }}>
                <div aria-label={`${review.rating} stars`}>{"★".repeat(review.rating)}</div>
                <p style={{ lineHeight: 1.7 }}>{review.quote}</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ marginTop: 28 }}>
            <Star size={34} />
            <h2>Reviews are coming soon.</h2>
            <p>Customer feedback will appear here as Safna starts taking online orders.</p>
            <Link className="button yellow" href="/contact">
              Contact Safna
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
