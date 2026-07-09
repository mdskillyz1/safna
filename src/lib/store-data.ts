export type OrderStatus = "Pending" | "Paid" | "Packing" | "Dispatched" | "Completed" | "Refunded";

export const orders = [
  {
    id: "SF-1001",
    customer: "Amina Yusuf",
    email: "amina@example.com",
    total: 24.97,
    status: "Packing" as OrderStatus,
    items: "Signature Hot Sauce, Green Herb Sauce, All-Purpose Seasoning",
    date: "2026-07-09",
  },
  {
    id: "SF-1002",
    customer: "Karim Ali",
    email: "karim@example.com",
    total: 19.99,
    status: "Pending" as OrderStatus,
    items: "Safna Starter Box",
    date: "2026-07-09",
  },
  {
    id: "SF-1003",
    customer: "Leah Morgan",
    email: "leah@example.com",
    total: 11.98,
    status: "Completed" as OrderStatus,
    items: "Mild Family Sauce x2",
    date: "2026-07-08",
  },
];

export const customers = [
  { name: "Amina Yusuf", email: "amina@example.com", orders: 3, lastOrder: "2026-07-09" },
  { name: "Karim Ali", email: "karim@example.com", orders: 1, lastOrder: "2026-07-09" },
  { name: "Leah Morgan", email: "leah@example.com", orders: 2, lastOrder: "2026-07-08" },
];

export const enquiries = [
  { name: "Wholesale enquiry", email: "buyer@example.com", topic: "Stockist request", status: "New" },
  { name: "Delivery question", email: "customer@example.com", topic: "UK shipping", status: "Open" },
  { name: "Allergen request", email: "parent@example.com", topic: "Ingredients", status: "Open" },
];

export const reviewsAdmin = [
  { name: "Amina", product: "Signature Hot Sauce", rating: 5, status: "Published" },
  { name: "Karim", product: "All-Purpose Seasoning", rating: 5, status: "Pending" },
  { name: "Leah", product: "Safna Starter Box", rating: 5, status: "Published" },
];

export const deliverySettings = {
  zones: "United Kingdom only",
  standardFee: 3.99,
  freeDeliveryThreshold: 35,
  cutOffTime: "Orders before 12:00 are prepared next working day",
  notes: "Delivery partner and final shipping rates to be confirmed.",
  packaging: "Use sealed, food-safe packaging suitable for jars, bottles, pouches, and gift boxes.",
  handling: "Temperature-sensitive handling can be added if future products require it.",
};

export const homepageSections = [
  { section: "Hero", status: "Editable", detail: "Headline, intro copy, CTA, logo/hero image" },
  { section: "Featured products", status: "Editable", detail: "Controlled by product featured toggle" },
  { section: "Trust section", status: "Editable", detail: "Delivery, food safety, reviews, marketing copy" },
  { section: "Blog/content", status: "Editable", detail: "Recipe, product education, and launch posts" },
];
