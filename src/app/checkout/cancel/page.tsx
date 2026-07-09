import Link from "next/link";

export default function CheckoutCancelPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Checkout paused</span>
          <h1>Your payment was not completed.</h1>
          <p>Your basket is still available in this browser. You can return to checkout or keep browsing.</p>
          <Link className="button yellow" href="/checkout">
            Return to basket
          </Link>
        </div>
      </div>
    </section>
  );
}
