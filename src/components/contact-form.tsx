"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      body: new FormData(form),
    });

    if (response.ok) {
      form.reset();
      setStatus("sent");
    } else {
      setStatus("error");
    }
  }

  return (
    <form className="card" onSubmit={onSubmit} style={{ display: "grid", gap: 16, padding: 22 }}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" autoComplete="name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="topic">Topic</label>
        <select id="topic" name="topic" defaultValue="Product enquiry">
          <option>Product enquiry</option>
          <option>Delivery or collection</option>
          <option>Wholesale or partnership</option>
          <option>Website admin support</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <button className="button yellow" type="submit" disabled={status === "sending"}>
        <Send size={18} /> {status === "sending" ? "Sending..." : "Send enquiry"}
      </button>
      {status === "sent" ? <p role="status">Thanks. Your enquiry has been received.</p> : null}
      {status === "error" ? <p role="alert">Something went wrong. Please email Safna directly.</p> : null}
    </form>
  );
}
