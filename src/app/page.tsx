import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bell, BookOpen, Gift, ImagePlus, Mail, Search, ShieldCheck, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PromoPopup } from "@/components/promo-popup";
import { blogPosts, promoCampaigns, reviews, site, storefrontTiles } from "@/lib/content";
import { categories, getPublicProducts } from "@/lib/products";

export default function Home() {
  const products = getPublicProducts();
  const featured = products.filter((product) => product.featured).slice(0, 4);
  const activeCategories = categories.filter((category) => products.some((product) => product.category === category));
  const publishedPosts = blogPosts.filter((post) => post.status === "Published");
  const hasProducts = products.length > 0;
  const activePromo = promoCampaigns.find((promo) => promo.status === "Published");

  return (
    <>
      <PromoPopup />
      <section className="shop-hero launch-hero">
        <div className="hero-photo" aria-hidden="true">
          <div className="plate plate-one" />
          <div className="plate plate-two" />
          <div className="spice-pot">Safna</div>
        </div>
        <div className="container hero-content">
          <div className="hero-panel">
            <span className="eyebrow">
              <Sparkles size={16} /> Safna Products
            </span>
            <h1>
              <span>FIRST COLLECTION.</span>
              <span>BEING PREPARED.</span>
            </h1>
            <p>
              Safna&apos;s public store will open once the product range, prices, photos, ingredients, allergens and
              delivery details have been confirmed by the business.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="button dark" href="/contact">
                Join the launch list <ArrowRight size={18} />
              </Link>
              <Link className="button secondary" href="/about">
                Learn about Safna
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="storefront-rail" aria-label="Main shopping routes">
        <div className="container storefront-rail-inner">
          {storefrontTiles.map((tile, index) => (
            <Link href={tile.href} key={tile.label}>
              {index === 0 ? <Gift size={22} /> : index === 1 ? <Search size={22} /> : <BookOpen size={22} />}
              <span>{tile.label}</span>
              <small>{tile.description}</small>
            </Link>
          ))}
        </div>
      </section>

      {activePromo ? (
        <section className="promo-band">
          <div className="container promo-band-inner">
            <div>
              <span className="eyebrow">Promotion builder</span>
              <h2>{activePromo.title}</h2>
              <p>{activePromo.body}</p>
            </div>
            <Link className="button dark" href={`mailto:${site.email}?subject=Safna%20launch%20list`}>
              Join now <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="section split-intro">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">
              <ShieldCheck size={16} /> Published content only
            </span>
            <h2 className="display-title">No placeholder products. No invented reviews. No fake prices.</h2>
          </div>
          <p className="lead">
            The customer website now hides draft and demo data. Products, reviews, recipes, delivery information and
            promotions appear only after they are published through the Safna backend.
          </p>
        </div>
      </section>

      {activeCategories.length ? (
        <section className="section category-section">
          <div className="container">
            <div className="section-heading">
              <span className="eyebrow">Shop by category</span>
              <Link href="/products">
                See all <ArrowRight size={17} />
              </Link>
            </div>
            <div className="category-grid">
              {activeCategories.map((category) => (
                <Link className="category-tile" href={`/products?category=${category}`} key={category}>
                  <span />
                  <h3>{category}</h3>
                  <p>Published Safna products in this category.</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {featured.length ? (
        <section className="section" style={{ paddingTop: 28 }}>
          <div className="container">
            <div className="section-heading">
              <div>
                <span className="eyebrow">Featured products</span>
                <h2 className="display-title">Published by Safna.</h2>
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
      ) : (
        <section className="section">
          <div className="container">
            <div className="empty-state">
              <Image src="/safna-logo.jpg" alt="Safna Products logo" width={180} height={205} />
              <span className="eyebrow">
                <Bell size={16} /> Launch list
              </span>
              <h2>Safna&apos;s first collection is being prepared.</h2>
              <p>
                The store will display products only after the final names, pricing, photos, ingredients, allergens,
                stock and delivery settings are published by the admin team.
              </p>
              <Link className="button yellow" href={`mailto:${site.email}?subject=Safna%20launch%20list`}>
                <Mail size={18} /> Register interest
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section ideas-section">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">
              <ImagePlus size={16} /> CMS controlled
            </span>
            <h2 className="display-title">Photos, recipes and reviews will appear when they are real.</h2>
          </div>
          <p className="lead" style={{ color: "#dce5dd" }}>
            Homepage sections for recipes, customer reviews, bundles and product education are prepared, but hidden until
            approved content exists in the backend.
          </p>
        </div>
      </section>

      <section className="section customer-journey-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Customer journey</span>
              <h2 className="display-title">Browse, learn, add to bag, then checkout.</h2>
            </div>
          </div>
          <div className="journey-grid">
            {[
              ["Search products", "The header search expands into a product finder and hides unapproved catalogue data."],
              ["Build a basket", "The bag drawer opens from any page and blocks stale or unpublished items from checkout."],
              ["Create an account", "Account screens are ready for login, saved addresses, repeat orders and preferences."],
              ["Preview first", "Admin edits can be reviewed before the content is pushed live to customers."],
            ].map(([title, body]) => (
              <article key={title}>
                <strong>{title}</strong>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {reviews.length ? (
        <section className="section reviews-band">
          <div className="container">
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
      ) : null}

      {publishedPosts.length ? (
        <section className="section">
          <div className="container grid-3">
            {publishedPosts.map((post) => (
              <article className="card" key={post.slug} style={{ padding: 24 }}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="section logo-close">
        <div className="container">
          <Image src="/safna-logo.jpg" alt="Safna Products logo" width={240} height={274} />
          <h2>{hasProducts ? "Shop Safna Products" : "Safna Products"}</h2>
          <p>
            {hasProducts
              ? "Browse the products Safna has published for online ordering."
              : "Join the launch list and Safna will share updates when the first collection is ready."}
          </p>
          <Link className="button yellow" href={hasProducts ? "/products" : "/contact"}>
            {hasProducts ? "Shop products" : "Contact Safna"}
          </Link>
        </div>
      </section>
    </>
  );
}
