"use client";

import Link from "next/link";
import { Mail, X } from "lucide-react";
import { useEffect, useState } from "react";
import { promoCampaigns, site } from "@/lib/content";

export function PromoPopup() {
  const [visible, setVisible] = useState(false);
  const campaign = promoCampaigns.find((item) => item.status === "Published");

  useEffect(() => {
    const dismissed = window.sessionStorage.getItem("safna-promo-dismissed");
    if (dismissed || !campaign) return;
    const timer = window.setTimeout(() => setVisible(true), 900);
    return () => window.clearTimeout(timer);
  }, [campaign]);

  if (!visible || !campaign) return null;

  function dismiss() {
    window.sessionStorage.setItem("safna-promo-dismissed", "true");
    setVisible(false);
  }

  return (
    <div className="promo-pop" role="dialog" aria-modal="false" aria-label={campaign.title}>
      <button type="button" aria-label="Close promotion" onClick={dismiss}>
        <X size={18} />
      </button>
      <span>Launch offer</span>
      <strong>{campaign.title}</strong>
      <p>{campaign.body}</p>
      <Link className="button yellow" href={`mailto:${site.email}?subject=Safna%20launch%20list`} onClick={dismiss}>
        <Mail size={17} /> Register interest
      </Link>
    </div>
  );
}
