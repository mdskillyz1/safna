"use client";

import type { CSSProperties, FormEvent, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  Archive,
  Bell,
  BookOpen,
  Boxes,
  Check,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  Edit3,
  Eye,
  FileText,
  Filter,
  Home,
  ImagePlus,
  Inbox,
  LayoutDashboard,
  Loader2,
  Mail,
  Package,
  Plus,
  Printer,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Star,
  Tag,
  Truck,
  Undo2,
  Upload,
  UserRound,
  Users,
} from "lucide-react";
import Link from "next/link";
import { promoCampaigns, storefrontTiles } from "@/lib/content";
import { policies } from "@/lib/policies";
import { categories, formatPrice, getStockLabel, products, type Product } from "@/lib/products";
import { customers, deliverySettings, enquiries, homepageSections, orders, reviewsAdmin } from "@/lib/store-data";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
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
] as const;

type AdminSection = (typeof navItems)[number]["id"];
type AdminProduct = Product & { sku: string; completenessNote?: string; stockHistory?: string[] };
type ToastKind = "success" | "error" | "info";

const productSeed: AdminProduct[] = products.map((product, index) => ({
  ...product,
  sku: `SAF-${String(index + 1).padStart(4, "0")}`,
  stockHistory: [`Initial stock set to ${product.stock}`],
}));

const statusOptions = ["All", "Draft", "Published"] as const;
const stockOptions = ["All", "In stock", "Low stock", "Out of stock"] as const;
const orderFilters = ["All", "Paid", "Unpaid", "Processing", "Shipped", "Delivered", "Refunded"] as const;

export function AdminDashboard() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeSection, setActiveSection] = useState<AdminSection>("dashboard");
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>(productSeed);
  const [selectedProductId, setSelectedProductId] = useState(productSeed[0]?.id || "");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [productSearch, setProductSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("All");
  const [stockFilter, setStockFilter] = useState<(typeof stockOptions)[number]>("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [toast, setToast] = useState<{ message: string; kind: ToastKind } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [orderFilter, setOrderFilter] = useState<(typeof orderFilters)[number]>("All");
  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || "");
  const [stockReason, setStockReason] = useState("Manual stock count");

  const selectedProduct = adminProducts.find((product) => product.id === selectedProductId) || adminProducts[0];
  const selectedOrder = orders.find((order) => order.id === selectedOrderId) || orders[0];

  const filteredProducts = useMemo(() => {
    return adminProducts.filter((product) => {
      const query = productSearch.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query);
      const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
      const matchesStatus = statusFilter === "All" || product.status === statusFilter;
      const stockLabel = getStockLabel(product.stock);
      const matchesStock = stockFilter === "All" || stockLabel === stockFilter;
      const matchesFeatured = !featuredOnly || Boolean(product.featured);
      return matchesSearch && matchesCategory && matchesStatus && matchesStock && matchesFeatured;
    });
  }, [adminProducts, categoryFilter, featuredOnly, productSearch, statusFilter, stockFilter]);

  const metrics = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    const lowStock = adminProducts.filter((product) => product.stock <= 10).length;
    const pending = orders.filter((order) => order.status === "Pending").length;
    const pendingReviews = reviewsAdmin.filter((review) => review.status === "Pending").length;
    return [
      { label: "Total revenue", value: formatPrice(revenue), change: "+12% this week", icon: CreditCard },
      { label: "Orders today", value: String(orders.filter((order) => order.date === "2026-07-09").length), change: "2 need action", icon: ShoppingBag },
      { label: "Pending orders", value: String(pending), change: "Packing queue", icon: Clock },
      { label: "Low stock products", value: String(lowStock), change: "Reorder soon", icon: AlertTriangle },
      { label: "Best sellers", value: "3", change: "Sauces leading", icon: Sparkles },
      { label: "Recent customers", value: String(customers.length), change: "Repeat orders ready", icon: Users },
      { label: "New enquiries", value: String(enquiries.filter((item) => item.status === "New").length), change: "Reply from inbox", icon: Inbox },
      { label: "Reviews awaiting approval", value: String(pendingReviews), change: "Moderate today", icon: Star },
    ];
  }, [adminProducts]);

  function notify(message: string, kind: ToastKind = "success") {
    setToast({ message, kind });
    window.setTimeout(() => setToast(null), 2600);
  }

  function markDirty(message = "Autosaving draft...") {
    setHasUnsavedChanges(true);
    setSaving(true);
    setToast({ message, kind: "info" });
    window.setTimeout(() => {
      setSaving(false);
      setHasUnsavedChanges(false);
      setToast({ message: "Draft autosaved", kind: "success" });
      window.setTimeout(() => setToast(null), 1800);
    }, 900);
  }

  function updateProduct(field: keyof AdminProduct, value: string | number | boolean | undefined) {
    if (!selectedProduct) return;
    setAdminProducts((current) =>
      current.map((product) => (product.id === selectedProduct.id ? { ...product, [field]: value } : product)),
    );
    markDirty();
  }

  function unlockAdmin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const previewPassword = process.env.NEXT_PUBLIC_ADMIN_PREVIEW_PASSWORD || "safna-admin";
    if (password === previewPassword) {
      setUnlocked(true);
      setLoginError("");
      notify("Admin dashboard unlocked");
      return;
    }
    setLoginError("Incorrect admin password.");
  }

  function addDraftProduct() {
    const stamp = Date.now();
    const next: AdminProduct = {
      ...productSeed[0],
      id: `draft-${stamp}`,
      slug: `draft-product-${stamp}`,
      name: "New draft product",
      category: "Sauces",
      price: 0,
      salePrice: undefined,
      stock: 0,
      status: "Draft",
      visibility: "Hidden",
      featured: false,
      demoOnly: false,
      badge: "Draft",
      description: "Short product description.",
      longDescription: "Long product story and usage notes.",
      sku: `SAF-DRAFT-${String(adminProducts.length + 1).padStart(3, "0")}`,
      stockHistory: ["Draft created"],
    };
    setAdminProducts((current) => [next, ...current]);
    setSelectedProductId(next.id);
    setActiveSection("products");
    notify("Draft product created");
  }

  function duplicateProduct(product: AdminProduct) {
    const copyProduct: AdminProduct = {
      ...product,
      id: `${product.id}-copy-${Date.now()}`,
      slug: `${product.slug}-copy`,
      name: `${product.name} copy`,
      status: "Draft",
      visibility: "Hidden",
      sku: `${product.sku}-COPY`,
      stockHistory: ["Duplicated from existing product"],
    };
    setAdminProducts((current) => [copyProduct, ...current]);
    setSelectedProductId(copyProduct.id);
    notify("Product duplicated as draft");
  }

  function runBulk(action: "publish" | "unpublish" | "delete") {
    if (!selectedProductIds.length) {
      notify("Select products first", "error");
      return;
    }
    if (action === "delete") {
      setConfirmDelete(true);
      return;
    }
    setAdminProducts((current) =>
      current.map((product) =>
        selectedProductIds.includes(product.id)
          ? { ...product, status: action === "publish" ? "Published" : "Draft", visibility: action === "publish" ? "Public" : "Hidden" }
          : product,
      ),
    );
    notify(action === "publish" ? "Selected products published" : "Selected products unpublished");
  }

  function deleteSelectedProducts() {
    setAdminProducts((current) => current.filter((product) => !selectedProductIds.includes(product.id)));
    if (selectedProductIds.includes(selectedProductId)) {
      setSelectedProductId(adminProducts.find((product) => !selectedProductIds.includes(product.id))?.id || "");
    }
    setSelectedProductIds([]);
    setConfirmDelete(false);
    notify("Selected products deleted");
  }

  function adjustStock(productId: string, amount: number) {
    setAdminProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? {
              ...product,
              stock: Math.max(0, product.stock + amount),
              stockHistory: [
                `${amount > 0 ? "Added" : "Reduced"} ${Math.abs(amount)} units - ${stockReason}`,
                ...(product.stockHistory || []),
              ],
            }
          : product,
      ),
    );
    notify(amount > 0 ? "Stock increased" : "Stock reduced");
  }

  if (!unlocked) {
    return (
      <section className="admin-login">
        <div className="admin-login-panel">
          <span className="admin-pill">
            <ShieldCheck size={16} /> Secure preview
          </span>
          <h1>Safna admin control centre</h1>
          <p>Manage products, stock, orders, delivery, customers, reviews, content and launch settings from one place.</p>
          <form onSubmit={unlockAdmin} className="admin-login-form">
            <label>
              <span>Admin password</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter preview password"
              />
            </label>
            <button type="submit">
              Unlock dashboard <ChevronRight size={17} />
            </button>
            {loginError ? <p role="alert">{loginError}</p> : null}
            <small>Preview password defaults to safna-admin unless a Vercel admin password is set.</small>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/" className="admin-brand">
          <span>Safna</span>
          <small>Commerce admin</small>
        </Link>
        <nav aria-label="Admin navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeSection === item.id ? "active" : ""}
              onClick={() => setActiveSection(item.id)}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="admin-workspace">
        <header className="admin-topbar">
          <label className="admin-search">
            <Search size={18} />
            <input placeholder="Search products, orders, customers..." />
          </label>
          <div className="admin-top-actions">
            <span className={`save-status ${saving ? "saving" : ""}`}>
              {saving ? <Loader2 size={15} /> : <Check size={15} />}
              {saving ? "Autosaving" : hasUnsavedChanges ? "Unsaved changes" : "Saved"}
            </span>
            <button type="button" className="icon-admin-button" aria-label="Notifications">
              <Bell size={18} />
              <span />
            </button>
            <button type="button" className="admin-primary" onClick={addDraftProduct}>
              <Plus size={17} /> Quick add
            </button>
            <button type="button" className="admin-profile" aria-label="Admin profile">
              <UserRound size={18} />
              Ibrahim
            </button>
          </div>
        </header>

        <main className="admin-main">
          {activeSection === "dashboard" ? (
            <DashboardView metrics={metrics} addDraftProduct={addDraftProduct} setActiveSection={setActiveSection} />
          ) : null}

          {activeSection === "products" && selectedProduct ? (
            <ProductsView
              products={adminProducts}
              filteredProducts={filteredProducts}
              selectedProduct={selectedProduct}
              selectedProductIds={selectedProductIds}
              productSearch={productSearch}
              categoryFilter={categoryFilter}
              statusFilter={statusFilter}
              stockFilter={stockFilter}
              featuredOnly={featuredOnly}
              setProductSearch={setProductSearch}
              setCategoryFilter={setCategoryFilter}
              setStatusFilter={setStatusFilter}
              setStockFilter={setStockFilter}
              setFeaturedOnly={setFeaturedOnly}
              setSelectedProductId={setSelectedProductId}
              setSelectedProductIds={setSelectedProductIds}
              addDraftProduct={addDraftProduct}
              duplicateProduct={duplicateProduct}
              updateProduct={updateProduct}
              runBulk={runBulk}
              notify={notify}
            />
          ) : null}

          {activeSection === "stock" ? (
            <StockView products={adminProducts} reason={stockReason} setReason={setStockReason} adjustStock={adjustStock} />
          ) : null}

          {activeSection === "orders" ? (
            <OrdersView orderFilter={orderFilter} setOrderFilter={setOrderFilter} selectedOrder={selectedOrder} setSelectedOrderId={setSelectedOrderId} notify={notify} />
          ) : null}

          {activeSection === "delivery" ? <DeliveryView notify={notify} /> : null}
          {activeSection === "content" ? <ContentView notify={notify} /> : null}
          {activeSection === "policies" ? <PoliciesView notify={notify} /> : null}
          {activeSection === "customers" ? <CustomersView notify={notify} /> : null}
          {activeSection === "reviews" ? <ReviewsView notify={notify} /> : null}
          {activeSection === "enquiries" ? <EnquiriesView notify={notify} /> : null}
          {activeSection === "settings" ? <SettingsView /> : null}
        </main>
      </div>

      {toast ? (
        <div className={`admin-toast ${toast.kind}`} role="status">
          {toast.kind === "success" ? <Check size={17} /> : toast.kind === "error" ? <AlertTriangle size={17} /> : <Loader2 size={17} />}
          {toast.message}
        </div>
      ) : null}

      {confirmDelete ? (
        <div className="admin-modal-backdrop" role="presentation">
          <div className="admin-modal" role="dialog" aria-modal="true" aria-label="Confirm delete">
            <AlertTriangle size={24} />
            <h2>Delete selected products?</h2>
            <p>This removes the selected draft/product records from this admin preview. Production will require audit logging.</p>
            <div>
              <button type="button" className="admin-muted-button" onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
              <button type="button" className="admin-danger-button" onClick={deleteSelectedProducts}>
                Delete products
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function DashboardView({
  metrics,
  addDraftProduct,
  setActiveSection,
}: {
  metrics: { label: string; value: string; change: string; icon: typeof CreditCard }[];
  addDraftProduct: () => void;
  setActiveSection: (section: AdminSection) => void;
}) {
  const actions = [
    { label: "Add product", icon: Plus, action: addDraftProduct },
    { label: "Create discount", icon: Tag, action: () => setActiveSection("settings") },
    { label: "View orders", icon: ShoppingBag, action: () => setActiveSection("orders") },
    { label: "Add blog post", icon: BookOpen, action: () => setActiveSection("content") },
    { label: "Update delivery fees", icon: Truck, action: () => setActiveSection("delivery") },
    { label: "Edit homepage", icon: Home, action: () => setActiveSection("content") },
  ];

  return (
    <>
      <AdminHeader eyebrow="Overview" title="Good morning, Ibrahim" body="A clean snapshot of Safna sales, stock, orders and content tasks." />
      <div className="admin-metric-grid">
        {metrics.map((metric) => (
          <article className="admin-card metric-card" key={metric.label}>
            <metric.icon size={20} />
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
            <small>{metric.change}</small>
          </article>
        ))}
      </div>
      <div className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Quick actions</h2>
            <p>Fast workflows for the most common store tasks.</p>
          </div>
        </div>
        <div className="quick-action-grid">
          {actions.map((action) => (
            <button type="button" key={action.label} onClick={action.action}>
              <action.icon size={18} />
              {action.label}
            </button>
          ))}
        </div>
      </div>
      <div className="admin-two-col">
        <AdminList title="Best-selling products" items={["Signature Hot Sauce", "Safna Starter Box", "All-Purpose Seasoning"]} />
        <AdminList title="Recent customers" items={customers.map((customer) => `${customer.name} - ${customer.orders} orders`)} />
        <AdminList title="New enquiries" items={enquiries.map((item) => `${item.topic} - ${item.status}`)} />
        <AdminList title="Reviews queue" items={reviewsAdmin.map((review) => `${review.product} - ${review.status}`)} />
      </div>
    </>
  );
}

function ProductsView({
  products,
  filteredProducts,
  selectedProduct,
  selectedProductIds,
  productSearch,
  categoryFilter,
  statusFilter,
  stockFilter,
  featuredOnly,
  setProductSearch,
  setCategoryFilter,
  setStatusFilter,
  setStockFilter,
  setFeaturedOnly,
  setSelectedProductId,
  setSelectedProductIds,
  addDraftProduct,
  duplicateProduct,
  updateProduct,
  runBulk,
  notify,
}: {
  products: AdminProduct[];
  filteredProducts: AdminProduct[];
  selectedProduct: AdminProduct;
  selectedProductIds: string[];
  productSearch: string;
  categoryFilter: string;
  statusFilter: string;
  stockFilter: string;
  featuredOnly: boolean;
  setProductSearch: (value: string) => void;
  setCategoryFilter: (value: string) => void;
  setStatusFilter: (value: (typeof statusOptions)[number]) => void;
  setStockFilter: (value: (typeof stockOptions)[number]) => void;
  setFeaturedOnly: (value: boolean) => void;
  setSelectedProductId: (value: string) => void;
  setSelectedProductIds: (value: string[] | ((current: string[]) => string[])) => void;
  addDraftProduct: () => void;
  duplicateProduct: (product: AdminProduct) => void;
  updateProduct: (field: keyof AdminProduct, value: string | number | boolean | undefined) => void;
  runBulk: (action: "publish" | "unpublish" | "delete") => void;
  notify: (message: string, kind?: ToastKind) => void;
}) {
  const allVisibleSelected = filteredProducts.length > 0 && filteredProducts.every((product) => selectedProductIds.includes(product.id));

  function toggleProduct(id: string) {
    setSelectedProductIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <>
      <AdminHeader eyebrow="Products" title="Product management" body="Search, filter, bulk edit and keep food product details complete before publishing." />

      <div className="admin-card">
        <div className="admin-toolbar">
          <label className="table-search">
            <Search size={17} />
            <input value={productSearch} onChange={(event) => setProductSearch(event.target.value)} placeholder="Search products or SKU" />
          </label>
          <SelectControl value={categoryFilter} onChange={setCategoryFilter} options={["All", ...categories]} icon={Filter} />
          <SelectControl value={statusFilter} onChange={(value) => setStatusFilter(value as (typeof statusOptions)[number])} options={[...statusOptions]} icon={SlidersHorizontal} />
          <SelectControl value={stockFilter} onChange={(value) => setStockFilter(value as (typeof stockOptions)[number])} options={[...stockOptions]} icon={Archive} />
          <button type="button" className={featuredOnly ? "admin-chip active" : "admin-chip"} onClick={() => setFeaturedOnly(!featuredOnly)}>
            <Star size={16} /> Featured
          </button>
          <button type="button" className="admin-primary" onClick={addDraftProduct}>
            <Plus size={16} /> Add product
          </button>
        </div>

        <div className="bulk-bar">
          <label>
            <input
              type="checkbox"
              checked={allVisibleSelected}
              onChange={(event) =>
                setSelectedProductIds(event.target.checked ? filteredProducts.map((product) => product.id) : [])
              }
            />
            {selectedProductIds.length} selected
          </label>
          <button type="button" onClick={() => runBulk("publish")}>
            Bulk publish
          </button>
          <button type="button" onClick={() => runBulk("unpublish")}>
            Bulk unpublish
          </button>
          <button type="button" onClick={() => runBulk("delete")}>
            Bulk delete
          </button>
        </div>

        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th />
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Completeness</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className={selectedProduct.id === product.id ? "selected" : ""}>
                  <td>
                    <input type="checkbox" checked={selectedProductIds.includes(product.id)} onChange={() => toggleProduct(product.id)} />
                  </td>
                  <td>
                    <button type="button" className="product-cell" onClick={() => setSelectedProductId(product.id)}>
                      <span className="thumb" style={{ "--thumb": product.colour } as CSSProperties}>
                        {product.name.charAt(0)}
                      </span>
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.sku}</small>
                      </span>
                    </button>
                  </td>
                  <td>{product.category}</td>
                  <td>{formatPrice(product.salePrice || product.price)}</td>
                  <td>
                    <StatusBadge tone={product.stock <= 0 ? "danger" : product.stock <= 10 ? "warning" : "success"}>
                      {getStockLabel(product.stock)} · {product.stock}
                    </StatusBadge>
                  </td>
                  <td>
                    <StatusBadge tone={product.status === "Published" ? "success" : "neutral"}>{product.status}</StatusBadge>
                  </td>
                  <td>
                    <Completeness product={product} />
                  </td>
                  <td>
                    <div className="row-actions">
                      <button type="button" title="Quick edit" onClick={() => setSelectedProductId(product.id)}>
                        <Edit3 size={15} />
                      </button>
                      <button
                        type="button"
                        title="Preview product page"
                        onClick={() => {
                          setSelectedProductId(product.id);
                          notify("Admin preview updated below");
                        }}
                      >
                        <Eye size={15} />
                      </button>
                      <button type="button" title="Duplicate" onClick={() => duplicateProduct(product)}>
                        <Copy size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ProductEditor product={selectedProduct} products={products} updateProduct={updateProduct} notify={notify} />
    </>
  );
}

function ProductEditor({
  product,
  products,
  updateProduct,
  notify,
}: {
  product: AdminProduct;
  products: AdminProduct[];
  updateProduct: (field: keyof AdminProduct, value: string | number | boolean | undefined) => void;
  notify: (message: string, kind?: ToastKind) => void;
}) {
  return (
    <div className="admin-editor-grid">
      <div className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>Product editor</h2>
            <p>Autosave is enabled for draft changes. Production can connect this to database persistence.</p>
          </div>
          <div className="row-actions text-actions">
            <button type="button" onClick={() => updateProduct("status", "Draft")}>
              <Save size={15} /> Save as draft
            </button>
            <button type="button" onClick={() => updateProduct("status", "Published")}>
              <Upload size={15} /> Publish
            </button>
          </div>
        </div>

        <EditorSection title="Basic details">
          <InputControl label="Product name" value={product.name} onChange={(value) => updateProduct("name", value)} />
          <InputControl label="Slug" value={product.slug} onChange={(value) => updateProduct("slug", value)} />
          <SelectControl label="Category" value={product.category} onChange={(value) => updateProduct("category", value)} options={[...categories]} />
          <TextareaControl label="Short description" value={product.description} onChange={(value) => updateProduct("description", value)} />
        </EditorSection>

        <EditorSection title="Pricing">
          <div className="admin-form-grid">
            <InputControl label="Price" type="number" value={product.price} onChange={(value) => updateProduct("price", Number(value))} />
            <InputControl label="Sale price" type="number" value={product.salePrice || ""} onChange={(value) => updateProduct("salePrice", value ? Number(value) : undefined)} />
          </div>
        </EditorSection>

        <EditorSection title="Stock">
          <div className="admin-form-grid">
            <InputControl label="SKU / barcode" value={product.sku} onChange={(value) => updateProduct("sku", value)} />
            <InputControl label="Stock quantity" type="number" value={product.stock} onChange={(value) => updateProduct("stock", Number(value))} />
          </div>
          <SwitchControl label="Mark as out of stock" checked={product.stock <= 0} onChange={(checked) => updateProduct("stock", checked ? 0 : 10)} />
        </EditorSection>

        <EditorSection title="Images">
          <div className="image-upload-card">
            <ImagePlus size={26} />
            <strong>Upload product images</strong>
            <span>Bottle, pouch, label, packaging and gift-box shots.</span>
            <button type="button" onClick={() => notify("Image upload placeholder ready")}>
              Choose files
            </button>
          </div>
          <InputControl label="Current image URL" value={product.image} onChange={(value) => updateProduct("image", value)} />
        </EditorSection>

        <EditorSection title="Food information">
          <TextareaControl label="Ingredients" value={product.ingredients} onChange={(value) => updateProduct("ingredients", value)} />
          <TextareaControl label="Allergens" value={product.allergens} onChange={(value) => updateProduct("allergens", value)} />
          <TextareaControl label="Storage instructions" value={product.storage} onChange={(value) => updateProduct("storage", value)} />
          <TextareaControl label="Shelf life / best-before" value={product.shelfLife} onChange={(value) => updateProduct("shelfLife", value)} />
          <InputControl label="Dietary claims" value={product.dietary} onChange={(value) => updateProduct("dietary", value)} />
          <TextareaControl label="Extra product page wording" value={product.extraWording} onChange={(value) => updateProduct("extraWording", value)} />
        </EditorSection>

        <EditorSection title="SEO">
          <InputControl label="SEO title" value={`${product.name} | Safna Products`} onChange={() => notify("SEO title editable in production CMS", "info")} />
          <TextareaControl label="Meta description" value={product.description} onChange={(value) => updateProduct("description", value)} />
        </EditorSection>

        <EditorSection title="Visibility">
          <div className="admin-form-grid">
            <SelectControl label="Status" value={product.status} onChange={(value) => updateProduct("status", value)} options={["Draft", "Published"]} />
            <SelectControl label="Visibility" value={product.visibility} onChange={(value) => updateProduct("visibility", value)} options={["Public", "Hidden"]} />
          </div>
          <SwitchControl label="Featured product" checked={Boolean(product.featured)} onChange={(checked) => updateProduct("featured", checked)} />
          <SwitchControl label="Bundle or gift box" checked={Boolean(product.isBundle)} onChange={(checked) => updateProduct("isBundle", checked)} />
          <SwitchControl label="Internal demo only" checked={Boolean(product.demoOnly)} onChange={(checked) => updateProduct("demoOnly", checked)} />
        </EditorSection>

        <EditorSection title="Related products">
          <div className="tag-cloud">
            {products
              .filter((item) => item.id !== product.id)
              .slice(0, 5)
              .map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}
          </div>
        </EditorSection>
      </div>

      <aside className="admin-card side-panel">
        <h2>Live preview</h2>
        <div className="admin-product-preview">
          <div className="preview-packshot" style={{ "--thumb": product.colour } as CSSProperties}>
            {product.name.charAt(0)}
          </div>
          <span>{product.category}</span>
          <strong>{product.name}</strong>
          <p>{product.description}</p>
          <small>
            Public when: Published + Public visibility + not internal demo only.
          </small>
        </div>
        <h2>Automation</h2>
        <Completeness product={product} large />
        <div className="automation-list">
          <span>
            <Check size={15} /> Autosave draft active
          </span>
          <span>
            <Clock size={15} /> Last edited just now
          </span>
          <span>
            <Eye size={15} /> Preview updates instantly
          </span>
          <span>
            <AlertTriangle size={15} /> Missing food info flags before publishing
          </span>
        </div>
      </aside>
    </div>
  );
}

function StockView({
  products,
  reason,
  setReason,
  adjustStock,
}: {
  products: AdminProduct[];
  reason: string;
  setReason: (value: string) => void;
  adjustStock: (productId: string, amount: number) => void;
}) {
  return (
    <>
      <AdminHeader eyebrow="Stock / POS" title="Inventory and quick sales" body="Track stock, log adjustments, support SKU/barcodes and reduce stock during order workflows." />
      <div className="admin-two-col">
        <div className="admin-card pos-panel">
          <h2>POS quick sale</h2>
          <label className="table-search">
            <Search size={17} />
            <input placeholder="Scan barcode or search SKU" />
          </label>
          <div className="pos-grid">
            {products.slice(0, 4).map((product) => (
              <button key={product.id} type="button" onClick={() => adjustStock(product.id, -1)}>
                <span className="thumb" style={{ "--thumb": product.colour } as CSSProperties}>
                  {product.name.charAt(0)}
                </span>
                <strong>{product.name}</strong>
                <small>{formatPrice(product.salePrice || product.price)}</small>
              </button>
            ))}
          </div>
        </div>
        <div className="admin-card">
          <h2>Adjustment reason</h2>
          <InputControl label="Reason for adjustment" value={reason} onChange={setReason} />
          <p className="admin-help">Every stock increase or reduction can be logged with a reason in production.</p>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>SKU</th>
                <th>Stock</th>
                <th>Alert</th>
                <th>Out of stock</th>
                <th>Adjust</th>
                <th>History</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.sku}</td>
                  <td>{product.stock}</td>
                  <td>
                    <StatusBadge tone={product.stock <= 0 ? "danger" : product.stock <= 10 ? "warning" : "success"}>
                      {getStockLabel(product.stock)}
                    </StatusBadge>
                  </td>
                  <td>
                    <SwitchControl
                      label="Out of stock"
                      hideLabel
                      checked={product.stock <= 0}
                      onChange={(checked) => {
                        adjustStock(product.id, checked ? -product.stock : 10);
                      }}
                    />
                  </td>
                  <td>
                    <div className="row-actions text-actions">
                      <button type="button" onClick={() => adjustStock(product.id, 5)}>
                        + Add stock
                      </button>
                      <button type="button" onClick={() => adjustStock(product.id, -1)}>
                        - Reduce
                      </button>
                    </div>
                  </td>
                  <td>{product.stockHistory?.[0] || "No history"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function OrdersView({
  orderFilter,
  setOrderFilter,
  selectedOrder,
  setSelectedOrderId,
  notify,
}: {
  orderFilter: string;
  setOrderFilter: (value: (typeof orderFilters)[number]) => void;
  selectedOrder: (typeof orders)[number];
  setSelectedOrderId: (value: string) => void;
  notify: (message: string, kind?: ToastKind) => void;
}) {
  const visibleOrders = orders.filter((order) => {
    if (orderFilter === "All") return true;
    if (orderFilter === "Processing") return order.status === "Packing";
    if (orderFilter === "Delivered") return order.status === "Completed";
    if (orderFilter === "Shipped") return order.status === "Dispatched";
    if (orderFilter === "Unpaid") return order.status === "Pending";
    return order.status === orderFilter;
  });

  return (
    <>
      <AdminHeader eyebrow="Orders" title="Order workflow" body="Manage status, packing, customer updates, Stripe refund placeholders and delivery tracking." />
      <div className="admin-card">
        <div className="admin-toolbar">
          {orderFilters.map((filter) => (
            <button key={filter} type="button" className={orderFilter === filter ? "admin-chip active" : "admin-chip"} onClick={() => setOrderFilter(filter)}>
              {filter}
            </button>
          ))}
        </div>
        <div className="admin-order-layout">
          <div className="order-list">
            {visibleOrders.map((order) => (
              <button key={order.id} type="button" onClick={() => setSelectedOrderId(order.id)}>
                <span>
                  <strong>{order.id}</strong>
                  <small>{order.customer}</small>
                </span>
                <StatusBadge tone={order.status === "Pending" ? "warning" : order.status === "Completed" ? "success" : "neutral"}>
                  {order.status}
                </StatusBadge>
              </button>
            ))}
          </div>
          <div className="order-detail">
            <h2>{selectedOrder.id}</h2>
            <p>{selectedOrder.items}</p>
            <div className="detail-grid">
              <span>Customer <strong>{selectedOrder.customer}</strong></span>
              <span>Email <strong>{selectedOrder.email}</strong></span>
              <span>Total <strong>{formatPrice(selectedOrder.total)}</strong></span>
              <span>Status <strong>{selectedOrder.status}</strong></span>
            </div>
            <InputControl label="Delivery tracking" value="Tracking code pending" onChange={() => notify("Tracking saved")} />
            <TextareaControl label="Internal notes" value="Check packaging before dispatch." onChange={() => notify("Internal note saved")} />
            <div className="row-actions text-actions">
              <button type="button" onClick={() => notify("Order marked as processing")}>
                <RefreshCw size={15} /> Update status
              </button>
              <button type="button" onClick={() => notify("Packing slip ready")}>
                <Printer size={15} /> Print packing slip
              </button>
              <button type="button" onClick={() => notify("Customer email placeholder sent")}>
                <Mail size={15} /> Send update
              </button>
              <button type="button" onClick={() => notify("Stripe refund placeholder", "info")}>
                <Undo2 size={15} /> Refund
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function DeliveryView({ notify }: { notify: (message: string, kind?: ToastKind) => void }) {
  return (
    <>
      <AdminHeader eyebrow="Delivery" title="UK delivery automation" body="Set zones, fees, thresholds, cut-offs, partner details and checkout preview messaging." />
      <div className="admin-editor-grid">
        <div className="admin-card">
          <EditorSection title="Delivery rules">
            <SwitchControl label="UK-only delivery" checked onChange={() => notify("UK-only delivery stays enabled")} />
            <InputControl label="Delivery zones" value={deliverySettings.zones} onChange={() => notify("Delivery zones saved")} />
            <InputControl label="Standard fee" value={formatPrice(deliverySettings.standardFee)} onChange={() => notify("Delivery fee saved")} />
            <InputControl label="Free delivery threshold" value={formatPrice(deliverySettings.freeDeliveryThreshold)} onChange={() => notify("Threshold saved")} />
            <InputControl label="Order cut-off time" value={deliverySettings.cutOffTime} onChange={() => notify("Cut-off saved")} />
            <InputControl label="Delivery partner" value="Partner to be confirmed" onChange={() => notify("Partner saved")} />
            <TextareaControl label="Packaging notes" value={deliverySettings.packaging} onChange={() => notify("Packaging notes saved")} />
            <TextareaControl label="Temperature / handling requirements" value={deliverySettings.handling} onChange={() => notify("Handling notes saved")} />
          </EditorSection>
        </div>
        <aside className="admin-card side-panel">
          <h2>Checkout preview</h2>
          <div className="checkout-preview">
            <span>Basket subtotal <strong>£31.98</strong></span>
            <span>Delivery <strong>£3.99</strong></span>
            <span>Free delivery from <strong>£35.00</strong></span>
            <p>{deliverySettings.notes}</p>
          </div>
        </aside>
      </div>
    </>
  );
}

function ContentView({ notify }: { notify: (message: string, kind?: ToastKind) => void }) {
  return (
    <>
      <AdminHeader eyebrow="Content" title="Homepage, blog and FAQ CMS" body="Draft, preview and publish content with SEO fields and last-edited context." />
      <div className="admin-card cms-preview-card">
        <div className="admin-card-head">
          <div>
            <h2>Storefront preview workflow</h2>
            <p>Update homepage routes, promotional placements and launch content before pushing anything live.</p>
          </div>
          <StatusBadge tone="success">Preview mode</StatusBadge>
        </div>
        <div className="cms-preview-layout">
          <div className="cms-nav-builder">
            <h3>Homepage columns</h3>
            {storefrontTiles.map((tile) => (
              <button type="button" key={tile.label} onClick={() => notify(`${tile.label} preview selected`)}>
                <strong>{tile.label}</strong>
                <span>{tile.description}</span>
              </button>
            ))}
          </div>
          <div className="cms-promo-builder">
            <h3>Promotion placements</h3>
            {promoCampaigns.map((campaign) => (
              <article key={campaign.id}>
                <span>{campaign.status}</span>
                <strong>{campaign.title}</strong>
                <p>{campaign.placement}</p>
                <div className="row-actions text-actions">
                  <button type="button" onClick={() => notify(`${campaign.title} draft saved`)}>
                    <Save size={15} /> Save draft
                  </button>
                  <button type="button" onClick={() => notify(`${campaign.title} preview opened`)}>
                    <Eye size={15} /> Preview
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
      <div className="admin-two-col">
        {[...homepageSections, { section: "FAQs", status: "Editable", detail: "Question, answer, order and publish status" }].map((section) => (
          <CMSCard key={section.section} title={section.section} detail={section.detail} status={section.status} notify={notify} />
        ))}
      </div>
    </>
  );
}

function PoliciesView({ notify }: { notify: (message: string, kind?: ToastKind) => void }) {
  return (
    <>
      <AdminHeader eyebrow="Policies" title="Editable policy pages" body="Privacy, terms, refunds, shipping, food safety and allergen copy can be edited and previewed." />
      <div className="admin-two-col">
        {policies.map((policy) => (
          <CMSCard key={policy.slug} title={policy.title} detail={policy.summary} status="Draft / Published" body={policy.body.join("\n\n")} notify={notify} />
        ))}
      </div>
    </>
  );
}

function CustomersView({ notify }: { notify: (message: string, kind?: ToastKind) => void }) {
  return (
    <>
      <AdminHeader eyebrow="Customers" title="Customer accounts" body="Profile, order history, saved addresses, marketing preference and internal notes." />
      <div className="admin-two-col">
        {customers.map((customer) => (
          <article className="admin-card customer-card" key={customer.email}>
            <UserRound size={20} />
            <h2>{customer.name}</h2>
            <p>{customer.email}</p>
            <div className="detail-grid">
              <span>Orders <strong>{customer.orders}</strong></span>
              <span>Last order <strong>{customer.lastOrder}</strong></span>
              <span>Marketing <strong>Opted in</strong></span>
              <span>Tag <strong>{customer.orders > 1 ? "Repeat customer" : "New customer"}</strong></span>
            </div>
            <TextareaControl label="Customer notes" value="No internal notes yet." onChange={() => notify("Customer note saved")} />
          </article>
        ))}
      </div>
    </>
  );
}

function ReviewsView({ notify }: { notify: (message: string, kind?: ToastKind) => void }) {
  return (
    <>
      <AdminHeader eyebrow="Reviews" title="Review moderation" body="Approve, hide and respond to product reviews." />
      <div className="admin-two-col">
        {reviewsAdmin.map((review) => (
          <article className="admin-card" key={`${review.name}-${review.product}`}>
            <div className="admin-card-head">
              <div>
                <h2>{review.product}</h2>
                <p>{review.name} · {"★".repeat(review.rating)}</p>
              </div>
              <StatusBadge tone={review.status === "Published" ? "success" : "warning"}>{review.status}</StatusBadge>
            </div>
            <div className="row-actions text-actions">
              <button type="button" onClick={() => notify("Review approved")}>Approve</button>
              <button type="button" onClick={() => notify("Review hidden")}>Hide</button>
              <button type="button" onClick={() => notify("Reply draft opened")}>Reply</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function EnquiriesView({ notify }: { notify: (message: string, kind?: ToastKind) => void }) {
  return (
    <>
      <AdminHeader eyebrow="Enquiries" title="Customer enquiries" body="Manage contact form messages, wholesale interest and allergen questions." />
      <div className="admin-two-col">
        {enquiries.map((item) => (
          <article className="admin-card" key={`${item.email}-${item.topic}`}>
            <div className="admin-card-head">
              <div>
                <h2>{item.topic}</h2>
                <p>{item.name} · {item.email}</p>
              </div>
              <StatusBadge tone={item.status === "New" ? "warning" : "neutral"}>{item.status}</StatusBadge>
            </div>
            <TextareaControl label="Reply draft" value="Hi, thanks for contacting Safna..." onChange={() => notify("Reply autosaved")} />
            <div className="row-actions text-actions">
              <button type="button" onClick={() => notify("Reply email placeholder sent")}>
                <Mail size={15} /> Send reply
              </button>
              <button type="button" onClick={() => notify("Enquiry marked resolved")}>Resolve</button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

function SettingsView() {
  const checklist = [
    "Set STRIPE_SECRET_KEY in Vercel for live Stripe Checkout.",
    "Set NEXT_PUBLIC_SITE_URL=https://safna.co.uk before domain launch.",
    "Connect a production database for persistent admin edits, accounts, orders and policies.",
    "Connect authentication for protected admin login and customer accounts.",
    "Connect email sending for receipts, order updates and enquiry replies.",
  ];
  return (
    <>
      <AdminHeader eyebrow="Settings" title="Launch readiness" body="Production services, security and domain settings before Safna takes live orders." />
      <div className="admin-card">
        <div className="settings-list">
          {checklist.map((item) => (
            <span key={item}>
              <ShieldCheck size={17} /> {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}

function CMSCard({
  title,
  detail,
  status,
  body,
  notify,
}: {
  title: string;
  detail: string;
  status: string;
  body?: string;
  notify: (message: string, kind?: ToastKind) => void;
}) {
  return (
    <article className="admin-card cms-card">
      <div className="admin-card-head">
        <div>
          <h2>{title}</h2>
          <p>{detail}</p>
        </div>
        <StatusBadge tone="neutral">{status}</StatusBadge>
      </div>
      <div className="rich-editor">
        <div>
          <button type="button">B</button>
          <button type="button">I</button>
          <button type="button">Link</button>
          <button type="button">List</button>
        </div>
        <textarea defaultValue={body || detail} />
      </div>
      <div className="admin-form-grid">
        <InputControl label="SEO title" value={`${title} | Safna Products`} onChange={() => notify("SEO title saved")} />
        <InputControl label="Meta description" value={detail} onChange={() => notify("Meta description saved")} />
      </div>
      <div className="row-actions text-actions">
        <button type="button" onClick={() => notify(`${title} draft saved`)}>
          <Save size={15} /> Save draft
        </button>
        <button type="button" onClick={() => notify(`${title} preview opened`)}>
          <Eye size={15} /> Preview
        </button>
        <button type="button" onClick={() => notify(`${title} published`)}>
          <Upload size={15} /> Publish
        </button>
      </div>
      <small>Last edited today at 12:14</small>
    </article>
  );
}

function AdminHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="admin-page-head">
      <span>{eyebrow}</span>
      <h1>{title}</h1>
      <p>{body}</p>
    </div>
  );
}

function AdminList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="admin-card compact-list">
      <h2>{title}</h2>
      {items.map((item) => (
        <span key={item}>
          {item}
          <ChevronRight size={15} />
        </span>
      ))}
    </div>
  );
}

function EditorSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="editor-section">
      <h3>{title}</h3>
      <div>{children}</div>
    </section>
  );
}

function InputControl({
  label,
  value,
  type = "text",
  onChange,
}: {
  label: string;
  value: string | number;
  type?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <input type={type} value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function TextareaControl({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="admin-field">
      <span>{label}</span>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

function SelectControl({
  label,
  value,
  options,
  icon: Icon,
  onChange,
}: {
  label?: string;
  value: string;
  options: readonly string[];
  icon?: typeof Filter;
  onChange: (value: string) => void;
}) {
  return (
    <label className={label ? "admin-field" : "select-chip"}>
      {label ? <span>{label}</span> : Icon ? <Icon size={16} /> : null}
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function SwitchControl({
  label,
  checked,
  onChange,
  hideLabel = false,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
  hideLabel?: boolean;
}) {
  return (
    <label className="switch-control">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span />
      {hideLabel ? <small className="sr-only">{label}</small> : <strong>{label}</strong>}
    </label>
  );
}

function StatusBadge({ tone, children }: { tone: "success" | "warning" | "danger" | "neutral"; children: ReactNode }) {
  return <span className={`status-badge ${tone}`}>{children}</span>;
}

function Completeness({ product, large = false }: { product: AdminProduct; large?: boolean }) {
  const fields = [
    product.name,
    product.price > 0 ? String(product.price) : "",
    product.image,
    product.ingredients,
    product.allergens,
    product.storage,
    product.shelfLife,
    product.description,
  ];
  const complete = fields.filter(Boolean).length;
  const score = Math.round((complete / fields.length) * 100);
  const missing = [
    !product.image ? "image" : "",
    !product.ingredients ? "ingredients" : "",
    !product.allergens ? "allergens" : "",
    product.price <= 0 ? "price" : "",
  ].filter(Boolean);
  return (
    <div className={large ? "completeness large" : "completeness"}>
      <span>
        <strong>{score}%</strong>
        {large ? " complete" : ""}
      </span>
      <progress value={score} max={100} />
      {large ? <small>{missing.length ? `Missing: ${missing.join(", ")}` : "Ready to publish"}</small> : null}
    </div>
  );
}
