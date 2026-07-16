# Safna Products Website

Next.js storefront and admin preview for Safna Products. The customer-facing site is configured to show only published,
non-demo content.

## What is included

- Bright, responsive customer website using the supplied Safna logo
- Home, Products, About, Contact, FAQ, Testimonials, Blog, Privacy Policy, Account, Admin, and Checkout routes
- Draft/demo product structure in `src/lib/products.ts` for admin testing
- Public product getters that hide demo or draft data unless `NEXT_PUBLIC_DEMO_STOREFRONT=true`
- Launch-safe empty states for products, reviews, blog, recipes, basket, and customer accounts
- Local cart experience with checkout handoff placeholder
- Stripe-ready checkout route using `STRIPE_SECRET_KEY`, with server-side validation against published products
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
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
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
- Stripe, Shopify, PayPal, WooCommerce, or another payment provider
- Delivery, collection, shipping zones, fees, tax/VAT, and returns policy
- Customer account scope: order history, saved addresses, preferences, support requests
- Admin workflow: products, orders, customers, reviews, blog, enquiries, analytics
- Domain, hosting, business email, launch deadline, and WhatsApp number

## Production backend notes

The admin dashboard and customer account surfaces are built as an integration-ready preview. For live use, connect:

- A database for persistent products, orders, policies, customers, reviews, stock, and content
- Secure admin authentication and customer authentication
- Stripe live keys and webhooks for payment/order updates
- Email delivery for receipts, customer confirmations, and admin notifications
- Cloud image storage for product, category, recipe, policy, and homepage media
- Server-side validation, role-based access, rate limiting, and audit logging

Do not publish the demo catalogue to customers. Real products, prices, ingredients, allergens, claims, reviews, recipes,
delivery rules, and promotions should be entered into the production backend and published only after client approval.
