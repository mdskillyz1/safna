import type { Metadata } from "next";
import { CheckoutSummary } from "@/components/checkout-summary";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Safna Products checkout summary and payment-provider handoff.",
};

export default function CheckoutPage() {
  return (
    <section className="section">
      <div className="container grid-2" style={{ alignItems: "start" }}>
        <div className="page-title">
          <span className="eyebrow">Basket</span>
          <h1>Review your Safna order.</h1>
          <p>
            The basket works locally today. Real card payments, delivery rates, tax, stock checks, and confirmation emails
            need the selected payment or ecommerce provider before Safna accepts live food-product orders.
          </p>
        </div>
        <CheckoutSummary />
      </div>
    </section>
  );
}
