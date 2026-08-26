import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { LegalPage, LegalSection } from '@/components/legal-page';
import { buildLocalizedMetadata } from '@/lib/i18n/metadata';
import { isLocale } from '@/lib/i18n/config';
import { getLegalContent } from '@/lib/legal-content';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  const content = getLegalContent(locale).impressum;
  return {
    ...buildLocalizedMetadata(locale, '/impressum'),
    title: content.title
  };
}

export default async function ImpressumPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const content = getLegalContent(locale).impressum;

  return (
    <LegalPage eyebrow={content.eyebrow} title={content.title} intro={content.intro}>
      {content.sections.map((section) => (
        <LegalSection key={section.title} title={section.title}>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </LegalSection>
      ))}
    </LegalPage>
  );
}
