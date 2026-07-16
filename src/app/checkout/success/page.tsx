import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Order received</span>
          <h1>Thank you for your Safna order.</h1>
          <p>Your order confirmation and delivery updates will be sent to the email address used at checkout.</p>
          <Link className="button yellow" href="/products">
            Continue shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
