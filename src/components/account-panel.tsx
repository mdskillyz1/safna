"use client";

import { FormEvent, useState } from "react";
import { Bell, Home, LogOut, Mail, MapPin, Package, RotateCcw, Save, UserRound, type LucideIcon } from "lucide-react";

type CustomerAccount = {
  firstName: string;
  lastName: string;
  email: string;
  marketing: boolean;
  address: string;
};

const storageKey = "safna-customer-account";
const shopifyAccountUrl = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL;
const accountFeatures: Array<[LucideIcon, string, string]> = [
  [Package, "Order history", "Track current and previous Safna orders."],
  [Home, "Saved addresses", "Keep checkout quick with saved delivery details."],
  [RotateCcw, "Repeat orders", "Reorder favourite products faster."],
  [Bell, "Product updates", "Manage offers, recipes and news from Safna."],
];

export function AccountPanel() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [account, setAccount] = useState<CustomerAccount | null>(() => {
    if (typeof window === "undefined") return null;

    try {
      const saved = window.localStorage.getItem(storageKey);
      return saved ? (JSON.parse(saved) as CustomerAccount) : null;
    } catch {
      return null;
    }
  });
  const [message, setMessage] = useState("");

  if (shopifyAccountUrl) {
    return (
      <div className="account-shell">
        <div className="account-hero">
          <span className="eyebrow">
            <UserRound size={16} /> Customer account
          </span>
          <h1>Your Safna account.</h1>
          <p>Sign in to view Safna orders, saved details, addresses, repeat purchases and customer preferences.</p>
          <a className="button yellow" href={shopifyAccountUrl}>
            <UserRound size={18} /> Sign in or create account
          </a>
        </div>

        <div className="account-grid">
          {accountFeatures.map(([Icon, title, body]) => (
            <article className="account-card" key={String(title)}>
              <Icon size={22} />
              <h2>{String(title)}</h2>
              <p>{String(body)}</p>
            </article>
          ))}
        </div>
      </div>
    );
  }

  function saveAccount(nextAccount: CustomerAccount) {
    window.localStorage.setItem(storageKey, JSON.stringify(nextAccount));
    setAccount(nextAccount);
    setMessage("Account saved.");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const firstName = String(form.get("firstName") || "").trim() || "Safna";
    const lastName = String(form.get("lastName") || "").trim() || "Customer";
    const marketing = form.get("marketing") === "on";

    saveAccount({
      firstName,
      lastName,
      email,
      marketing,
      address: account?.address || "",
    });
  }

  function updateAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!account) return;
    const form = new FormData(event.currentTarget);
    saveAccount({ ...account, address: String(form.get("address") || "").trim() });
  }

  function signOut() {
    window.localStorage.removeItem(storageKey);
    setAccount(null);
    setMessage("");
  }

  if (account) {
    return (
      <div className="account-shell">
        <div className="account-hero">
          <span className="eyebrow">
            <UserRound size={16} /> Account
          </span>
          <h1>Welcome back, {account.firstName}.</h1>
          <p>Manage your Safna details, saved address, product updates and future orders from one place.</p>
          <button className="button secondary" type="button" onClick={signOut}>
            <LogOut size={18} /> Sign out
          </button>
        </div>

        <div className="account-grid">
          <article className="account-card">
            <UserRound size={22} />
            <h2>Account details</h2>
            <p>
              {account.firstName} {account.lastName}
              <br />
              {account.email}
            </p>
          </article>

          <article className="account-card">
            <Package size={22} />
            <h2>Order history</h2>
            <p>Your Safna orders will appear here after checkout.</p>
          </article>

          <article className="account-card">
            <RotateCcw size={22} />
            <h2>Repeat orders</h2>
            <p>Quickly reorder favourite sauces, seasonings and sets from previous orders.</p>
          </article>

          <article className="account-card">
            <Bell size={22} />
            <h2>Product updates</h2>
            <p>{account.marketing ? "You are signed up for Safna product updates." : "Product updates are currently off."}</p>
          </article>
        </div>

        <form className="account-card account-address" onSubmit={updateAddress}>
          <div>
            <MapPin size={22} />
            <h2>Saved address</h2>
            <p>Keep an address ready for faster checkout.</p>
          </div>
          <label className="field">
            <span>Address</span>
            <textarea name="address" defaultValue={account.address} placeholder="House number, street, city, postcode" />
          </label>
          <button className="button yellow" type="submit">
            <Save size={18} /> Save address
          </button>
          {message ? <p role="status">{message}</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className="account-shell">
      <div className="account-hero">
        <span className="eyebrow">
          <UserRound size={16} /> Customer account
        </span>
        <h1>Create your Safna account.</h1>
        <p>Sign in to save your details, keep an address ready, receive product updates and make future orders quicker.</p>
      </div>

      <div className="account-auth-card">
        <div className="account-tabs" role="tablist" aria-label="Account options">
          <button type="button" className={mode === "register" ? "active" : ""} onClick={() => setMode("register")}>
            Create account
          </button>
          <button type="button" className={mode === "login" ? "active" : ""} onClick={() => setMode("login")}>
            Sign in
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {mode === "register" ? (
            <div className="account-form-grid">
              <label className="field">
                <span>First name</span>
                <input name="firstName" autoComplete="given-name" required />
              </label>
              <label className="field">
                <span>Last name</span>
                <input name="lastName" autoComplete="family-name" required />
              </label>
            </div>
          ) : null}

          <label className="field">
            <span>Email address</span>
            <input name="email" type="email" autoComplete="email" required />
          </label>

          <label className="field">
            <span>Password</span>
            <input name="password" type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} required />
          </label>

          {mode === "register" ? (
            <label className="account-check">
              <input name="marketing" type="checkbox" />
              <span>Send me Safna product news, offers and recipe ideas.</span>
            </label>
          ) : null}

          <button className="button yellow" type="submit">
            {mode === "register" ? <UserRound size={18} /> : <Mail size={18} />}
            {mode === "register" ? "Create account" : "Sign in"}
          </button>
        </form>
      </div>

      <div className="account-grid">
        {accountFeatures.map(([Icon, title, body]) => (
          <article className="account-card" key={String(title)}>
            <Icon size={22} />
            <h2>{String(title)}</h2>
            <p>{String(body)}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
