'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Menu, Settings, Shield, Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { defaultLocale, localizePath, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

export default function DashboardLayout({
  children,
  locale = defaultLocale
}: {
  children: React.ReactNode;
  locale?: Locale;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const t = getMessages(locale).dashboard;

  const navItems = [
    {
      href: localizePath(locale, '/dashboard'),
      icon: Users,
      label: t.nav.team
    },
    {
      href: localizePath(locale, '/dashboard/general'),
      icon: Settings,
      label: t.nav.general
    },
    {
      href: localizePath(locale, '/dashboard/activity'),
      icon: Activity,
      label: t.nav.activity
    },
    {
      href: localizePath(locale, '/dashboard/security'),
      icon: Shield,
      label: t.nav.security
    }
  ];

  return (
    <div className="section-shell flex min-h-[calc(100dvh-73px)] w-full py-6 lg:py-8">
      {isSidebarOpen ? (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-slate-950/25 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`surface-panel fixed inset-y-24 left-4 z-40 w-[min(19rem,calc(100vw-2rem))] p-4 transition-transform duration-300 lg:sticky lg:top-24 lg:block lg:h-fit lg:w-72 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'
        }`}
      >
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <span className="text-sm font-semibold text-foreground">{t.settings}</span>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link key={item.href} href={item.href} onClick={() => setIsSidebarOpen(false)}>
                <div
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-secondary text-foreground'
                      : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 lg:pl-6">
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <div>
            <p className="text-sm text-muted-foreground">{t.settings}</p>
            <h1 className="text-lg font-semibold text-foreground">{t.nav.team}</h1>
          </div>
          <Button variant="outline" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-4 w-4" />
            {t.settings}
          </Button>
        </div>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
