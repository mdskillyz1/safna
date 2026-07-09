import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const form = await request.formData();
  const name = String(form.get("name") || "").trim();
  const email = String(form.get("email") || "").trim();
  const message = String(form.get("message") || "").trim();

  if (!name || !email || !message) {
    return NextResponse.json({ message: "Name, email, and message are required." }, { status: 400 });
  }

  return NextResponse.json({
    message:
      "Enquiry accepted. Connect Resend, Mailgun, Shopify Forms, or a CRM before production lead delivery.",
  });
}
