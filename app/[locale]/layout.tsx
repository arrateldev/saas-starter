import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { isLocale, locales } from '@/lib/i18n/config';
import { SiteChrome } from '@/components/site-chrome';
import { getUser } from '@/lib/db/queries';
import { features } from '@/lib/config/feature-flags';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
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

  const user = await getUser();

  return (
    <SiteChrome
      locale={locale}
      features={{
        auth: features.auth,
        dashboard: features.dashboard,
        pricing: features.pricing
      }}
      user={
        user
          ? {
              name: user.name,
              email: user.email
            }
          : null
      }
    >
      {children}
    </SiteChrome>
  );
}
