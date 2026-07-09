import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Safna Products blog for recipes, product education, storage tips, and marketing content.",
};

export default function BlogPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Blog</span>
          <h1>Content that helps Safna sell and educate.</h1>
          <p>Use these posts for recipes, product education, seasonal guides, and SEO-friendly buying advice.</p>
        </div>
        <div className="grid-3" style={{ marginTop: 28 }}>
          {blogPosts.map((post) => (
            <article className="card" key={post.slug} style={{ padding: 24 }}>
              <span className="eyebrow">{new Date(post.date).toLocaleDateString("en-GB")}</span>
              <h2 style={{ fontSize: "1.35rem" }}>{post.title}</h2>
              <p style={{ color: "#526158", lineHeight: 1.65 }}>{post.excerpt}</p>
              <Link className="button secondary" href={`/blog#${post.slug}`}>
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
