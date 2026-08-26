import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowUpRight, Globe, Mail } from 'lucide-react';
import { AppLogo } from '@/components/app-logo';
import { socialIcons } from '@/components/social-icons';
import { localizePath, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { siteConfig } from '@/lib/site-config';

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: Locale }>;
}): Metadata {
  void params;

  return {
    title: `${siteConfig.product.name} Links`,
    description: siteConfig.product.metadata.description.en
  };
}

export default async function LinksPage({
  params
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getMessages(locale);
  const contactEmail = siteConfig.company.contact.email;

  return (
    <div className="bg-background">
      <section className="page-aura-surface section-shell flex min-h-[calc(100dvh-73px)] items-center justify-center py-12">
        <div className="w-full max-w-xl">
          <div className="animate-enter flex flex-col items-center text-center">
            <AppLogo className="h-16 w-16" priority />
            <h1 className="font-title mt-5 text-3xl font-semibold tracking-normal text-foreground sm:text-4xl">
              {siteConfig.product.name}
            </h1>
            <p className="mt-3 text-base font-medium text-primary">
              {siteConfig.product.claim[locale]}
            </p>
            <p className="mt-3 max-w-md text-sm leading-7 text-muted-foreground">
              {t.links.description}
            </p>
          </div>

          <div className="animate-enter-delay-1 mt-8 flex flex-col gap-3">
            <Link
              href={siteConfig.urls.defaultBaseUrl}
              target="_blank"
              rel="noreferrer"
              className="animate-enter group flex h-14 items-center gap-3 rounded-md border border-border bg-card px-4 text-card-foreground shadow-xs transition-colors hover:border-primary/50 hover:bg-secondary"
              style={{ animationDelay: '80ms' }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                <Globe className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 text-left text-sm font-semibold">
                {t.links.website}
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                aria-hidden="true"
              />
            </Link>

            <Link
              href={`mailto:${contactEmail}`}
              className="animate-enter group flex h-14 items-center gap-3 rounded-md border border-border bg-card px-4 text-card-foreground shadow-xs transition-colors hover:border-primary/50 hover:bg-secondary"
              style={{ animationDelay: '120ms' }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                <Mail className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1 text-left text-sm font-semibold">
                {t.links.contact}
              </span>
              <ArrowUpRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                aria-hidden="true"
              />
            </Link>

            {siteConfig.social.map((item, index) => {
              const SocialIcon = socialIcons[item.icon];

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="animate-enter group flex h-14 items-center gap-3 rounded-md border border-border bg-card px-4 text-card-foreground shadow-xs transition-colors hover:border-primary/50 hover:bg-secondary"
                  style={{ animationDelay: `${160 + index * 35}ms` }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-secondary text-foreground">
                    <SocialIcon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-left text-sm font-semibold">
                    {item.label}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground"
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </div>

          <div className="animate-enter-delay-2 mt-8 text-center">
            <Link
              href={localizePath(locale, '/')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.common.backToHome}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
