import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Order received</span>
          <h1>Thank you for your Safna order.</h1>
          <p>
            Stripe will redirect successful customers here. Order confirmation emails can be sent through Stripe receipts
            or a transactional email provider once live keys are connected.
          </p>
          <Link className="button yellow" href="/products">
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
