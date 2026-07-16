# Safna Headless Shopify Setup

Safna uses a custom Next.js storefront on Vercel with Shopify as the ecommerce backend.

## Shopify admin setup

1. In Shopify, keep the store owned by MDemx during build, then transfer ownership to Ibrahim before launch.
2. Add the Headless sales channel if available.
3. Create a storefront named `Safna Website`.
4. Copy the Storefront API access token.
5. Keep Shopify Payments/payout details empty until Ibrahim can add the correct business and bank details.

## Required Vercel environment variables

```bash
SHOPIFY_STORE_DOMAIN=safna-products.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=replace-with-storefront-token
SHOPIFY_API_VERSION=2026-07
CHECKOUT_PROVIDER=shopify
NEXT_PUBLIC_SITE_URL=https://safna.co.uk
NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_URL=
```

## Collections

Create these collections in Shopify:

- Sauces
- Seasonings
- Safna Sets
- Bundles & Gift Boxes
- Pantry

## Product metafields

Create product metafields in namespace `custom`:

| Key | Purpose |
| --- | --- |
| `ingredients` | Ingredient list |
| `allergens` | Allergen information |
| `storage_instructions` | Storage guidance |
| `shelf_life` | Best-before or shelf-life wording |
| `dietary_information` | Vegan, vegetarian, halal or other claims |
| `size_weight` | Bottle size, jar size, pouch weight or bundle count |
| `extra_wording` | Any extra product-page note |
| `heat_level` | Mild, Medium, Hot or No heat |
| `badge` | Product card badge |

## Product publishing rules

- Add real products as draft first.
- Add price, stock, image, category and all food information before publishing.
- Use tags such as `featured`, `best-seller`, `mild` or `hot` to improve storefront display.
- Publish products to the Headless sales channel.

## Customer flow

The custom Safna site handles browsing, product pages, basket and marketing pages. The final payment step redirects to
Shopify Checkout, which handles secure payments, order creation, confirmation emails and customer account order history.
