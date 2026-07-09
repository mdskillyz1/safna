export type Product = {
  id: string;
  name: string;
  category: "Fresh Produce" | "Bundles" | "Pantry";
  price: number;
  description: string;
  badge: string;
  colour: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    id: "market-veg-box",
    name: "Market Veg Box",
    category: "Bundles",
    price: 18,
    description: "A colourful weekly selection of everyday vegetables for home cooking.",
    badge: "Best seller",
    colour: "#a7f3c2",
    featured: true,
  },
  {
    id: "pepper-mix",
    name: "Pepper Mix",
    category: "Fresh Produce",
    price: 6.5,
    description: "Red, yellow, and green peppers packed for salads, sauces, and stews.",
    badge: "Bright pick",
    colour: "#ffd84d",
    featured: true,
  },
  {
    id: "tomato-bowl",
    name: "Tomato Bowl",
    category: "Fresh Produce",
    price: 5.25,
    description: "Ripe tomatoes selected for cooking, sandwiches, and fresh chopping.",
    badge: "Fresh daily",
    colour: "#ff6b4a",
    featured: true,
  },
  {
    id: "green-leaf-pack",
    name: "Green Leaf Pack",
    category: "Fresh Produce",
    price: 4.75,
    description: "Leafy greens for family meals, smoothies, sides, and quick lunches.",
    badge: "New",
    colour: "#6fd35f",
  },
  {
    id: "safna-sauce-starter",
    name: "Sauce Starter Bundle",
    category: "Bundles",
    price: 14,
    description: "Tomatoes, peppers, onion, herbs, and chillies for flavour-packed sauces.",
    badge: "Meal prep",
    colour: "#2f318b",
  },
  {
    id: "pantry-herb-kit",
    name: "Pantry Herb Kit",
    category: "Pantry",
    price: 8,
    description: "A simple herb and spice kit to support everyday Safna-style cooking.",
    badge: "Coming soon",
    colour: "#101713",
  },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
