import type { Metadata } from "next";
import Link from "next/link";
import { UserRound } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Safna customer accounts will be enabled after secure authentication and live orders are configured.",
};

export default function AccountPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="empty-state">
          <UserRound size={38} />
          <span className="eyebrow">Customer accounts</span>
          <h1>Accounts will open with the Safna store.</h1>
          <p>
            Registration, login, saved addresses, order history and repeat ordering will be enabled after secure
            authentication, payment processing and order storage are connected.
          </p>
          <Link className="button yellow" href="/contact">
            Request launch updates
          </Link>
        </div>
      </div>
    </section>
  );
}
