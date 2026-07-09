# Safna Products Website

Production-ready Next.js ecommerce storefront for Safna Products.

## What is included

- Bright, responsive ecommerce website using the supplied Safna logo
- Home, Products, About, Contact, FAQ, Testimonials, Blog, Privacy Policy, Account, Admin, and Checkout routes
- Editable product data in `src/lib/products.ts`
- Product structure for sauces, seasonings, bundles, pantry products, sizes, heat levels, and dietary notes
- Editable reviews, FAQs, blog teasers, admin modules, and navigation in `src/lib/content.ts`
- Local cart experience with checkout handoff placeholder
- Stripe-ready checkout route using `STRIPE_SECRET_KEY`
- CMS-style admin dashboard for products, stock, orders, delivery, policies, content, customers, reviews, and enquiries
- Product detail pages with ingredients, allergens, storage, shelf-life, dietary information, stock, quantity, and basket paths
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

The admin dashboard and customer account surfaces are built and ready for integration. For live use, connect:

- A database for persistent products, orders, policies, customers, reviews, stock, and content
- Secure admin authentication and customer authentication
- Stripe live keys and webhooks for payment/order updates
- Email delivery for receipts, customer confirmations, and admin notifications
