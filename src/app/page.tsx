import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { audienceCards, featureCards, reviews, trustStats } from "@/lib/content";
import { products } from "@/lib/products";

export default function Home() {
  const featured = products.filter((product) => product.featured);

  return (
    <>
      <section className="hero" style={{ padding: "70px 0 44px" }}>
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">
              <Sparkles size={16} /> Bright fresh produce
            </span>
            <h1>Fresh Safna products, made easy to browse and buy.</h1>
            <p>
              A modern ecommerce storefront for produce, bundles, reviews, blog content, customer accounts, and a
              payment-ready checkout path.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 28 }}>
              <Link className="button yellow" href="/products">
                Shop products <ArrowRight size={18} />
              </Link>
              <Link className="button secondary" href="/contact">
                Ask a question
              </Link>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ borderRadius: 8, background: "#ffdc3d", padding: 20, boxShadow: "var(--shadow)" }}>
              <Image
                src="/safna-logo.jpg"
                alt="Safna Products logo with vegetables"
                width={660}
                height={753}
                priority
                style={{ width: "100%", height: "auto", borderRadius: 8 }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="page-title">
            <span className="eyebrow">Featured products</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)", margin: "18px 0 12px" }}>Launch-ready product cards</h2>
            <p className="lead">Edit product names, prices, categories, and descriptions in one simple data file.</p>
          </div>
          <div className="grid-3" style={{ marginTop: 28 }}>
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff4ad" }}>
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="page-title">
            <span className="eyebrow">Built for launch</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "18px 0 12px" }}>
              Ecommerce features without a heavy, cluttered feel.
            </h2>
            <p className="lead">
              Safna gets a simple customer journey now, with clear upgrade points for payments, accounts, stock, tax,
              shipping, and admin workflows once Ibrahim confirms the platform.
            </p>
          </div>
          <div className="grid-2">
            {featureCards.map((feature) => (
              <div className="card" key={feature.title} style={{ padding: 20 }}>
                <feature.icon size={24} />
                <h3>{feature.title}</h3>
                <p style={{ color: "#526158", lineHeight: 1.6 }}>{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-3">
            {trustStats.map((stat) => (
              <div className="card" key={stat.label} style={{ padding: 22 }}>
                <strong style={{ fontSize: "2.2rem" }}>{stat.value}</strong>
                <p style={{ marginBottom: 0, color: "#526158" }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container grid-2">
          {audienceCards.map((card) => (
            <div className="card" key={card.title} style={{ padding: 24 }}>
              <card.icon size={26} />
              <h3>{card.title}</h3>
              <p className="lead">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ background: "#a7f3c2" }}>
        <div className="container">
          <div className="page-title">
            <span className="eyebrow">Customer love</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "18px 0 12px" }}>Reviews ready for social proof.</h2>
          </div>
          <div className="grid-3" style={{ marginTop: 24 }}>
            {reviews.map((review) => (
              <div className="card" key={review.name} style={{ padding: 22 }}>
                <div aria-label={`${review.rating} stars`}>{"★".repeat(review.rating)}</div>
                <p style={{ lineHeight: 1.65 }}>{review.quote}</p>
                <strong>
                  <CheckCircle2 size={17} /> {review.name}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
