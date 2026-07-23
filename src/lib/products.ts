export type Product = {
  id: string;
  slug: string;
  name: string;
  category: "Sauces" | "Drinks" | "Sets" | "Seasonings" | "Pantry";
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
  shopifyProductId?: string;
  shopifyVariantId?: string;
  comingSoon?: boolean;
};

const pendingFoodInfo = {
  dietary: "Details to be confirmed",
  ingredients: "Ingredients will be confirmed from the final product label.",
  allergens: "Allergen information will be confirmed from the final product label.",
  storage: "Storage instructions will be confirmed from the final product label.",
  shelfLife: "Best-before and shelf-life details will be confirmed before launch.",
  extraWording: "Price and ordering details will be announced soon.",
};

export const products: Product[] = [
  {
    id: "safna-sauce-xxhot",
    slug: "safna-sauce-xxhot",
    name: "Safna Sauce XXHot",
    category: "Sauces",
    price: 0,
    description: "A bold Safna chilli sauce for customers who want proper heat with everyday meals.",
    longDescription:
      "Safna Sauce XXHot is one of the first real Safna products being prepared for online ordering. Final price, size, ingredients, allergens and delivery details will be confirmed before checkout goes live.",
    badge: "XXHot sauce",
    colour: "#f05a28",
    size: "Bottle",
    stock: 0,
    heatLevel: "Hot",
    image: "/products/safna-sauce-xxhot.jpg",
    status: "Published",
    visibility: "Public",
    featured: true,
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "safna-bbq-sauce",
    slug: "safna-bbq-sauce",
    name: "Safna BBQ Sauce",
    category: "Sauces",
    price: 0,
    description: "A rich BBQ-style Safna sauce for grills, marinades, dipping and family meals.",
    longDescription:
      "Safna BBQ Sauce is part of the first product range being announced on the Safna online shop. Final label information and ordering details will be added before live sales.",
    badge: "BBQ sauce",
    colour: "#b63a24",
    size: "Bottle",
    stock: 0,
    heatLevel: "Medium",
    image: "/products/safna-bbq-sauce.jpg",
    status: "Published",
    visibility: "Public",
    featured: true,
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "safna-kaba",
    slug: "safna-kaba",
    name: "Safna Kaba",
    category: "Sauces",
    price: 0,
    description: "A savoury Safna kitchen sauce photographed from the client's first real product range.",
    longDescription:
      "Safna Kaba is a real Safna product from the client photography set. Full food information, price and availability will be published once confirmed.",
    badge: "Kitchen sauce",
    colour: "#d26a1c",
    size: "Bottle",
    stock: 0,
    heatLevel: "Medium",
    image: "/products/safna-kaba.jpg",
    status: "Published",
    visibility: "Public",
    featured: true,
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "safna-mango-lassi",
    slug: "safna-mango-lassi",
    name: "Safna Mango Lassi",
    category: "Drinks",
    price: 0,
    description: "A bright mango lassi drink from the Safna range, made for chilled refreshment.",
    longDescription:
      "Safna Mango Lassi is one of the first drinks in the Safna product photography. Final ingredients, allergens, storage and pricing will be added before orders open.",
    badge: "Mango lassi",
    colour: "#f2a51a",
    size: "Bottle",
    stock: 0,
    heatLevel: "No heat",
    image: "/products/safna-mango-lassi.jpg",
    status: "Published",
    visibility: "Public",
    featured: true,
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "safna-thiakry-yoghurt",
    slug: "safna-thiakry-yoghurt",
    name: "Safna Thiakry Yoghurt",
    category: "Drinks",
    price: 0,
    description: "A creamy Safna yoghurt drink photographed from the client's prepared product range.",
    longDescription:
      "Safna Thiakry Yoghurt is being announced as part of the Safna drinks range. Confirmed food-label details will be added before the product is sold online.",
    badge: "Yoghurt drink",
    colour: "#f6f2df",
    size: "Bottle",
    stock: 0,
    heatLevel: "No heat",
    image: "/products/safna-thiakry-yoghurt.jpg",
    status: "Published",
    visibility: "Public",
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "eazy-kitchen-baobab-smoothie",
    slug: "eazy-kitchen-baobab-smoothie",
    name: "Eazy Kitchen Baobab Smoothie",
    category: "Drinks",
    price: 0,
    description: "A Baobab Smoothie drink shown in the client product photography for the Safna launch range.",
    longDescription:
      "Eazy Kitchen Baobab Smoothie appears in the Safna client photography and is being prepared for the product catalogue. Final product ownership, label wording and sales details should be confirmed before launch.",
    badge: "Baobab smoothie",
    colour: "#ead6b4",
    size: "Bottle",
    stock: 0,
    heatLevel: "No heat",
    image: "/brand/safna-kaba-thiakry-lifestyle.jpg",
    status: "Published",
    visibility: "Public",
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "safna-sorrel-juice",
    slug: "safna-sorrel-juice",
    name: "Safna Sorrel Juice",
    category: "Drinks",
    price: 0,
    description: "A deep red sorrel juice drink from the Safna bottled drinks range.",
    longDescription:
      "Safna Sorrel Juice is shown in the client's product photography and will be added for ordering once final food details and pricing are confirmed.",
    badge: "Sorrel juice",
    colour: "#5c1420",
    size: "Bottle",
    stock: 0,
    heatLevel: "No heat",
    image: "/products/safna-sorrel-juice.jpg",
    status: "Published",
    visibility: "Public",
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "safna-ginger-juice",
    slug: "safna-ginger-juice",
    name: "Safna Ginger Juice",
    category: "Drinks",
    price: 0,
    description: "A ginger juice drink from the Safna bottled drinks range.",
    longDescription:
      "Safna Ginger Juice is part of the photographed Safna drinks lineup. Full product details will be confirmed before the store accepts orders.",
    badge: "Ginger juice",
    colour: "#d89b4a",
    size: "Bottle",
    stock: 0,
    heatLevel: "No heat",
    image: "/products/safna-ginger-juice.jpg",
    status: "Published",
    visibility: "Public",
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "safna-ditakh-juice",
    slug: "safna-ditakh-juice",
    name: "Safna Ditakh Juice",
    category: "Drinks",
    price: 0,
    description: "A green ditakh juice drink from the Safna bottled drinks range.",
    longDescription:
      "Safna Ditakh Juice is part of the photographed Safna drinks lineup. Pricing, ingredients, allergens and delivery details will be confirmed before orders go live.",
    badge: "Ditakh juice",
    colour: "#87924c",
    size: "Bottle",
    stock: 0,
    heatLevel: "No heat",
    image: "/products/safna-ditakh-juice.jpg",
    status: "Published",
    visibility: "Public",
    comingSoon: true,
    ...pendingFoodInfo,
  },
  {
    id: "safna-launch-lineup",
    slug: "safna-launch-lineup",
    name: "Safna Launch Lineup",
    category: "Sets",
    price: 0,
    description: "A first look at the Safna launch range across sauces, juices, lassi and yoghurt drinks.",
    longDescription:
      "Safna Launch Lineup introduces the full photographed range. Individual products can be announced now and converted to live Shopify products once final product data is approved.",
    badge: "Launch range",
    colour: "#ffdc3d",
    size: "Product lineup",
    stock: 0,
    heatLevel: "No heat",
    dietary: "Details vary by product",
    ingredients: "Bundle contents vary by product. See individual product labels when available.",
    allergens: "Allergens vary by product and will be confirmed from individual labels.",
    storage: "Storage varies by product and will be confirmed before launch.",
    shelfLife: "Best-before details follow individual product labels.",
    extraWording: "Individual product prices and availability will be announced soon.",
    image: "/brand/safna-drinks-lineup-wide.jpg",
    status: "Published",
    visibility: "Public",
    isBundle: true,
    comingSoon: true,
  },
];

export const categories = ["Sauces", "Drinks", "Sets", "Seasonings", "Pantry"] as const;

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
