import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Flame, Gift, Leaf, Package, Sparkles, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { reviews } from "@/lib/content";
import { categories, getPublicProducts } from "@/lib/products";

const categoryCopy: Record<(typeof categories)[number], { title: string; body: string; accent: string }> = {
  Sauces: {
    title: "Sauces",
    body: "Table sauces, dipping sauces and cooking shortcuts for everyday plates.",
    accent: "#ef3f35",
  },
  Seasonings: {
    title: "Seasonings",
    body: "Dry blends for grills, stews, rice, fries, vegetables and weeknight cooking.",
    accent: "#2f318b",
  },
  Bundles: {
    title: "Bundles",
    body: "Starter boxes, gift sets and mix-and-match flavour collections.",
    accent: "#a7f3c2",
  },
  Pantry: {
    title: "Pantry",
    body: "Cooking bases, marinades and future kitchen staples from the Safna range.",
    accent: "#ffdc3d",
  },
};

const trustNotes = ["UK delivery", "Food information clearly listed", "Stripe checkout ready", "Small-batch flavour"];

export default function Home() {
  const products = getPublicProducts();
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const bundles = products.filter((product) => product.isBundle).slice(0, 2);

  return (
    <>
      <section className="shop-hero">
        <div className="hero-photo" aria-hidden="true">
          <div className="plate plate-one" />
          <div className="plate plate-two" />
          <div className="bottle bottle-red">Hot</div>
          <div className="bottle bottle-green">Herb</div>
          <div className="spice-pot">Spice</div>
        </div>
        <div className="container hero-content">
          <div className="hero-panel">
            <span className="eyebrow">
              <Sparkles size={16} /> Safna Products
            </span>
            <h1>
              <span>BIG FLAVOUR.</span>
              <span>EVERYDAY FOOD.</span>
            </h1>
            <p>
              Sauces, seasonings and gift boxes made to lift grills, rice, wraps, stews, sides and quick weeknight
              dinners.
            </p>
            <Link className="button dark" href="/products">
              Shop the range <ArrowRight size={18} />
            </Link>
            <div className="hero-rating" aria-label="Five star customer rating">
              <span>★★★★★</span>
              <strong>Fresh Safna flavours launching online</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-marquee" aria-label="Store highlights">
        <div>
          {[...trustNotes, ...trustNotes].map((note, index) => (
            <span key={`${note}-${index}`}>
              <CheckCircle2 size={18} /> {note}
            </span>
          ))}
        </div>
      </section>

      <section className="section split-intro">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">
              <Flame size={16} /> Full-on flavour
            </span>
            <h2 className="display-title">Sauces, spices and boxes built for repeat orders.</h2>
          </div>
          <p className="lead">
            Safna is set up for a growing food range: hero sauces first, then seasonings, bundles, gift boxes, pantry
            products and limited drops as the client finalises recipes and packaging.
          </p>
        </div>
      </section>

      <section className="section category-section">
        <div className="container">
          <div className="section-heading">
            <span className="eyebrow">Shop by flavour</span>
            <Link href="/products">
              See all <ArrowRight size={17} />
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((category) => (
              <Link className="category-tile" href={`/products?category=${category}`} key={category}>
                <span style={{ background: categoryCopy[category].accent }} />
                <h3>{categoryCopy[category].title}</h3>
                <p>{categoryCopy[category].body}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 28 }}>
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Bestsellers</span>
              <h2 className="display-title">Start with these.</h2>
            </div>
            <Link className="button secondary" href="/products">
              Shop all
            </Link>
          </div>
          <div className="product-strip">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section bundle-band">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">
              <Gift size={16} /> Boxes and bundles
            </span>
            <h2 className="display-title">Build the shelf in one order.</h2>
            <p className="lead">
              Starter boxes and sauce sets give new customers an easy first basket while Safna keeps expanding the range.
            </p>
            <Link className="button dark" href="/products">
              Build a box <Package size={18} />
            </Link>
          </div>
          <div className="bundle-stack">
            {bundles.map((product) => (
              <ProductCard key={product.id} product={product} compact />
            ))}
          </div>
        </div>
      </section>

      <section className="section ideas-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <Leaf size={16} /> How to use Safna
              </span>
              <h2 className="display-title">Open, pour, season, cook.</h2>
            </div>
          </div>
          <div className="ideas-grid">
            {["Grilled chicken and fish", "Rice bowls and wraps", "Chips, sides and roasted veg", "Marinades, stews and sauces"].map(
              (idea) => (
                <article key={idea}>
                  <Star size={20} />
                  <h3>{idea}</h3>
                </article>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="section reviews-band">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">Customer love</span>
            <h2 className="display-title">Made for the meals people actually eat.</h2>
            <p className="lead">
              Reviews can be managed from the admin dashboard once real customer feedback starts coming in.
            </p>
          </div>
          <div className="review-list">
            {reviews.map((review) => (
              <article key={review.name}>
                <div aria-label={`${review.rating} stars`}>{"★".repeat(review.rating)}</div>
                <p>{review.quote}</p>
                <strong>{review.name}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section logo-close">
        <div className="container">
          <Image src="/safna-logo.jpg" alt="Safna Products logo" width={240} height={274} />
          <h2>Safna Products</h2>
          <p>Sauces, seasonings, bundles and pantry flavour for homes across the UK.</p>
          <Link className="button yellow" href="/products">
            Shop products
          </Link>
        </div>
      </section>
    </>
  );
}
