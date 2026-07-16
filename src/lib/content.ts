export const site = {
  name: "Safna Products",
  shortName: "Safna",
  email: "ebou@eazykitchen.co.uk",
  phone: "Not provided",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://safna.co.uk",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
};

export const navItems = [
  { href: "/products?category=Bundles", label: "Safna Sets" },
  { href: "/products", label: "Shop All" },
  { href: "/blog", label: "Recipes" },
  { href: "/about", label: "Our Story" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export type PublishStatus = "Draft" | "Published";

export const storefrontTiles = [
  {
    label: "Safna Sets",
    href: "/products?category=Bundles",
    description: "Bundles, gift boxes and future multi-product collections.",
    status: "Published" as PublishStatus,
  },
  {
    label: "Shop All",
    href: "/products",
    description: "The full public catalogue once products are approved.",
    status: "Published" as PublishStatus,
  },
  {
    label: "Recipes",
    href: "/blog",
    description: "Recipe ideas, serving inspiration and product education.",
    status: "Published" as PublishStatus,
  },
];

export const promoCampaigns = [
  {
    id: "launch-list",
    title: "Join the Safna launch list",
    body: "Be first to hear when the first product collection, delivery options and recipes go live.",
    placement: "Homepage popup and launch sections",
    status: "Published" as PublishStatus,
  },
  {
    id: "recipe-book",
    title: "Free recipe e-book",
    body: "Prepared as a future campaign once Safna has approved recipe content and product photos.",
    placement: "Recipe pages and checkout drawer",
    status: "Draft" as PublishStatus,
  },
];

export const reviews: { name: string; quote: string; rating: number }[] = [];

export const blogPosts: { slug: string; title: string; excerpt: string; date: string; status?: PublishStatus }[] = [];

export const faqs = [
  {
    question: "When will Safna products be available to buy?",
    answer:
      "Safna's first public collection is being prepared. The store will show products only after the business has confirmed and published the final details.",
  },
  {
    question: "Why are there no products showing yet?",
    answer:
      "Unconfirmed products, prices, ingredients, allergens, reviews and delivery details are kept out of the customer website until they are approved in the admin backend.",
  },
  {
    question: "Can I join a launch list?",
    answer:
      "Yes. Use the contact form to register interest until the newsletter provider is connected.",
  },
  {
    question: "Where will allergen and storage information appear?",
    answer:
      "Each published food product page will show completed ingredients, allergens, storage, shelf-life and dietary information. Blank or draft fields are hidden from customers.",
  },
];
