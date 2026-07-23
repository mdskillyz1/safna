"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bell,
  Check,
  ClipboardList,
  CreditCard,
  Eye,
  EyeOff,
  Gift,
  Heart,
  Home,
  LockKeyhole,
  LogOut,
  Mail,
  MapPin,
  Package,
  RotateCcw,
  Save,
  Settings,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import { products } from "@/lib/products";

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
const accountSections: Array<{ id: "orders" | "delivery" | "preferences"; icon: LucideIcon; label: string }> = [
  { id: "orders", icon: ClipboardList, label: "Orders" },
  { id: "delivery", icon: Truck, label: "Delivery" },
  { id: "preferences", icon: Settings, label: "Preferences" },
];
const recommendedProducts = products.filter((product) => product.featured).slice(0, 3);

export function AccountPanel() {
  const [mode, setMode] = useState<"login" | "register">("register");
  const [activeTab, setActiveTab] = useState<"orders" | "delivery" | "preferences">("orders");
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

  function updatePreferences(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!account) return;
    const form = new FormData(event.currentTarget);
    saveAccount({
      ...account,
      marketing: form.get("marketing") === "on",
      smsUpdates: form.get("smsUpdates") === "on",
    });
  }

  function signOut() {
    window.localStorage.removeItem(storageKey);
    setAccount(null);
    setMessage("");
  }

  if (account) {
    const profileCompletion = account.address ? 100 : 72;
    const initials = `${account.firstName.charAt(0)}${account.lastName.charAt(0)}`.toUpperCase();

    return (
      <div className="account-shell">
        <section className="account-premium-hero">
          <div className="account-premium-copy">
            <span className="eyebrow">
              <Sparkles size={16} /> Safna customer area
            </span>
            <h1>Welcome back, {account.firstName}.</h1>
            <p>Your Safna account keeps checkout details, product drops, saved delivery and future orders together.</p>
            <div className="account-hero-actions">
              <Link href="/products"><ShoppingBag size={16} /> Shop products</Link>
              <Link href="/products?category=Sets"><Gift size={16} /> View Safna sets</Link>
              <button type="button" onClick={signOut}><LogOut size={16} /> Sign out</button>
            </div>
          </div>

          <div className="account-member-card">
            <div className="account-avatar">{initials || "S"}</div>
            <span>Account ready</span>
            <strong>{account.firstName} {account.lastName}</strong>
            <p>{account.email}</p>
            <div className="account-progress">
              <span style={{ width: `${profileCompletion}%` }} />
            </div>
            <small>{profileCompletion}% checkout profile complete</small>
          </div>
        </section>

        <section className="account-hub">
          <aside className="account-side-menu" aria-label="Account sections">
            {accountSections.map(({ id, icon: Icon, label }) => (
              <button
                className={activeTab === id ? "active" : ""}
                key={id}
                type="button"
                onClick={() => setActiveTab(id)}
              >
                <Icon size={18} /> {label}
              </button>
            ))}
          </aside>

          <div className="account-dashboard-panel">
            {activeTab === "orders" ? (
              <div className="account-panel-grid">
                <article className="account-feature-large">
                  <Package size={24} />
                  <span>Order history</span>
                  <h2>No orders yet.</h2>
                  <p>When Shopify checkout is connected, paid orders, delivery tracking and receipts will appear here automatically.</p>
                  <Link className="button yellow" href="/products">
                    Browse products <ArrowRight size={17} />
                  </Link>
                </article>
                <div className="account-mini-stack">
                  <article>
                    <CreditCard size={20} />
                    <strong>Checkout</strong>
                    <p>Payment history will sync once live payments are enabled.</p>
                  </article>
                  <article>
                    <RotateCcw size={20} />
                    <strong>Repeat order</strong>
                    <p>Favourite sauces and drinks will be reorderable from previous baskets.</p>
                  </article>
                </div>
              </div>
            ) : null}

            {activeTab === "delivery" ? (
              <form className="account-delivery-panel" onSubmit={updateAddress}>
                <div>
                  <MapPin size={24} />
                  <span>Saved delivery</span>
                  <h2>Prepare your UK delivery address.</h2>
                  <p>Save an address now so checkout feels quick when Safna opens live ordering.</p>
                </div>
                <label className="field">
                  <span>Delivery address</span>
                  <textarea name="address" defaultValue={account.address} placeholder="Flat 25, Deanshurst, London EC15PW" />
                </label>
                <button className="button yellow" type="submit">
                  <Save size={18} /> Save delivery address
                </button>
                {message ? <p className="account-toast" role="status">{message}</p> : null}
              </form>
            ) : null}

            {activeTab === "preferences" ? (
              <form className="account-delivery-panel" onSubmit={updatePreferences}>
                <div>
                  <Bell size={24} />
                  <span>Product updates</span>
                  <h2>Choose what Safna sends you.</h2>
                  <p>Keep launch news, product drops and useful delivery alerts under your control.</p>
                </div>
                <div className="account-preferences account-preferences-large">
                  <label>
                    <input name="marketing" type="checkbox" defaultChecked={account.marketing} />
                    <span>
                      <strong>Email product drops</strong>
                      Sauce launches, drink updates, recipes and offers.
                    </span>
                  </label>
                  <label>
                    <input name="smsUpdates" type="checkbox" defaultChecked={account.smsUpdates} />
                    <span>
                      <strong>Delivery text updates</strong>
                      Order and delivery alerts once checkout is live.
                    </span>
                  </label>
                </div>
                <button className="button yellow" type="submit">
                  <Save size={18} /> Save preferences
                </button>
                {message ? <p className="account-toast" role="status">{message}</p> : null}
              </form>
            ) : null}
          </div>
        </section>

        <section className="account-shop-preview">
          <div>
            <span className="eyebrow">
              <Heart size={16} /> Recommended next
            </span>
            <h2>Start building your Safna list.</h2>
          </div>
          <div className="account-recommendations">
            {recommendedProducts.map((product) => (
              <Link href={`/products/${product.slug}`} key={product.id}>
                <Image src={product.image} alt={product.name} width={240} height={180} />
                <span>{product.badge}</span>
                <strong>{product.name}</strong>
              </Link>
            ))}
          </div>
        </section>
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
