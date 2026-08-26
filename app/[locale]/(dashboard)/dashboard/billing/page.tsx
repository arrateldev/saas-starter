import BillingMockPage from '@/app/(dashboard)/dashboard/billing/page';
import { isLocale, localizePath } from '@/lib/i18n/config';
import { notFound, redirect } from 'next/navigation';
import { features } from '@/lib/config/feature-flags';

export default async function LocalizedBillingMockPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  if (!features.billing) {
    redirect(localizePath(locale, '/dashboard'));
  }

  return <BillingMockPage locale={locale} />;
}
