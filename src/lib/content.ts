import { ShoppingBag, Truck, ShieldCheck, Star, Users, BarChart3 } from "lucide-react";

export const site = {
  name: "Safna Products",
  shortName: "Safna",
  email: "ebou@eazykitchen.co.uk",
  phone: "Not provided",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://safna.co.uk",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
};

export const navItems = [
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const featureCards = [
  {
    icon: ShoppingBag,
    title: "Built to sell food products",
    body: "Sauces, seasonings, pantry items, and bundles are structured with prices, sizes, heat levels, and product notes.",
  },
  {
    icon: Truck,
    title: "Fulfilment ready",
    body: "Shipping, collection, local delivery, allergy notes, and order messages are separated for quick setup once confirmed.",
  },
  {
    icon: ShieldCheck,
    title: "Food trust signals",
    body: "Product details, storage guidance, allergen placeholders, reviews, FAQs, and returns prompts support confident buying.",
  },
  {
    icon: BarChart3,
    title: "Marketing friendly",
    body: "SEO metadata, blog routes, analytics hooks, product storytelling, and clear conversion calls to action are prepared.",
  },
];

export const reviews = [
  {
    name: "Amina",
    quote: "The sauces bring proper flavour to quick dinners, and the shop makes choosing easy.",
    rating: 5,
  },
  {
    name: "Karim",
    quote: "The seasoning blends are the kind of thing you reach for every week.",
    rating: 5,
  },
  {
    name: "Leah",
    quote: "Bright brand, clear product cards, and a simple buying journey.",
    rating: 5,
  },
];

export const blogPosts = [
  {
    slug: "how-to-use-safna-sauces",
    title: "How to Use Safna Sauces",
    excerpt: "Simple serving ideas for grilled food, rice bowls, wraps, marinades, and quick weeknight meals.",
    date: "2026-07-09",
  },
  {
    slug: "seasoning-guide",
    title: "A Quick Seasoning Guide",
    excerpt: "How to use all-purpose blends, grill spices, and pantry bases without overcomplicating dinner.",
    date: "2026-07-09",
  },
  {
    slug: "build-a-safna-gift-box",
    title: "Build a Safna Gift Box",
    excerpt: "Ideas for turning sauces, seasonings, and pantry products into a simple food gift.",
    date: "2026-07-09",
  },
];

export const faqs = [
  {
    question: "Can customers pay online?",
    answer:
      "The site is payment-ready. Stripe, Shopify, PayPal, or another provider can be connected once Safna confirms the preferred ecommerce workflow.",
  },
  {
    question: "Does Safna offer delivery, collection, or postal shipping?",
    answer:
      "Delivery, collection, and postal shipping messaging is prepared, but exact zones, fees, cut-off times, packaging, and tax/VAT rules need final confirmation.",
  },
  {
    question: "Can sauces, seasonings, and bundles be edited?",
    answer:
      "Yes. Launch products live in one editable data file today, and the structure is ready to move into a CMS, Shopify, or database later.",
  },
  {
    question: "Where will allergen and storage information go?",
    answer:
      "The product structure includes space for dietary and product notes. Final ingredients, allergens, best-before dates, and storage instructions must come from Safna before live sales.",
  },
  {
    question: "Is there an admin dashboard?",
    answer:
      "A polished admin-readiness page is included. A real dashboard can be wired to the chosen platform for products, orders, customers, reviews, and blog posts.",
  },
];

export const adminModules = [
  "Products and pricing",
  "Orders and fulfilment",
  "Customer accounts",
  "Reviews and testimonials",
  "Blog and SEO content",
  "Analytics and conversion tracking",
];

export const trustStats = [
  { label: "Launch pages", value: "10+" },
  { label: "Product categories", value: "4" },
  { label: "Review rating", value: "5.0" },
  { label: "Checkout status", value: "Ready" },
];

export const audienceCards = [
  {
    icon: Star,
    title: "Sauces, seasonings, and bundles",
    body: "Clear product cards with category, price, size, heat level, dietary note, and quick add-to-cart actions.",
  },
  {
    icon: Users,
    title: "Customer account path",
    body: "Account route prepared for login, order history, saved addresses, and preferences.",
  },
];
