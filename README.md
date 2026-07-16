# Safna Products Website

Next.js headless storefront for Safna Products. The customer-facing website stays custom on Vercel, while Shopify is
the production backend for products, stock, checkout, payments, customer accounts, orders, shipping, discounts and
policies.

## What is included

- Bright, responsive customer website using the supplied Safna logo
- Home, Products, About, Contact, FAQ, Testimonials, Blog, Privacy Policy, Account, Admin, and Checkout routes
- Draft/demo product structure in `src/lib/products.ts` for fallback and admin testing
- Shopify Storefront API catalogue adapter in `src/lib/shopify.ts`
- Catalogue helpers that use Shopify when configured and fall back to local products while setup is incomplete
- Launch-safe empty states for products, reviews, blog, recipes, basket, and customer accounts
- Local cart experience that stores Shopify variant IDs when products come from Shopify
- Shopify checkout handoff through the Storefront API cart flow
- CMS-style admin dashboard for products, stock, orders, delivery, policies, content, customers, reviews, and enquiries
- Product detail pages that render only for published, non-demo products and hide blank food-information fields
- Contact form endpoint ready to connect to email or CRM delivery
- SEO metadata, Open Graph image, `sitemap.xml`, `robots.txt`, and analytics hook
- WhatsApp button that uses `NEXT_PUBLIC_WHATSAPP_NUMBER` when available

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

## Deployment

This project is ready for GitHub and Vercel. Set these environment variables in Vercel before launch:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_DEMO_STOREFRONT` should stay `false` for production
- `NEXT_PUBLIC_ADMIN_EMAIL`
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_STOREFRONT_ACCESS_TOKEN`
- `SHOPIFY_API_VERSION`
- `NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL`
- `CHECKOUT_PROVIDER`
- `CHECKOUT_URL`
- `CONTACT_DELIVERY_EMAIL`
- `ADMIN_PASSWORD`
- `NEXT_PUBLIC_ADMIN_PREVIEW_PASSWORD`
- `AUTH_SECRET`
- `DATABASE_URL`
- `EMAIL_FROM`

## Decisions still needed from Ibrahim

- Product list, product photos, prices, categories, and stock rules
- Ingredients, allergens, storage instructions, best-before rules, and nutrition/claims wording
- Shopify product metafields for ingredients, allergens, storage, shelf-life, dietary claims, size, heat level and badges
- Delivery, collection, shipping zones, fees, tax/VAT, and returns policy
- Customer account scope: order history, saved addresses, preferences, support requests
- Admin workflow: products, orders, customers, reviews, blog, enquiries, analytics
- Domain, hosting, business email, launch deadline, and WhatsApp number

## Shopify backend notes

Shopify is the production source of truth. Set up these areas in Shopify before launch:

- Products, variants, images, prices, compare-at prices and inventory
- Collections for Sauces, Seasonings, Safna Sets, Bundles & Gift Boxes and Pantry
- Product metafields using the `custom` namespace:
  - `ingredients`
  - `allergens`
  - `storage_instructions`
  - `shelf_life`
  - `dietary_information`
  - `size_weight`
  - `extra_wording`
  - `heat_level`
  - `badge`
- Shopify Payments/payouts under Ibrahim's business details before taking live orders
- UK shipping rates, delivery threshold, packaging notes and policy pages
- Customer accounts and Shopify Checkout

Do not publish the demo catalogue to customers. Real products, prices, ingredients, allergens, claims, reviews, recipes,
delivery rules and promotions should be entered into Shopify and published only after client approval.
