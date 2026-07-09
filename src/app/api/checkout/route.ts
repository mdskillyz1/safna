import { NextResponse } from "next/server";
import { getProductById } from "@/lib/products";

type CheckoutLine = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { lines?: CheckoutLine[] };
  const checkoutUrl = process.env.CHECKOUT_URL;
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://safna-mu.vercel.app";

  if (checkoutUrl) {
    return NextResponse.json({ url: checkoutUrl });
  }

  if (stripeSecretKey && body.lines?.length) {
    const params = new URLSearchParams({
      mode: "payment",
      success_url: `${siteUrl}/checkout/success`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      "automatic_tax[enabled]": "true",
      "shipping_address_collection[allowed_countries][0]": "GB",
    });

    body.lines.forEach((line, index) => {
      const product = getProductById(line.id);
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
      "Stripe checkout is ready. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_SITE_URL in Vercel before taking live payments.",
  });
}
