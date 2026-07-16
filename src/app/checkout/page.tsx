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
          <h1>Safna basket.</h1>
          <p>
            Checkout will become available after Safna publishes real products and connects live payment, delivery,
            stock and order-confirmation services.
          </p>
        </div>
        <CheckoutSummary />
      </div>
    </section>
  );
}
