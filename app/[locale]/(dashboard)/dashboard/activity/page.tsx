import ActivityPage from '@/app/(dashboard)/dashboard/activity/page';
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';

export default async function LocalizedActivityPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <ActivityPage locale={locale} />;
}
