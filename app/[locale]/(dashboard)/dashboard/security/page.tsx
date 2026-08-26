import SecurityPage from '@/app/(dashboard)/dashboard/security/page';
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';

export default async function LocalizedSecurityPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <SecurityPage locale={locale} />;
}
