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
          <h1>Genuine customer reviews will appear here.</h1>
          <p>Safna will show only approved, real reviews after customers submit feedback.</p>
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
            <h2>No public reviews yet.</h2>
            <p>Reviews are hidden until approved through the Safna admin dashboard.</p>
            <Link className="button yellow" href="/contact">
              Contact Safna
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
