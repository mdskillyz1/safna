import type { Metadata } from "next";
import { CheckoutSummary } from "@/components/checkout-summary";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review your Safna basket and continue to checkout.",
};

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="container grid-2" style={{ alignItems: "start" }}>
        <div className="page-title">
          <span className="eyebrow">Basket</span>
          <h1>Safna basket.</h1>
          <p>Review your items, check your total and continue to secure payment when you are ready.</p>
        </div>
        <CheckoutSummary />
      </div>
    </section>
  );
}
