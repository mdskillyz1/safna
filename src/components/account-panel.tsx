"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Check,
  Eye,
  EyeOff,
  Home,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Package,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";

type CustomerAccount = {
  firstName: string;
  lastName: string;
  email: string;
  marketing: boolean;
  smsUpdates: boolean;
  address: string;
};

const storageKey = "safna-customer-account";
const shopifyAccountUrl = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL;
const accountFeatures: Array<[LucideIcon, string, string]> = [
  [Package, "Order tracking", "Keep order updates, receipts and delivery notes in one place."],
  [Home, "Faster checkout", "Save your UK delivery details for quicker future orders."],
  [RotateCcw, "Repeat favourites", "Bring back the sauces, juices and sets you enjoyed before."],
  [Bell, "Product drops", "Choose how Safna shares launch news, offers and recipe ideas."],
];

export function AccountPanel() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [marketingPreview, setMarketingPreview] = useState(true);
  const [smsPreview, setSmsPreview] = useState(false);
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
  const passwordChecks = useMemo(
    () => [
      { label: "8+ characters", passed: password.length >= 8 },
      { label: "Number included", passed: /\d/.test(password) },
      { label: "Mixed letters", passed: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    ],
    [password],
  );
  const passwordScore = passwordChecks.filter((check) => check.passed).length;
  const strengthLabel = password.length === 0 ? "Not started" : ["Weak", "Getting there", "Strong"][Math.max(passwordScore - 1, 0)];

  if (shopifyAccountUrl) {
    return (
      <div className="account-shell">
        <div className="account-hero account-hero-split">
          <div>
            <span className="eyebrow">
            <UserRound size={16} /> Customer account
            </span>
            <h1>Your Safna account.</h1>
            <p>Sign in to view Safna orders, saved details, addresses, repeat purchases and customer preferences.</p>
            <a className="button dark" href={shopifyAccountUrl}>
              <UserRound size={18} /> Sign in or create account
            </a>
          </div>
          <AccountPreviewCard />
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
    setMessage("Your Safna account details have been saved.");
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
      marketing: mode === "register" ? marketing : account?.marketing || false,
      smsUpdates: mode === "register" ? form.get("smsUpdates") === "on" : account?.smsUpdates || false,
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
        <div className="account-hero account-hero-split">
          <div>
            <span className="eyebrow">
              <Sparkles size={16} /> Safna customer area
            </span>
            <h1>Welcome back, {account.firstName}.</h1>
            <p>Manage your Safna details, saved address, product updates and future orders from one place.</p>
            <button className="button dark" type="button" onClick={signOut}>
              <LogOut size={18} /> Sign out
            </button>
          </div>
          <div className="account-status-card">
            <span>Account ready</span>
            <strong>{account.firstName} {account.lastName}</strong>
            <p>{account.email}</p>
            <div className="account-progress">
              <span style={{ width: account.address ? "100%" : "68%" }} />
            </div>
            <small>{account.address ? "Checkout profile complete" : "Add an address to finish setup"}</small>
          </div>
        </div>

        <div className="account-grid account-dashboard-grid">
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
            <p>Your Safna orders will appear here after checkout is connected.</p>
            <span className="account-card-action">No orders yet</span>
          </article>

          <article className="account-card">
            <RotateCcw size={22} />
            <h2>Repeat orders</h2>
            <p>Quickly reorder favourite sauces, seasonings and sets from previous orders.</p>
            <Link className="account-card-action" href="/products">Browse products</Link>
          </article>

          <article className="account-card">
            <Bell size={22} />
            <h2>Product updates</h2>
            <p>{account.marketing ? "Email updates are switched on." : "Email updates are currently off."}</p>
            <p>{account.smsUpdates ? "SMS updates are switched on." : "SMS updates are currently off."}</p>
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
          {message ? <p className="account-toast" role="status">{message}</p> : null}
        </form>
      </div>
    );
  }

  return (
    <div className="account-shell">
      <div className="account-hero account-hero-split">
        <div>
          <span className="eyebrow">
            <UserRound size={16} /> Safna customer account
          </span>
          <h1>Create your Safna account.</h1>
          <p>Save your details, prepare your delivery address, get product updates and make future Safna orders quicker.</p>
          <div className="account-hero-actions">
            <span><Check size={16} /> Saved details</span>
            <span><Check size={16} /> Faster checkout</span>
            <span><Check size={16} /> Product drops</span>
          </div>
        </div>
        <AccountPreviewCard />
      </div>

      <div className="account-auth-layout">
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
                  <input name="firstName" autoComplete="given-name" placeholder="Ibrahim" required />
                </label>
                <label className="field">
                  <span>Last name</span>
                  <input name="lastName" autoComplete="family-name" placeholder="Customer" required />
                </label>
              </div>
            ) : null}

            <label className="field account-input-icon">
              <span>Email address</span>
              <Mail size={18} />
              <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
            </label>

            <label className="field account-input-icon">
              <span>Password</span>
              <LockKeyhole size={18} />
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={mode === "register" ? "Create a secure password" : "Enter your password"}
                required
              />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? "Hide password" : "Show password"}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </label>

            {mode === "register" ? (
              <div className="account-strength" aria-live="polite">
                <div>
                  <span>Password strength</span>
                  <strong>{strengthLabel}</strong>
                </div>
                <div className="account-strength-bars" data-score={passwordScore}>
                  <span />
                  <span />
                  <span />
                </div>
                <ul>
                  {passwordChecks.map((check) => (
                    <li className={check.passed ? "passed" : ""} key={check.label}>
                      <Check size={14} /> {check.label}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {mode === "register" ? (
              <div className="account-preferences">
                <label>
                  <input name="marketing" type="checkbox" checked={marketingPreview} onChange={(event) => setMarketingPreview(event.target.checked)} />
                  <span>
                    <strong>Email product updates</strong>
                    New products, launch news, offers and recipes.
                  </span>
                </label>
                <label>
                  <input name="smsUpdates" type="checkbox" checked={smsPreview} onChange={(event) => setSmsPreview(event.target.checked)} />
                  <span>
                    <strong>Delivery text updates</strong>
                    Useful once live checkout and UK delivery are connected.
                  </span>
                </label>
              </div>
            ) : null}

            <button className="button yellow account-submit" type="submit">
              {mode === "register" ? <UserRound size={18} /> : <Mail size={18} />}
              {mode === "register" ? "Create account" : "Sign in"}
            </button>
          </form>
        </div>

        <aside className="account-live-preview" aria-label="Account preview">
          <span>What gets saved</span>
          <h2>Your Safna profile</h2>
          <div className="account-preview-list">
            <p><Check size={16} /> Name and email for checkout</p>
            <p><Check size={16} /> UK delivery address area</p>
            <p><Check size={16} /> Marketing preferences</p>
            <p><Check size={16} /> Future order history</p>
          </div>
          <div className="account-mini-order">
            <small>Future repeat order</small>
            <strong>XXHot Sauce + Mango Lassi</strong>
            <span>Ready when products go live</span>
          </div>
        </aside>
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

function AccountPreviewCard() {
  return (
    <div className="account-preview-card">
      <div>
        <span>Safna profile</span>
        <strong>Ready for launch</strong>
      </div>
      <div className="account-preview-row">
        <ShieldCheck size={18} />
        <span>Secure customer details</span>
      </div>
      <div className="account-preview-row">
        <Package size={18} />
        <span>Order history when checkout is live</span>
      </div>
      <div className="account-preview-row">
        <Bell size={18} />
        <span>Product drops and recipe updates</span>
      </div>
    </div>
  );
}
