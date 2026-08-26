import HomePage from '@/app/(dashboard)/page';
import { buildLocalizedMetadata } from '@/lib/i18n/metadata';
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return buildLocalizedMetadata(locale, '/');
}

export default async function LocalizedHomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale} />;
}
