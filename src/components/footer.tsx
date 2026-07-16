import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { navItems, site } from "@/lib/content";
import { policies } from "@/lib/policies";

export function Footer() {
  const whatsappHref = site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}?text=Hi%20Safna%2C%20I%20would%20like%20to%20ask%20about%20your%20products.`
    : `mailto:${site.email}?subject=Safna%20product%20enquiry`;

  return (
    <footer style={{ borderTop: "1px solid rgba(16,23,19,.12)", background: "#101713", color: "#fff" }}>
      <div className="container" style={{ padding: "52px 0", display: "grid", gap: 30 }}>
        <div className="grid-3">
          <div>
            <strong style={{ fontSize: "1.5rem" }}>Safna Products</strong>
            <p style={{ color: "#dce5dd", lineHeight: 1.7 }}>
              Safna&apos;s public store is being prepared. Products and claims appear only after they are published by the
              business.
            </p>
          </div>
          <div>
            <strong>Shop</strong>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              {navItems.slice(0, 4).map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <strong>Policies</strong>
            <div style={{ display: "grid", gap: 10, marginTop: 14 }}>
              {policies.slice(0, 4).map((policy) => (
                <Link key={policy.slug} href={policy.slug === "privacy-policy" ? "/privacy-policy" : `/policies/${policy.slug}`}>
                  {policy.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap", color: "#dce5dd" }}>
          <span>© {new Date().getFullYear()} Safna Products. All rights reserved.</span>
          <span>Published backend content only.</span>
        </div>
      </div>
      <a className="button whatsapp" href={whatsappHref} aria-label="Message Safna">
        <MessageCircle size={19} /> WhatsApp
      </a>
    </footer>
  );
}
