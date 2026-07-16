import type { Metadata } from "next";
import Link from "next/link";
import { UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Safna customer account area for orders, saved addresses and preferences.",
};

export default function AccountPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="empty-state">
          <UserRound size={38} />
          <span className="eyebrow">Customer accounts</span>
          <h1>Your Safna account.</h1>
          <p>
            Soon you will be able to sign in, view your orders, save addresses, repeat previous orders and manage your
            product updates from one place.
          </p>
          <Link className="button yellow" href="/contact">
            Get product updates
          </Link>
        </div>
      </div>
    </section>
  );
}
