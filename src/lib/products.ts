export type Product = {
  id: string;
  name: string;
  category: "Sauces" | "Seasonings" | "Bundles" | "Pantry";
  price: number;
  description: string;
  badge: string;
  colour: string;
  size: string;
  heatLevel: "Mild" | "Medium" | "Hot" | "No heat";
  dietary: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "signature-hot-sauce",
    name: "Signature Hot Sauce",
    category: "Sauces",
    price: 6.99,
    description: "A bright chilli sauce for grilled food, rice dishes, wraps, marinades, and everyday table heat.",
    badge: "Hero sauce",
    colour: "#ef3f35",
    size: "150ml bottle",
    heatLevel: "Hot",
    dietary: "Vegan friendly",
    featured: true,
  },
  {
    id: "green-herb-sauce",
    name: "Green Herb Sauce",
    category: "Sauces",
    price: 6.49,
    description: "Fresh herb flavour with citrus lift, made for chicken, fish, roasted vegetables, and dipping.",
    badge: "Fresh finish",
    colour: "#1f8d4d",
    size: "150ml bottle",
    heatLevel: "Medium",
    dietary: "Vegan friendly",
    featured: true,
  },
  {
    id: "mild-family-sauce",
    name: "Mild Family Sauce",
    category: "Sauces",
    price: 5.99,
    description: "A smooth, lower-heat sauce designed for family meals, sandwiches, chips, and quick cooking.",
    badge: "Family pick",
    colour: "#ffdc3d",
    size: "150ml bottle",
    heatLevel: "Mild",
    dietary: "No artificial colours",
    featured: true,
  },
  {
    id: "all-purpose-seasoning",
    name: "All-Purpose Seasoning",
    category: "Seasonings",
    price: 4.99,
    description: "A balanced everyday blend for meat, vegetables, stews, sauces, rice, and tray-bake meals.",
    badge: "Kitchen staple",
    colour: "#2f318b",
    size: "80g pouch",
    heatLevel: "Mild",
    dietary: "Small-batch blend",
    featured: true,
  },
  {
    id: "suya-style-spice",
    name: "Suya-Style Spice",
    category: "Seasonings",
    price: 5.49,
    description: "A bold roasted spice blend for skewers, grilled meats, mushrooms, roasted veg, and fries.",
    badge: "Grill night",
    colour: "#d97706",
    size: "80g pouch",
    heatLevel: "Medium",
    dietary: "Peanut-free recipe TBC",
  },
  {
    id: "safna-starter-box",
    name: "Safna Starter Box",
    category: "Bundles",
    price: 19.99,
    description: "A simple introduction to Safna with two sauces and one seasoning for everyday cooking.",
    badge: "Best seller",
    colour: "#a7f3c2",
    size: "3 products",
    heatLevel: "Medium",
    dietary: "Gift-ready",
  },
  {
    id: "sauce-lovers-box",
    name: "Sauce Lovers Box",
    category: "Bundles",
    price: 24.99,
    description: "Three Safna sauces for people who want a full range of heat, herbs, and dipping flavour.",
    badge: "Great gift",
    colour: "#ff6b4a",
    size: "3 bottles",
    heatLevel: "Hot",
    dietary: "Mix of heat levels",
  },
  {
    id: "marinade-base",
    name: "Marinade Base",
    category: "Pantry",
    price: 7.99,
    description: "A concentrated cooking base for quick marinades, stews, sauces, and batch cooking.",
    badge: "Coming soon",
    colour: "#101713",
    size: "220g jar",
    heatLevel: "Medium",
    dietary: "Recipe TBC",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
