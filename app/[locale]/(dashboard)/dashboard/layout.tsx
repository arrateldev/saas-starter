import DashboardLayout from '@/app/(dashboard)/dashboard/layout';
import { isLocale, localizePath } from '@/lib/i18n/config';
import { getTeamForUser, getUser } from '@/lib/db/queries';
import { notFound, redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { SWRConfig } from 'swr';
import { features } from '@/lib/config/feature-flags';

export default async function LocalizedDashboardLayout({
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

  // Redirect to home in minimal deployment mode
  if (!features.dashboard) {
    redirect(localizePath(locale, '/'));
  }

  const [user, team] = await Promise.all([getUser(), getTeamForUser()]);

  return (
    <SWRConfig
      value={{
        fallback: {
          '/api/user': user,
          '/api/team': team
        },
        revalidateOnMount: false,
        revalidateIfStale: false
      }}
    >
      <DashboardLayout locale={locale}>{children}</DashboardLayout>
    </SWRConfig>
  );
}
