import React from 'react';
import { notFound } from 'next/navigation';
import { legalDocs, VALID_LEGAL_SLUGS } from '@/data/legal-content';
import { SecondaryPageLayout } from '@/components/shared/SecondaryPageLayout';

export async function generateStaticParams() {
  const slugs = VALID_LEGAL_SLUGS;
  return slugs.flatMap((slug) => [
    { lang: 'en', slug },
    { lang: 'es', slug },
  ]);
}

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function LegalPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';

  if (!VALID_LEGAL_SLUGS.includes(slug)) {
    notFound();
  }

  const doc = legalDocs[slug][currentLang];

  return (
    <SecondaryPageLayout title={doc.title} description={doc.lastUpdated}>
      <div className="bg-surface-card/30 text-text-body w-full max-w-3xl space-y-6 rounded-2xl border border-white/5 p-8 backdrop-blur-xl md:p-10">
        {doc.sections.map((section, i) => (
          <div key={i}>
            <h2 className="mt-4 text-xl font-bold text-white">
              {section.title}
            </h2>
            {section.isList ? (
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {section.items.map((item, j) => (
                  <li key={j}>
                    <strong>{item.bold}</strong> {item.text}
                  </li>
                ))}
              </ul>
            ) : (
              section.paragraphs.map((p, j) => (
                <p key={j} className="text-sm leading-relaxed">
                  {p}
                </p>
              ))
            )}
          </div>
        ))}
      </div>
    </SecondaryPageLayout>
  );
}
