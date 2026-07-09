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
    title: "Simple online ordering",
    body: "Browse products, build a basket, and move customers toward checkout with fewer clicks.",
  },
  {
    icon: Truck,
    title: "Delivery ready",
    body: "Shipping, collection, zones, and order notes are separated for quick setup once confirmed.",
  },
  {
    icon: ShieldCheck,
    title: "Trust built in",
    body: "Privacy, FAQs, reviews, returns prompts, and clear product information support confident buying.",
  },
  {
    icon: BarChart3,
    title: "Marketing friendly",
    body: "SEO metadata, blog routes, analytics hooks, and conversion calls to action are prepared.",
  },
];

export const reviews = [
  {
    name: "Amina",
    quote: "Fresh, colourful produce and an ordering experience that feels quick and clear.",
    rating: 5,
  },
  {
    name: "Karim",
    quote: "The bundles make weekly shopping easy. I can see what I need without hunting.",
    rating: 5,
  },
  {
    name: "Leah",
    quote: "Bright brand, simple products, and useful guidance for cooking at home.",
    rating: 5,
  },
];

export const blogPosts = [
  {
    slug: "how-to-build-a-weekly-veg-box",
    title: "How to Build a Weekly Veg Box",
    excerpt: "A practical guide to balancing staples, greens, peppers, tomatoes, herbs, and seasonal picks.",
    date: "2026-07-09",
  },
  {
    slug: "fresh-produce-storage-tips",
    title: "Fresh Produce Storage Tips",
    excerpt: "Simple ways to keep tomatoes, peppers, herbs, and leafy greens fresher for longer.",
    date: "2026-07-09",
  },
  {
    slug: "easy-sauce-night",
    title: "Easy Sauce Night",
    excerpt: "A quick family meal idea using Safna vegetables, chillies, tomatoes, and pantry herbs.",
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
    question: "Does Safna offer delivery or collection?",
    answer:
      "Delivery and collection messaging is prepared, but exact zones, fees, cut-off times, and tax/VAT rules need final confirmation.",
  },
  {
    question: "Can products be edited?",
    answer:
      "Yes. Launch products live in one editable data file today, and the structure is ready to move into a CMS, Shopify, or database later.",
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
  { label: "Product categories", value: "3" },
  { label: "Review rating", value: "5.0" },
  { label: "Checkout status", value: "Ready" },
];

export const audienceCards = [
  {
    icon: Star,
    title: "Fresh everyday products",
    body: "Clear product cards with category, price, badge, and quick add-to-cart actions.",
  },
  {
    icon: Users,
    title: "Customer account path",
    body: "Account route prepared for login, order history, saved addresses, and preferences.",
  },
];
