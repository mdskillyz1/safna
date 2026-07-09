# Safna Products Website

Production-ready Next.js ecommerce storefront for Safna Products.

## What is included

- Bright, responsive ecommerce website using the supplied Safna logo
- Home, Products, About, Contact, FAQ, Testimonials, Blog, Privacy Policy, Account, Admin, and Checkout routes
- Editable product data in `src/lib/products.ts`
- Editable reviews, FAQs, blog teasers, admin modules, and navigation in `src/lib/content.ts`
- Local cart experience with checkout handoff placeholder
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
- `CHECKOUT_PROVIDER`
- `CHECKOUT_URL`
- `CONTACT_DELIVERY_EMAIL`

## Decisions still needed from Ibrahim

- Product list, product photos, prices, categories, and stock rules
- Stripe, Shopify, PayPal, WooCommerce, or another payment provider
- Delivery, collection, shipping zones, fees, tax/VAT, and returns policy
- Customer account scope: order history, saved addresses, preferences, support requests
- Admin workflow: products, orders, customers, reviews, blog, enquiries, analytics
- Domain, hosting, business email, launch deadline, and WhatsApp number
