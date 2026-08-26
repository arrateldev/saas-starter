import { Suspense } from 'react';
import { Login } from '@/app/(login)/login';
import { buildLocalizedMetadata } from '@/lib/i18n/metadata';
import { isLocale, localizePath } from '@/lib/i18n/config';
import { notFound, redirect } from 'next/navigation';
import { features } from '@/lib/config/feature-flags';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    return {};
  }

  return buildLocalizedMetadata(locale, '/sign-in');
}

export default async function LocalizedSignInPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  // Redirect to home in minimal deployment mode
  if (!features.auth) {
    redirect(localizePath(locale, '/'));
  }

  return (
    <Suspense>
      <Login mode="signin" locale={locale} />
    </Suspense>
  );
}
