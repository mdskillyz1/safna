"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  BarChart3,
  BookOpen,
  Boxes,
  FileText,
  Home,
  Inbox,
  Package,
  Settings,
  ShoppingBag,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { policies } from "@/lib/policies";
import { categories, formatPrice, getStockLabel, products, type Product } from "@/lib/products";
import { customers, deliverySettings, enquiries, homepageSections, orders, reviewsAdmin } from "@/lib/store-data";

const tabs = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "products", label: "Products", icon: Package },
  { id: "stock", label: "Stock / POS", icon: Boxes },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "delivery", label: "Delivery", icon: Truck },
  { id: "content", label: "Content", icon: Home },
  { id: "policies", label: "Policies", icon: FileText },
  { id: "customers", label: "Customers", icon: Users },
  { id: "reviews", label: "Reviews", icon: Star },
  { id: "enquiries", label: "Enquiries", icon: Inbox },
  { id: "settings", label: "Settings", icon: Settings },
];

type AdminProduct = Product & { adminNote?: string };

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>(products);
  const [selectedProductId, setSelectedProductId] = useState(adminProducts[0]?.id || "");
  const selectedProduct = adminProducts.find((product) => product.id === selectedProductId) || adminProducts[0];

  const metrics = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const lowStock = adminProducts.filter((product) => product.stock <= 10).length;
    const pending = orders.filter((order) => order.status === "Pending").length;
    return [
      { label: "Total orders", value: String(orders.length) },
      { label: "Total revenue", value: formatPrice(revenue) },
      { label: "Pending orders", value: String(pending) },
      { label: "Low stock products", value: String(lowStock) },
    ];
  }, [adminProducts]);

  function updateProduct(field: keyof AdminProduct, value: string | number | boolean) {
    if (!selectedProduct) return;
    setAdminProducts((current) =>
      current.map((product) => (product.id === selectedProduct.id ? { ...product, [field]: value } : product)),
    );
  }

  function addDraftProduct() {
    const next: AdminProduct = {
      ...products[0],
      id: `draft-${Date.now()}`,
      slug: `draft-product-${Date.now()}`,
      name: "New draft product",
      category: "Sauces",
      price: 0,
      salePrice: undefined,
      stock: 0,
      status: "Draft",
      visibility: "Hidden",
      featured: false,
      badge: "Draft",
      description: "Short product description.",
      longDescription: "Long product story and usage notes.",
    };
    setAdminProducts((current) => [next, ...current]);
    setSelectedProductId(next.id);
    setActiveTab("products");
  }

  function removeSelectedProduct() {
    if (!selectedProduct) return;
    setAdminProducts((current) => current.filter((product) => product.id !== selectedProduct.id));
    setSelectedProductId(adminProducts.find((product) => product.id !== selectedProduct.id)?.id || "");
  }

  function unlockAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const previewPassword = process.env.NEXT_PUBLIC_ADMIN_PREVIEW_PASSWORD || "safna-admin";
    if (password === previewPassword) {
      setUnlocked(true);
      setLoginError("");
      return;
    }
    setLoginError("Incorrect admin password.");
  }

  if (!unlocked) {
    return (
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div className="page-title">
            <span className="eyebrow">Protected admin</span>
            <h1>Admin login for Safna management.</h1>
            <p>
              This preview gate protects the CMS interface during build review. For launch, connect production
              authentication with role-based admin access.
            </p>
          </div>
          <form className="card" style={{ padding: 24, display: "grid", gap: 16 }} onSubmit={unlockAdmin}>
            <label className="field">
              <span>Admin password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Ask MDemx for preview password"
              />
            </label>
            <button className="button yellow" type="submit">
              Unlock dashboard
            </button>
            {loginError ? <p role="alert">{loginError}</p> : null}
            <p style={{ color: "#526158", lineHeight: 1.65 }}>
              Preview password defaults to `safna-admin` unless `NEXT_PUBLIC_ADMIN_PREVIEW_PASSWORD` is set.
            </p>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Admin backend</span>
          <h1>Safna ecommerce management dashboard.</h1>
          <p>
            CMS-style admin area for products, stock, orders, delivery settings, policies, homepage content, reviews,
            enquiries, and customer data. Connect database/auth to persist edits across devices.
          </p>
        </div>

        <div className="card" style={{ marginTop: 28, padding: 14 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tabs.map((tab) => (
              <button
                className={`button ${activeTab === tab.id ? "yellow" : "secondary"}`}
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{ minHeight: 42 }}
              >
                <tab.icon size={17} /> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "overview" ? (
          <div style={{ display: "grid", gap: 24, marginTop: 24 }}>
            <div className="grid-3">
              {metrics.map((metric) => (
                <div className="card" key={metric.label} style={{ padding: 22 }}>
                  <strong style={{ fontSize: "2rem" }}>{metric.value}</strong>
                  <p style={{ marginBottom: 0, color: "#526158" }}>{metric.label}</p>
                </div>
              ))}
            </div>
            <div className="grid-3">
              <AdminList title="Best-selling products" items={["Signature Hot Sauce", "Safna Starter Box", "All-Purpose Seasoning"]} />
              <AdminList title="Recent customers" items={customers.map((customer) => `${customer.name} - ${customer.orders} orders`)} />
              <AdminList title="Recent enquiries" items={enquiries.map((item) => `${item.topic} - ${item.status}`)} />
            </div>
          </div>
        ) : null}

        {activeTab === "products" && selectedProduct ? (
          <div className="grid-2" style={{ alignItems: "start", marginTop: 24 }}>
            <div className="card" style={{ padding: 18, display: "grid", gap: 10 }}>
              <button className="button yellow" type="button" onClick={addDraftProduct}>
                Add product
              </button>
              {adminProducts.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => setSelectedProductId(product.id)}
                  className="button secondary"
                  style={{ justifyContent: "space-between", borderRadius: 8 }}
                >
                  <span>{product.name}</span>
                  <span>{product.status}</span>
                </button>
              ))}
            </div>

            <div className="card" style={{ padding: 22, display: "grid", gap: 16 }}>
              <AdminInput label="Product name" value={selectedProduct.name} onChange={(value) => updateProduct("name", value)} />
              <div className="grid-2">
                <AdminSelect
                  label="Category"
                  value={selectedProduct.category}
                  options={[...categories]}
                  onChange={(value) => updateProduct("category", value)}
                />
                <AdminInput label="Product size / weight" value={selectedProduct.size} onChange={(value) => updateProduct("size", value)} />
              </div>
              <div className="grid-2">
                <AdminInput
                  label="Price"
                  type="number"
                  value={selectedProduct.price}
                  onChange={(value) => updateProduct("price", Number(value))}
                />
                <AdminInput
                  label="Sale price"
                  type="number"
                  value={selectedProduct.salePrice || ""}
                  onChange={(value) => updateProduct("salePrice", Number(value))}
                />
              </div>
              <div className="grid-2">
                <AdminInput
                  label="Stock quantity"
                  type="number"
                  value={selectedProduct.stock}
                  onChange={(value) => updateProduct("stock", Number(value))}
                />
                <AdminSelect
                  label="Draft / published status"
                  value={selectedProduct.status}
                  options={["Draft", "Published"]}
                  onChange={(value) => updateProduct("status", value)}
                />
              </div>
              <div className="grid-2">
                <AdminSelect
                  label="Product visibility"
                  value={selectedProduct.visibility}
                  options={["Public", "Hidden"]}
                  onChange={(value) => updateProduct("visibility", value)}
                />
                <AdminInput label="Product image URL" value={selectedProduct.image} onChange={(value) => updateProduct("image", value)} />
              </div>
              <label className="field">
                <span>Featured product</span>
                <select
                  value={selectedProduct.featured ? "Yes" : "No"}
                  onChange={(event) => updateProduct("featured", event.target.value === "Yes")}
                >
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </label>
              <AdminTextarea label="Product description" value={selectedProduct.description} onChange={(value) => updateProduct("description", value)} />
              <AdminTextarea label="Ingredients" value={selectedProduct.ingredients} onChange={(value) => updateProduct("ingredients", value)} />
              <AdminTextarea label="Allergens" value={selectedProduct.allergens} onChange={(value) => updateProduct("allergens", value)} />
              <AdminTextarea label="Storage instructions" value={selectedProduct.storage} onChange={(value) => updateProduct("storage", value)} />
              <AdminTextarea label="Best-before / shelf-life details" value={selectedProduct.shelfLife} onChange={(value) => updateProduct("shelfLife", value)} />
              <AdminTextarea label="Dietary claims" value={selectedProduct.dietary} onChange={(value) => updateProduct("dietary", value)} />
              <AdminTextarea label="Extra product page wording" value={selectedProduct.extraWording} onChange={(value) => updateProduct("extraWording", value)} />
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="button yellow" type="button">
                  Save draft
                </button>
                <button className="button secondary" type="button" onClick={() => updateProduct("status", "Published")}>
                  Publish
                </button>
                <button className="button secondary" type="button" onClick={removeSelectedProduct}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "stock" ? (
          <AdminTable
            title="POS / stock management"
            headers={["Product", "Stock", "Alert", "Action"]}
            rows={adminProducts.map((product) => [
              product.name,
              String(product.stock),
              getStockLabel(product.stock),
              product.stock <= 0 ? "Marked out of stock" : "Adjust + / - from product editor",
            ])}
          />
        ) : null}

        {activeTab === "orders" ? (
          <AdminTable title="Orders" headers={["Order", "Customer", "Items", "Total", "Status"]} rows={orders.map((order) => [order.id, order.customer, order.items, formatPrice(order.total), order.status])} />
        ) : null}

        {activeTab === "delivery" ? (
          <div className="grid-2" style={{ marginTop: 24 }}>
            <AdminInput label="UK shipping zones" value={deliverySettings.zones} />
            <AdminInput label="Delivery fee options" value={`Standard delivery ${formatPrice(deliverySettings.standardFee)}`} />
            <AdminInput label="Free delivery threshold" value={formatPrice(deliverySettings.freeDeliveryThreshold)} />
            <AdminInput label="Order cut-off times" value={deliverySettings.cutOffTime} />
            <AdminTextarea label="Delivery notes" value={deliverySettings.notes} />
            <AdminTextarea label="Packaging requirements" value={deliverySettings.packaging} />
            <AdminTextarea label="Temperature / handling requirements" value={deliverySettings.handling} />
          </div>
        ) : null}

        {activeTab === "content" ? (
          <div className="grid-2" style={{ marginTop: 24 }}>
            {homepageSections.map((section) => (
              <div className="card" key={section.section} style={{ padding: 22 }}>
                <BookOpen size={22} />
                <h3>{section.section}</h3>
                <p style={{ color: "#526158", lineHeight: 1.65 }}>{section.detail}</p>
                <span className="eyebrow">{section.status}</span>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "policies" ? (
          <div className="grid-2" style={{ marginTop: 24 }}>
            {policies.map((policy) => (
              <div className="card" key={policy.slug} style={{ padding: 22 }}>
                <h3>{policy.title}</h3>
                <p style={{ color: "#526158", lineHeight: 1.65 }}>{policy.summary}</p>
                <AdminTextarea label="Editable policy wording" value={policy.body.join("\n\n")} />
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "customers" ? (
          <AdminTable title="Customers" headers={["Name", "Email", "Orders", "Last order"]} rows={customers.map((customer) => [customer.name, customer.email, String(customer.orders), customer.lastOrder])} />
        ) : null}

        {activeTab === "reviews" ? (
          <AdminTable title="Reviews" headers={["Name", "Product", "Rating", "Status"]} rows={reviewsAdmin.map((review) => [review.name, review.product, `${review.rating} stars`, review.status])} />
        ) : null}

        {activeTab === "enquiries" ? (
          <AdminTable title="Enquiries" headers={["Name", "Email", "Topic", "Status"]} rows={enquiries.map((item) => [item.name, item.email, item.topic, item.status])} />
        ) : null}

        {activeTab === "settings" ? (
          <div className="card" style={{ marginTop: 24, padding: 24 }}>
            <h2>Production connection checklist</h2>
            <ul style={{ lineHeight: 2 }}>
              <li>Set `STRIPE_SECRET_KEY` in Vercel for live Stripe Checkout.</li>
              <li>Set `NEXT_PUBLIC_SITE_URL=https://safna.co.uk` before domain launch.</li>
              <li>Connect a production database for persistent admin edits, accounts, orders, and policies.</li>
              <li>Connect authentication for protected admin login and customer accounts.</li>
              <li>Connect an email provider for customer receipts and admin notifications.</li>
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function AdminList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <h3>{title}</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {items.map((item) => (
          <span key={item} style={{ color: "#526158" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function AdminInput({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string | number;
  type?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange?.(event.target.value)} readOnly={!onChange} />
    </label>
  );
}

function AdminSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function AdminTextarea({ label, value, onChange }: { label: string; value: string; onChange?: (value: string) => void }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange?.(event.target.value)} readOnly={!onChange} />
    </label>
  );
}

function AdminTable({ title, headers, rows }: { title: string; headers: string[]; rows: string[][] }) {
  return (
    <div className="card" style={{ marginTop: 24, padding: 22, overflowX: "auto" }}>
      <h2>{title}</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} style={{ textAlign: "left", padding: 12, borderBottom: "1px solid rgba(16,23,19,.14)" }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell) => (
                <td key={cell} style={{ padding: 12, borderBottom: "1px solid rgba(16,23,19,.08)", color: "#526158" }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
