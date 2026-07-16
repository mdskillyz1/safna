import type { Metadata } from "next";
import { AccountPanel } from "@/components/account-panel";

export const metadata: Metadata = {
  title: "Customer Account",
  description: "Safna customer account area for orders, saved addresses and preferences.",
};

export default function AccountPage() {
  return (
    <section className="section">
      <div className="container">
        <AccountPanel />
      </div>
    </section>
  );
}
