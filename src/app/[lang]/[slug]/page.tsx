import React from 'react';
import { notFound } from 'next/navigation';
import { legalDocs, VALID_LEGAL_SLUGS } from '@/data/legal-content';
import {
  ReadmeLayout,
  type LegalSection,
} from '@/app/[lang]/[slug]/components/layout/ReadmeLayout';

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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export default async function LegalPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const currentLang = lang === 'es' ? 'es' : 'en';

  if (!VALID_LEGAL_SLUGS.includes(slug)) {
    notFound();
  }

  const doc = legalDocs[slug][currentLang];

  const sections: LegalSection[] = doc.sections.map((s) => ({
    id: slugify(s.title),
    title: s.title,
    label: s.title.replace(/^\d+\.\s*/, ''),
    content: <></>,
  }));

  return (
    <ReadmeLayout
      filename={`${slug}.md`}
      sections={sections}
      title={doc.title}
      description={doc.lastUpdated}
    >
      {doc.sections.map((section) => {
        const id = slugify(section.title);
        return (
          <div key={id} id={id}>
            <h2 className="text-xl font-medium text-white">{section.title}</h2>
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
        );
      })}
    </ReadmeLayout>
  );
}
