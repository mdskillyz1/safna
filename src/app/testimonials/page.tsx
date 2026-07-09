import type { Metadata } from "next";
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
          <h1>Customer feedback that supports buying confidence.</h1>
        </div>
        <div className="grid-3" style={{ marginTop: 28 }}>
          {reviews.map((review) => (
            <article className="card" key={review.name} style={{ padding: 24 }}>
              <div aria-label={`${review.rating} stars`}>{"★".repeat(review.rating)}</div>
              <p style={{ lineHeight: 1.7 }}>{review.quote}</p>
              <strong>{review.name}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
