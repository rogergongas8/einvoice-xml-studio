import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SEO_TOOLS, getSeoToolBySlug } from "@/data/seo-tools";
import { EInvoiceStudioApp } from "@/components/EInvoiceStudioApp";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SEO_TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getSeoToolBySlug(slug);
  if (!tool) return {};

  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url: `/tools/${tool.slug}`,
      type: "website",
    },
  };
}

export default async function ToolSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getSeoToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tool.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EInvoiceStudioApp
        initialTab={tool.defaultTab}
        initialPreset={tool.defaultPreset}
        initialGeneratorStandard={tool.defaultGeneratorStandard}
        customHero={{
          badge: tool.badge,
          h1: tool.h1,
          subtitle: tool.subtitle,
        }}
      />

      {/* Technical Highlights & FAQ Section for Programmatic SEO */}
      <section className="print:hidden bg-neutral-50/60 border-t border-neutral-200/80 py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tool.highlights.map((h, i) => (
              <div
                key={i}
                className="rounded-xl bg-white border border-neutral-200/90 p-5 shadow-2xs"
              >
                <div className="font-mono text-xs font-semibold text-indigo-600 mb-1">
                  0{i + 1} · EN 16931 SPECIFICATION
                </div>
                <h2 className="font-semibold text-sm text-neutral-900 mb-1.5">
                  {h.title}
                </h2>
                <p className="text-xs text-neutral-600 leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>

          <div className="max-w-3xl">
            <h2 className="font-semibold text-lg text-neutral-900 mb-4">
              Frequently Asked Questions — {tool.h1}
            </h2>
            <div className="space-y-3">
              {tool.faqs.map((f, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white border border-neutral-200/90 p-5 shadow-2xs"
                >
                  <h3 className="font-semibold text-sm text-neutral-900 mb-1.5">
                    {f.question}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">{f.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
