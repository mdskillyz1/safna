export type Policy = {
  slug: string;
  title: string;
  summary: string;
  body: string[];
};

export const policies: Policy[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    summary: "How Safna collects, stores, and uses customer information.",
    body: [
      "Safna collects the personal information needed to respond to enquiries, process orders, manage customer accounts, deliver products, prevent fraud, and improve the website.",
      "Information may include name, email address, delivery address, billing details, account preferences, order history, support messages, and analytics events.",
      "Payment details are processed by the selected secure payment provider and are not stored directly by Safna.",
      "Customers can contact Safna to request access, correction, or deletion of their personal information, subject to legal and accounting requirements.",
    ],
  },
  {
    slug: "terms-and-conditions",
    title: "Terms and Conditions",
    summary: "General terms for using the Safna website and buying products online.",
    body: [
      "These terms explain how customers may use the Safna website and place orders for Safna food products.",
      "Product descriptions, prices, availability, delivery fees, and promotions may change from time to time.",
      "Orders are accepted only when payment has been authorised and Safna has confirmed the order.",
      "Customers must provide accurate account, payment, and delivery information when placing an order.",
    ],
  },
  {
    slug: "returns-and-refunds",
    title: "Returns and Refunds Policy",
    summary: "Draft returns and refund wording for food-product ecommerce.",
    body: [
      "Because Safna sells food products, returns may be limited for safety and hygiene reasons unless an item is faulty, damaged, incorrect, or not as described.",
      "Customers should contact Safna as soon as possible with their order number, photos, and a description of the issue.",
      "Refunds or replacements will be reviewed case by case and processed according to UK consumer law.",
      "Final returns wording should be reviewed before launch once packaging, delivery partner, and product handling rules are confirmed.",
    ],
  },
  {
    slug: "shipping-policy",
    title: "Shipping Policy",
    summary: "UK delivery approach, fees, timing, and fulfilment notes.",
    body: [
      "Safna currently prepares for UK delivery only. Delivery zones, courier partner, shipping fees, and free-delivery thresholds are managed from the admin dashboard.",
      "Customers will see delivery options during checkout once the final shipping setup is confirmed.",
      "Orders may be subject to cut-off times, stock availability, packaging requirements, and courier schedules.",
      "Delivery information should be updated before launch once the delivery partner and final fees are confirmed.",
    ],
  },
  {
    slug: "food-safety-information",
    title: "Food Safety Information",
    summary: "Food handling, storage, best-before, and safety information.",
    body: [
      "Safna product pages include space for ingredients, allergens, storage instructions, and best-before or shelf-life details.",
      "Customers should always follow the storage instructions shown on the product label and product page.",
      "Products should not be consumed after the stated best-before or use-by date where applicable.",
      "Final food safety wording must be confirmed by Safna before accepting live orders.",
    ],
  },
  {
    slug: "allergen-notice",
    title: "Allergen Notice",
    summary: "Important allergen guidance for Safna food products.",
    body: [
      "Safna product pages include allergen information for each product where supplied.",
      "Customers with allergies or intolerances should read the product page and product label carefully before purchase and consumption.",
      "Safna must confirm whether products are prepared, packed, or stored in an environment that handles allergens such as nuts, peanuts, sesame, gluten, milk, egg, soya, mustard, celery, sulphites, fish, crustaceans, molluscs, or lupin.",
      "Customers should contact Safna before ordering if they are unsure whether a product is suitable for their dietary needs.",
    ],
  },
];

export const getPolicy = (slug: string) => policies.find((policy) => policy.slug === slug);
