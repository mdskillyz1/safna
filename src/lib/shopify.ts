import type { Product } from "@/lib/products";

const shopifyApiVersion = process.env.SHOPIFY_API_VERSION || "2026-07";
const shopifyDomain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

type ShopifyMoney = {
  amount: string;
};

type ShopifyMetafield = {
  value: string;
} | null;

type ShopifyProductNode = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml?: string;
  productType?: string;
  tags: string[];
  featuredImage?: {
    url: string;
    altText: string | null;
  } | null;
  collections: {
    nodes: Array<{ title: string }>;
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange: {
    minVariantPrice: ShopifyMoney;
  };
  variants: {
    nodes: Array<{
      id: string;
      title: string;
      availableForSale: boolean;
      quantityAvailable: number | null;
      price: ShopifyMoney;
      compareAtPrice?: ShopifyMoney | null;
      selectedOptions: Array<{ name: string; value: string }>;
      image?: {
        url: string;
        altText: string | null;
      } | null;
    }>;
  };
  ingredients: ShopifyMetafield;
  allergens: ShopifyMetafield;
  storage: ShopifyMetafield;
  shelfLife: ShopifyMetafield;
  dietary: ShopifyMetafield;
  size: ShopifyMetafield;
  extraWording: ShopifyMetafield;
  heatLevel: ShopifyMetafield;
  badge: ShopifyMetafield;
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: Array<{ message: string }>;
};

type CartCreateResponse = {
  cartCreate: {
    cart?: {
      checkoutUrl: string;
    } | null;
    userErrors: Array<{ field?: string[]; message: string }>;
  };
};

export type ShopifyCheckoutLine = {
  merchandiseId?: string;
  quantity: number;
};

export function isShopifyConfigured() {
  return Boolean(shopifyDomain && storefrontToken);
}

function getShopifyEndpoint() {
  if (!shopifyDomain) return null;
  const cleanDomain = shopifyDomain.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return `https://${cleanDomain}/api/${shopifyApiVersion}/graphql.json`;
}

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>) {
  const endpoint = getShopifyEndpoint();

  if (!endpoint || !storefrontToken) {
    throw new Error("Shopify Storefront API is not configured.");
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-shopify-storefront-access-token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 300, tags: ["shopify-products"] },
  });

  const payload = (await response.json()) as ShopifyResponse<T>;

  if (!response.ok || payload.errors?.length) {
    throw new Error(payload.errors?.[0]?.message || "Shopify request failed.");
  }

  if (!payload.data) {
    throw new Error("Shopify did not return data.");
  }

  return payload.data;
}

function moneyToNumber(money?: ShopifyMoney | null) {
  if (!money?.amount) return 0;
  return Number.parseFloat(money.amount);
}

function getMetafieldValue(field: ShopifyMetafield, fallback = "") {
  return field?.value?.trim() || fallback;
}

function getCategory(product: ShopifyProductNode): Product["category"] {
  const label = product.collections.nodes[0]?.title || product.productType || "Sauces";
  const normalized = label.toLowerCase();

  if (normalized.includes("season")) return "Seasonings";
  if (normalized.includes("bundle") || normalized.includes("set") || normalized.includes("gift")) return "Sets";
  if (normalized.includes("drink") || normalized.includes("juice") || normalized.includes("lassi") || normalized.includes("smoothie")) return "Drinks";
  if (normalized.includes("pantry")) return "Pantry";
  return "Sauces";
}

function mapShopifyProduct(product: ShopifyProductNode): Product {
  const variant = product.variants.nodes[0];
  const price = moneyToNumber(variant?.price || product.priceRange.minVariantPrice);
  const compareAtPrice = moneyToNumber(variant?.compareAtPrice || product.compareAtPriceRange.minVariantPrice);
  const stock = variant?.quantityAvailable ?? (variant?.availableForSale ? 99 : 0);
  const category = getCategory(product);
  const image = variant?.image?.url || product.featuredImage?.url || "/safna-logo.jpg";
  const tags = product.tags.map((tag) => tag.toLowerCase());

  return {
    id: product.id,
    slug: product.handle,
    name: product.title,
    category,
    price: compareAtPrice > price ? compareAtPrice : price,
    salePrice: compareAtPrice > price ? price : undefined,
    description: product.description || `Shop ${product.title} from Safna Products.`,
    longDescription: product.description || `Shop ${product.title} from Safna Products.`,
    badge: getMetafieldValue(product.badge, category),
    colour: category === "Seasonings" ? "#2f318b" : category === "Sets" ? "#ffdc3d" : category === "Drinks" ? "#f2a51a" : "#ef3f35",
    size: getMetafieldValue(product.size, variant?.selectedOptions.find((option) => /size|weight/i.test(option.name))?.value || "See label"),
    stock,
    heatLevel: getMetafieldValue(product.heatLevel, tags.includes("hot") ? "Hot" : tags.includes("mild") ? "Mild" : "No heat") as Product["heatLevel"],
    dietary: getMetafieldValue(product.dietary, "See product information"),
    ingredients: getMetafieldValue(product.ingredients, "See product label for ingredients."),
    allergens: getMetafieldValue(product.allergens, "See product label for allergen information."),
    storage: getMetafieldValue(product.storage, "Store according to the product label."),
    shelfLife: getMetafieldValue(product.shelfLife, "See product label for best-before details."),
    extraWording: getMetafieldValue(product.extraWording),
    image,
    status: "Published",
    visibility: "Public",
    isBundle: category === "Sets",
    featured: tags.includes("featured") || tags.includes("best-seller"),
    shopifyProductId: product.id,
    shopifyVariantId: variant?.id,
  };
}

const productFields = `
  id
  title
  handle
  description
  productType
  tags
  featuredImage {
    url
    altText
  }
  collections(first: 3) {
    nodes {
      title
    }
  }
  priceRange {
    minVariantPrice {
      amount
    }
  }
  compareAtPriceRange {
    minVariantPrice {
      amount
    }
  }
  variants(first: 1) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      price {
        amount
      }
      compareAtPrice {
        amount
      }
      selectedOptions {
        name
        value
      }
      image {
        url
        altText
      }
    }
  }
  ingredients: metafield(namespace: "custom", key: "ingredients") { value }
  allergens: metafield(namespace: "custom", key: "allergens") { value }
  storage: metafield(namespace: "custom", key: "storage_instructions") { value }
  shelfLife: metafield(namespace: "custom", key: "shelf_life") { value }
  dietary: metafield(namespace: "custom", key: "dietary_information") { value }
  size: metafield(namespace: "custom", key: "size_weight") { value }
  extraWording: metafield(namespace: "custom", key: "extra_wording") { value }
  heatLevel: metafield(namespace: "custom", key: "heat_level") { value }
  badge: metafield(namespace: "custom", key: "badge") { value }
`;

export async function getShopifyProducts() {
  const data = await shopifyFetch<{
    products: {
      nodes: ShopifyProductNode[];
    };
  }>(`
    query SafnaProducts {
      products(first: 100) {
        nodes {
          ${productFields}
        }
      }
    }
  `);

  return data.products.nodes.map(mapShopifyProduct).filter((product) => product.shopifyVariantId);
}

export async function getShopifyProductByHandle(handle: string) {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProductNode | null;
  }>(
    `
      query SafnaProduct($handle: String!) {
        productByHandle(handle: $handle) {
          ${productFields}
        }
      }
    `,
    { handle },
  );

  return data.productByHandle ? mapShopifyProduct(data.productByHandle) : null;
}

export async function createShopifyCart(lines: ShopifyCheckoutLine[]) {
  const validLines = lines.filter((line) => line.merchandiseId && line.quantity > 0);

  if (!validLines.length) {
    throw new Error("Please add available Shopify products to your basket before checkout.");
  }

  const data = await shopifyFetch<CartCreateResponse>(
    `
      mutation SafnaCartCreate($lines: [CartLineInput!]!) {
        cartCreate(input: { lines: $lines }) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      lines: validLines.map((line) => ({
        merchandiseId: line.merchandiseId,
        quantity: line.quantity,
      })),
    },
  );

  const error = data.cartCreate.userErrors[0];
  const checkoutUrl = data.cartCreate.cart?.checkoutUrl;

  if (error || !checkoutUrl) {
    throw new Error(error?.message || "Shopify checkout could not be created.");
  }

  return checkoutUrl;
}
