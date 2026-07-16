import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPolicy, policies } from "@/lib/policies";

type PolicyPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return policies.map((policy) => ({ slug: policy.slug }));
}

export async function generateMetadata({ params }: PolicyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  return {
    title: policy?.title || "Policy",
    description: policy?.summary,
  };
}

export default async function PolicyPage({ params }: PolicyPageProps) {
  const { slug } = await params;
  const policy = getPolicy(slug);

  if (!policy) {
    notFound();
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 920 }}>
        <span className="eyebrow">Editable policy</span>
        <h1>{policy.title}</h1>
        <p className="lead">{policy.summary}</p>
        <div className="notice-card" role="note">
          Template wording only. Safna should review and publish final legal, delivery, allergen and food-safety wording
          before accepting live orders.
        </div>
        <div className="card" style={{ padding: 24, marginTop: 24 }}>
          {policy.body.map((paragraph) => (
            <p key={paragraph} style={{ color: "#526158", lineHeight: 1.75 }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
