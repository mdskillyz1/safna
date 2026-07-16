import { NextResponse } from "next/server";
import { createShopifyCart, isShopifyConfigured } from "@/lib/shopify";
import { getPublicProductById } from "@/lib/products";

type CheckoutLine = {
  id: string;
  merchandiseId?: string;
  quantity: number;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { lines?: CheckoutLine[] };
  const checkoutUrl = process.env.CHECKOUT_URL;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://safna-mu.vercel.app";

  if (isShopifyConfigured()) {
    try {
      const url = await createShopifyCart(body.lines || []);
      return NextResponse.json({ url });
    } catch (error) {
      return NextResponse.json(
        { message: error instanceof Error ? error.message : "Shopify checkout could not be created." },
        { status: 400 },
      );
    }
  }

  if (checkoutUrl) {
    return NextResponse.json({ url: checkoutUrl });
  }

  const validLines = (body.lines || [])
    .map((line) => ({ line, product: getPublicProductById(line.id) }))
    .filter((item) => item.product && item.line.quantity > 0);

  if (!validLines.length) {
    return NextResponse.json(
      { message: "The selected products are not available for checkout right now." },
      { status: 400 },
    );
  }

  if (stripeSecretKey && body.lines?.length) {
    const params = new URLSearchParams({
      mode: "payment",
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      "automatic_tax[enabled]": "true",
      "shipping_address_collection[allowed_countries][0]": "GB",
    });

    validLines.forEach(({ line, product }, index) => {
      if (!product) return;
      const amount = Math.round((product.salePrice || product.price) * 100);
      params.append(`line_items[${index}][quantity]`, String(line.quantity));
      params.append(`line_items[${index}][price_data][currency]`, "gbp");
      params.append(`line_items[${index}][price_data][unit_amount]`, String(amount));
      params.append(`line_items[${index}][price_data][product_data][name]`, product.name);
      params.append(`line_items[${index}][price_data][product_data][description]`, product.size);
    });

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        authorization: `Bearer ${stripeSecretKey}`,
        "content-type": "application/x-www-form-urlencoded",
      },
      body: params,
    });

    const session = (await response.json()) as { url?: string; error?: { message?: string } };

    if (session.url) {
      return NextResponse.json({ url: session.url });
    }

    return NextResponse.json(
      { message: session.error?.message || "Stripe checkout could not be created." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    message:
      "Checkout is ready to connect. Add Shopify Storefront API credentials in Vercel before taking live payments.",
  });
}
