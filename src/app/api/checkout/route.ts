import { NextResponse } from "next/server";

export async function POST() {
  const checkoutUrl = process.env.CHECKOUT_URL;

  if (checkoutUrl) {
    return NextResponse.json({ url: checkoutUrl });
  }

  return NextResponse.json({
    message:
      "Checkout is ready for provider connection. Add Stripe, Shopify, PayPal, or WooCommerce details before taking live payments.",
  });
}
