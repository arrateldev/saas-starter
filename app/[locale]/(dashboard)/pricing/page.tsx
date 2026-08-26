import PricingPage from '@/app/(dashboard)/pricing/page';
import { buildLocalizedMetadata } from '@/lib/i18n/metadata';
import { isLocale } from '@/lib/i18n/config';
import { notFound, redirect } from 'next/navigation';
import { features } from '@/lib/config/feature-flags';
import { localizePath } from '@/lib/i18n/config';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return buildLocalizedMetadata(locale, '/pricing');
}

export default async function LocalizedPricingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  if (!features.pricing) {
    redirect(localizePath(locale, '/'));
  }

  return <PricingPage locale={locale} />;
}
