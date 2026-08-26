import GeneralPage from '@/app/(dashboard)/dashboard/general/page';
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';

export default async function LocalizedGeneralPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <GeneralPage locale={locale} />;
}
