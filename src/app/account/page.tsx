import type { Metadata } from "next";
import Link from "next/link";
import { customers, orders } from "@/lib/store-data";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Safna Products customer account area prepared for login, order history, and saved addresses.",
};

export default function AccountPage() {
  const customer = customers[0];
  const customerOrders = orders.filter((order) => order.customer === customer.name);

  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Customer login</span>
          <h1>Customer account area for repeat Safna orders.</h1>
          <p>
            This route is prepared for secure login, order history, saved addresses, repeat orders, marketing preferences,
            and account details. Connect a production authentication provider before live accounts are enabled.
          </p>
          <Link className="button yellow" href="/contact">
            Request account support
          </Link>
        </div>

        <div className="grid-2" style={{ alignItems: "start", marginTop: 30 }}>
          <div className="card" style={{ padding: 24 }}>
            <h2>Account details</h2>
            <p>
              <strong>Name:</strong> {customer.name}
            </p>
            <p>
              <strong>Email:</strong> {customer.email}
            </p>
            <label className="field">
              <span>Marketing preferences</span>
              <select defaultValue="Email offers and product launches">
                <option>Email offers and product launches</option>
                <option>Order updates only</option>
                <option>No marketing</option>
              </select>
            </label>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h2>Saved addresses</h2>
            <p style={{ color: "#526158", lineHeight: 1.65 }}>
              12 Example Street, London, United Kingdom, SW1A 1AA
            </p>
            <button className="button secondary" type="button">
              Edit address
            </button>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h2>Order history</h2>
            {customerOrders.map((order) => (
              <div key={order.id} style={{ borderTop: "1px solid rgba(16,23,19,.12)", padding: "14px 0" }}>
                <strong>{order.id}</strong>
                <p style={{ color: "#526158", margin: "5px 0" }}>{order.items}</p>
                <span className="eyebrow">{order.status}</span>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 24 }}>
            <h2>Repeat orders</h2>
            <p style={{ color: "#526158", lineHeight: 1.65 }}>
              Repeat purchase buttons can be connected once live customer accounts and Stripe order history are enabled.
            </p>
            <Link className="button yellow" href="/products">
              Shop again
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
