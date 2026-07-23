export const site = {
  name: "Safna Products",
  shortName: "Safna",
  email: "ebou@eazykitchen.co.uk",
  phone: "Not provided",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://safna.co.uk",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
};

export const navItems = [
  { href: "/products?category=Sets", label: "Safna Sets" },
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
    href: "/products?category=Sets",
    description: "Launch lineups, gift ideas and multi-product collections.",
    status: "Published" as PublishStatus,
  },
  {
    label: "Shop All",
    href: "/products",
    description: "Browse sauces, drinks, sets and more.",
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
    title: "Get Safna product updates",
    body: "Be first to hear about new products, recipes, offers and ordering updates from Safna.",
    placement: "Homepage popup and launch sections",
    status: "Published" as PublishStatus,
  },
  {
    id: "recipe-book",
    title: "Free recipe e-book",
    body: "Recipe ideas and serving inspiration for sauces, seasonings and family meals.",
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
      "Safna is preparing online ordering for sauces, seasonings, bundles and pantry products. Contact Safna for the latest availability.",
  },
  {
    question: "Why are some products not showing yet?",
    answer:
      "Some products are still being finalised. New items will be added as soon as they are ready for customers to browse and order.",
  },
  {
    question: "Can I get product updates?",
    answer:
      "Yes. Use the contact form to register your interest in product news, offers and ordering updates.",
  },
  {
    question: "Where will allergen and storage information appear?",
    answer:
      "Each product page is set up to show ingredients, allergens, storage, shelf-life and dietary information where relevant.",
  },
];
