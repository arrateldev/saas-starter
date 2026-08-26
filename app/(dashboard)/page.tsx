import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { defaultLocale, localizePath, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { PricingSection } from '@/components/pricing-section';
import { features } from '@/lib/config/feature-flags';
import { PdfMergeDemo } from '@/features/pdf-merge-demo/demo';
import { PdfMergeHeroMock } from '@/features/pdf-merge-demo/hero-mock';

export default function HomePage({
  locale = defaultLocale
}: {
  locale?: Locale;
}) {
  const t = getMessages(locale);

  return (
    <main className="bg-background text-foreground">
      <div className="page-aura-surface border-b border-border/60">
        <section className="overflow-hidden">
          <div className="section-shell pb-3 pt-6 sm:pb-4 sm:pt-8">
            <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="animate-enter max-w-3xl">
                <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.6rem]">
                  {t.home.heroTitle}
                  <span className="mt-2 block text-primary">{t.home.heroAccent}</span>
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
                  {t.home.heroDescription}
                </p>
              </div>

              <aside className="animate-enter-delay-1 mx-auto w-[380px] max-w-full lg:self-center lg:justify-self-center">
                <PdfMergeHeroMock />
              </aside>
            </div>
          </div>
        </section>

        <div className="section-shell py-3 sm:py-4">
          <div className="mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <section id="product" className="pb-8 pt-3 sm:pb-10 sm:pt-4">
          <div className="section-shell">
            <PdfMergeDemo showPricingCta={features.pricing} />
          </div>
        </section>
      </div>

      {features.pricing ? (
        <section id="pricing">
          <PricingSection
            className="bg-transparent py-8 sm:py-10"
            locale={locale}
            cards={[
              {
                label: t.home.freeLabel,
                title: t.home.freeTitle,
                tag: t.home.freeTag,
                price: t.home.freePrice,
                monthLabel: t.home.month,
                description: t.home.freeDescription,
                features: t.home.freeFeatures,
                cta: {
                  type: 'current',
                  label: t.pricing.currentPlan
                }
              },
              {
                label: t.home.proLabel,
                title: t.home.proTitle,
                tag: t.home.proTag,
                price: t.home.proPrice,
                monthLabel: t.home.month,
                description: t.home.proDescription,
                features: t.home.proFeatures,
                emphasized: true,
                cta: {
                  type: 'split',
                  primaryLabel: t.home.proCta,
                  secondaryLabel: t.home.fullPricingCta,
                  secondaryHref: localizePath(locale, '/pricing')
                }
              }
            ]}
          />
        </section>
      ) : null}
    </main>
  );
}
