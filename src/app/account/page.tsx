import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Safna Products customer account area prepared for login, order history, and saved addresses.",
};

export default function AccountPage() {
  return (
    <section className="section">
      <div className="container grid-2">
        <div className="page-title">
          <span className="eyebrow">Customer login</span>
          <h1>Account area ready for the chosen platform.</h1>
          <p>
            This route is prepared for customer login, order history, saved addresses, preferences, and marketing opt-ins.
            The final auth provider should be chosen with the ecommerce platform.
          </p>
          <Link className="button yellow" href="/contact">
            Confirm account requirements
          </Link>
        </div>
        <div className="card" style={{ padding: 24 }}>
          <h2>Recommended account features</h2>
          <ul style={{ lineHeight: 2 }}>
            <li>Secure email login</li>
            <li>Order history</li>
            <li>Saved delivery addresses</li>
            <li>Newsletter consent</li>
            <li>Returns and support requests</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
