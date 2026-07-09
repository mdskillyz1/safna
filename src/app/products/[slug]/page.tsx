import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductPurchase } from "@/components/product-purchase";
import { formatPrice, getProductBySlug, getPublicProducts, getStockLabel, products } from "@/lib/products";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found" };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product || product.status !== "Published" || product.visibility !== "Public") {
    notFound();
  }

  const related = getPublicProducts()
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  const details = [
    ["Ingredients", product.ingredients],
    ["Allergens", product.allergens],
    ["Storage", product.storage],
    ["Shelf life / best-before", product.shelfLife],
    ["Dietary information", product.dietary],
    ["Extra wording", product.extraWording],
  ];

  return (
    <>
      <section className="section">
        <div className="container grid-2" style={{ alignItems: "start" }}>
          <div className="product-card" style={{ padding: 18 }}>
            <div className="product-packshot" style={{ "--pack-colour": product.colour } as React.CSSProperties}>
              <span>{product.category}</span>
              <strong>{product.name.split(" ")[0]}</strong>
            </div>
            <p style={{ color: "#526158", lineHeight: 1.7 }}>
              Product photography and final packaging imagery will appear here as the Safna range is completed.
            </p>
          </div>

          <div className="page-title">
            <span className="eyebrow">{product.category}</span>
            <h1>{product.name}</h1>
            <p>{product.longDescription}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "18px 0" }}>
              {[product.size, product.heatLevel, getStockLabel(product.stock)].map((item) => (
                <span className="eyebrow" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginTop: 20 }}>
              {product.salePrice ? (
                <span style={{ color: "#6b756e", textDecoration: "line-through", fontWeight: 900 }}>
                  {formatPrice(product.price)}
                </span>
              ) : null}
              <strong style={{ fontSize: "2rem" }}>{formatPrice(product.salePrice || product.price)}</strong>
            </div>
            <ProductPurchase product={product} />
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "#fff4ad" }}>
        <div className="container">
          <div className="page-title">
            <span className="eyebrow">Food product information</span>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", margin: "18px 0 12px" }}>
              Clear details before customers buy.
            </h2>
          </div>
          <div className="grid-2" style={{ marginTop: 24 }}>
            {details.map(([label, value]) => (
              <div className="card" key={label} style={{ padding: 22 }}>
                <h3>{label}</h3>
                <p style={{ color: "#526158", lineHeight: 1.65 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="section">
          <div className="container">
            <div className="page-title">
              <span className="eyebrow">More from {product.category}</span>
              <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", margin: "18px 0 12px" }}>
                Related Safna products
              </h2>
            </div>
            <div className="grid-3" style={{ marginTop: 24 }}>
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
