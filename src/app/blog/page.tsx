import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { blogPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Safna Products blog for recipes, product education, storage tips, and marketing content.",
};

export default function BlogPage() {
  const publishedPosts = blogPosts.filter((post) => post.status === "Published");

  return (
    <section className="section">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">Blog</span>
          <h1>Safna content will appear here when published.</h1>
          <p>Recipes, product guides and announcements are hidden until Safna publishes genuine content from the backend.</p>
        </div>
        {publishedPosts.length ? (
          <div className="grid-3" style={{ marginTop: 28 }}>
            {publishedPosts.map((post) => (
              <article className="card" key={post.slug} style={{ padding: 24 }}>
                <span className="eyebrow">{new Date(post.date).toLocaleDateString("en-GB")}</span>
                <h2 style={{ fontSize: "1.35rem" }}>{post.title}</h2>
                <p style={{ color: "#526158", lineHeight: 1.65 }}>{post.excerpt}</p>
                <Link className="button secondary" href={`/blog#${post.slug}`}>
                  Read
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state" style={{ marginTop: 28 }}>
            <BookOpen size={34} />
            <h2>No published posts yet.</h2>
            <p>Safna can publish recipes, product education and launch news from the admin CMS when ready.</p>
            <Link className="button yellow" href="/contact">
              Join the launch list
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
