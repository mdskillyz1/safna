export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Sauces" | "Seasonings" | "Bundles" | "Pantry";
  price: number;
  salePrice?: number;
  description: string;
  longDescription: string;
  badge: string;
  colour: string;
  size: string;
  stock: number;
  heatLevel: "Mild" | "Medium" | "Hot" | "No heat";
  dietary: string;
  ingredients: string;
  allergens: string;
  storage: string;
  shelfLife: string;
  extraWording: string;
  image: string;
  status: "Draft" | "Published";
  visibility: "Public" | "Hidden";
  isBundle?: boolean;
  featured?: boolean;
  demoOnly?: boolean;
};

export const products: Product[] = [
  {
    id: "signature-hot-sauce",
    slug: "signature-hot-sauce",
    name: "Signature Hot Sauce",
    category: "Sauces",
    price: 6.99,
    salePrice: 5.99,
    description: "A bright chilli sauce for grilled food, rice dishes, wraps, marinades, and everyday table heat.",
    longDescription:
      "Safna Signature Hot Sauce is positioned as the bold hero product for customers who want a punchy table sauce and a cooking shortcut in one bottle.",
    badge: "Hero sauce",
    colour: "#ef3f35",
    size: "150ml bottle",
    stock: 42,
    heatLevel: "Hot",
    dietary: "Vegan friendly",
    ingredients: "Red chilli, tomato, onion, garlic, vinegar, lemon and spices.",
    allergens: "See product label for the latest allergen information.",
    storage: "Store in a cool dry place. Refrigerate after opening and use within the stated period.",
    shelfLife: "See bottle for best-before date.",
    extraWording: "Shake well before use. Natural separation may occur.",
    image: "/safna-logo.jpg",
    status: "Published",
    visibility: "Public",
    featured: true,
    demoOnly: true,
  },
  {
    id: "green-herb-sauce",
    slug: "green-herb-sauce",
    name: "Green Herb Sauce",
    category: "Sauces",
    price: 6.49,
    description: "Fresh herb flavour with citrus lift, made for chicken, fish, roasted vegetables, and dipping.",
    longDescription:
      "A fresh green sauce concept for customers who want a lighter Safna flavour profile across grilled food, salads, wraps, and sides.",
    badge: "Fresh finish",
    colour: "#1f8d4d",
    size: "150ml bottle",
    stock: 28,
    heatLevel: "Medium",
    dietary: "Vegan friendly",
    ingredients: "Green herbs, chilli, citrus, garlic, vinegar and seasoning.",
    allergens: "See product label for the latest allergen information.",
    storage: "Store chilled once opened. Keep sealed when not in use.",
    shelfLife: "See bottle for best-before date.",
    extraWording: "Ideal as a dip, dressing, marinade, or finishing sauce.",
    image: "/safna-logo.jpg",
    status: "Published",
    visibility: "Public",
    featured: true,
    demoOnly: true,
  },
  {
    id: "mild-family-sauce",
    slug: "mild-family-sauce",
    name: "Mild Family Sauce",
    category: "Sauces",
    price: 5.99,
    description: "A smooth, lower-heat sauce designed for family meals, sandwiches, chips, and quick cooking.",
    longDescription:
      "A gentler Safna sauce for everyday tables, designed to help the range appeal to households that want flavour without heavy heat.",
    badge: "Family pick",
    colour: "#ffdc3d",
    size: "150ml bottle",
    stock: 56,
    heatLevel: "Mild",
    dietary: "No artificial colours",
    ingredients: "Tomato, pepper, onion, vinegar and spices.",
    allergens: "See product label for the latest allergen information.",
    storage: "Store in a cool dry place. Refrigerate after opening.",
    shelfLife: "See bottle for best-before date.",
    extraWording: "Made for family meals, dipping, and quick cooking.",
    image: "/safna-logo.jpg",
    status: "Published",
    visibility: "Public",
    featured: true,
    demoOnly: true,
  },
  {
    id: "all-purpose-seasoning",
    slug: "all-purpose-seasoning",
    name: "All-Purpose Seasoning",
    category: "Seasonings",
    price: 4.99,
    description: "A balanced everyday blend for meat, vegetables, stews, sauces, rice, and tray-bake meals.",
    longDescription:
      "The everyday seasoning blend in the Safna range, built as an easy repeat-purchase item for home cooks.",
    badge: "Kitchen staple",
    colour: "#2f318b",
    size: "80g pouch",
    stock: 18,
    heatLevel: "Mild",
    dietary: "Small-batch blend",
    ingredients: "Salt, herbs, spices, garlic, onion and paprika.",
    allergens: "See product label for the latest allergen information.",
    storage: "Keep sealed in a cool dry cupboard away from direct sunlight.",
    shelfLife: "See pack for best-before date.",
    extraWording: "Use as a dry rub or add during cooking.",
    image: "/safna-logo.jpg",
    status: "Published",
    visibility: "Public",
    featured: true,
    demoOnly: true,
  },
  {
    id: "suya-style-spice",
    slug: "suya-style-spice",
    name: "Suya-Style Spice",
    category: "Seasonings",
    price: 5.49,
    description: "A bold roasted spice blend for skewers, grilled meats, mushrooms, roasted veg, and fries.",
    longDescription:
      "A grill-friendly seasoning concept that gives Safna space to expand into bolder spice blends and BBQ-style products.",
    badge: "Grill night",
    colour: "#d97706",
    size: "80g pouch",
    stock: 8,
    heatLevel: "Medium",
    dietary: "Bold spice blend",
    ingredients: "Roasted spice blend, chilli, ginger, garlic and smoked paprika.",
    allergens: "See product label for the latest allergen information.",
    storage: "Keep sealed in a cool dry cupboard.",
    shelfLife: "See pack for best-before date.",
    extraWording: "Use for grilling, roasting, or seasoning chips and sides.",
    image: "/safna-logo.jpg",
    status: "Draft",
    visibility: "Hidden",
    demoOnly: true,
  },
  {
    id: "safna-starter-box",
    slug: "safna-starter-box",
    name: "Safna Starter Box",
    category: "Bundles",
    price: 19.99,
    description: "A simple introduction to Safna with two sauces and one seasoning for everyday cooking.",
    longDescription:
      "A starter bundle designed for first-time customers and gifting.",
    badge: "Best seller",
    colour: "#a7f3c2",
    size: "3 products",
    stock: 15,
    heatLevel: "Medium",
    dietary: "Gift-ready",
    ingredients: "Bundle contains multiple products. See individual product labels for ingredients and allergens.",
    allergens: "Allergens vary by product. See individual product labels.",
    storage: "Store according to each product label.",
    shelfLife: "Best-before date follows the shortest-dated product in the bundle.",
    extraWording: "Bundle contents may vary by availability.",
    image: "/safna-logo.jpg",
    status: "Published",
    visibility: "Public",
    isBundle: true,
    demoOnly: true,
  },
  {
    id: "sauce-lovers-box",
    slug: "sauce-lovers-box",
    name: "Sauce Lovers Box",
    category: "Bundles",
    price: 24.99,
    description: "Three Safna sauces for people who want a full range of heat, herbs, and dipping flavour.",
    longDescription:
      "A gift-box style product for customers who want a complete sauce selection. Ideal for seasonal campaigns and repeat gifting.",
    badge: "Great gift",
    colour: "#ff6b4a",
    size: "3 bottles",
    stock: 10,
    heatLevel: "Hot",
    dietary: "Mix of heat levels",
    ingredients: "Bundle contains multiple sauces. See individual product labels for ingredients and allergens.",
    allergens: "Allergens vary by product. See individual product labels.",
    storage: "Store according to each product label.",
    shelfLife: "Best-before date follows the shortest-dated product in the box.",
    extraWording: "Gift packaging may vary by availability.",
    image: "/safna-logo.jpg",
    status: "Published",
    visibility: "Public",
    isBundle: true,
    demoOnly: true,
  },
  {
    id: "marinade-base",
    slug: "marinade-base",
    name: "Marinade Base",
    category: "Pantry",
    price: 7.99,
    description: "A concentrated cooking base for quick marinades, stews, sauces, and batch cooking.",
    longDescription:
      "A pantry product concept for customers who want Safna flavour as a cooking base, not only a finishing sauce.",
    badge: "Coming soon",
    colour: "#101713",
    size: "220g jar",
    stock: 0,
    heatLevel: "Medium",
    dietary: "Cooking base",
    ingredients: "Tomato, pepper, onion, oil and spices.",
    allergens: "See product label for the latest allergen information.",
    storage: "Store according to the product label.",
    shelfLife: "See pack for best-before date.",
    extraWording: "Coming soon product. Not available for live purchase yet.",
    image: "/safna-logo.jpg",
    status: "Draft",
    visibility: "Hidden",
    demoOnly: true,
  },
];

export const categories = ["Sauces", "Seasonings", "Bundles", "Pantry"] as const;

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);

export const getProductById = (id: string) => products.find((product) => product.id === id);

const allowDemoStorefront = process.env.NEXT_PUBLIC_DEMO_STOREFRONT === "true";

export const getPublicProducts = () =>
  products.filter(
    (product) =>
      product.status === "Published" &&
      product.visibility === "Public" &&
      (!product.demoOnly || allowDemoStorefront),
  );

export const getPublicProductBySlug = (slug: string) =>
  getPublicProducts().find((product) => product.slug === slug);

export const getPublicProductById = (id: string) => getPublicProducts().find((product) => product.id === id);

export const getStockLabel = (stock: number) => {
  if (stock <= 0) return "Out of stock";
  if (stock <= 10) return "Low stock";
  return "In stock";
};
