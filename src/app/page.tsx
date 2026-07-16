import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Gift, Mail, Search, ShieldCheck, Sparkles } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { PromoPopup } from "@/components/promo-popup";
import { getCatalogProducts } from "@/lib/catalog";
import { blogPosts, promoCampaigns, reviews, site, storefrontTiles } from "@/lib/content";
import { categories } from "@/lib/products";

export default async function Home() {
  const products = await getCatalogProducts();
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
              <span>SAUCES.</span>
              <span>SEASONINGS.</span>
              <span>FOOD PRODUCTS.</span>
            </h1>
            <p>
              Browse Safna&apos;s growing range of flavour-packed food products, kitchen staples, sets and recipe ideas for
              everyday meals.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link className="button dark" href="/contact">
                Get product updates <ArrowRight size={18} />
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
              <span className="eyebrow">Safna offers</span>
              <h2>{activePromo.title}</h2>
              <p>{activePromo.body}</p>
            </div>
            <Link className="button dark" href={`mailto:${site.email}?subject=Safna%20launch%20list`}>
              Sign up <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="section split-intro">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">
              <ShieldCheck size={16} /> Food details
            </span>
            <h2 className="display-title">Clear product information before you buy.</h2>
          </div>
          <p className="lead">
            Safna product pages are set up for ingredients, allergens, storage advice, shelf life, dietary notes, prices,
            stock status and delivery information, so customers can shop with confidence.
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
                  <p>Browse Safna products in this category.</p>
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
                <h2 className="display-title">Customer favourites.</h2>
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
                <Mail size={16} /> Product updates
              </span>
              <h2>Safna products are coming to the online shop.</h2>
              <p>
                New sauces, seasonings, bundles, pantry products and gift boxes will appear here as they become
                available. Contact Safna to ask about current availability.
              </p>
              <Link className="button yellow" href={`mailto:${site.email}?subject=Safna%20launch%20list`}>
                <Mail size={18} /> Get updates
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section ideas-section">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div>
            <span className="eyebrow">
              <BookOpen size={16} /> Recipes and ideas
            </span>
            <h2 className="display-title">Meal ideas for sauces, seasonings and sets.</h2>
          </div>
          <p className="lead" style={{ color: "#dce5dd" }}>
            Explore ways to use Safna products with grilled food, rice dishes, wraps, marinades, family meals and gift
            boxes as the range grows.
          </p>
        </div>
      </section>

      <section className="section customer-journey-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Shopping made simple</span>
              <h2 className="display-title">Find your flavour and order with ease.</h2>
            </div>
          </div>
          <div className="journey-grid">
            {[
              ["Search products", "Use the search icon to find sauces, seasonings, sets and recipe inspiration quickly."],
              ["Build your bag", "Add products to your bag, review your total and continue to checkout when ready."],
              ["Create an account", "Keep order history, saved addresses, repeat orders and marketing preferences in one place."],
              ["UK delivery", "Delivery options, fees and order notes will be shown clearly during checkout."],
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
              ? "Browse Safna sauces, seasonings, sets and pantry products online."
              : "Sign up for updates and Safna will share product news, offers and ordering information."}
          </p>
          <Link className="button yellow" href={hasProducts ? "/products" : "/contact"}>
            {hasProducts ? "Shop products" : "Get updates"}
          </Link>
        </div>
      </section>
    </>
  );
}
