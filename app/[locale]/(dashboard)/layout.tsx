import Layout from '@/app/(dashboard)/layout';
import { isLocale } from '@/lib/i18n/config';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

export default async function LocalizedMarketingLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <Layout>{children}</Layout>;
}
