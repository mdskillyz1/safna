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

export const reviews: { name: string; quote: string; rating: number }[] = [];

export const blogPosts: { slug: string; title: string; excerpt: string; date: string; status?: "Draft" | "Published" }[] = [];

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
