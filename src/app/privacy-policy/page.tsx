import type { Metadata } from "next";
import { getPolicy } from "@/lib/policies";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Safna Products privacy policy for ecommerce enquiries and analytics.",
};

export default function PrivacyPolicyPage() {
  const policy = getPolicy("privacy-policy");

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <span className="eyebrow">Privacy</span>
        <h1>{policy?.title}</h1>
        <p className="lead">{policy?.summary}</p>
        <div className="notice-card" role="note">
          Template wording only. Safna should review and publish final privacy wording before accepting live orders or
          enabling customer accounts.
        </div>
        {policy?.body.map((paragraph) => (
          <p key={paragraph} style={{ color: "#526158", lineHeight: 1.75 }}>
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
