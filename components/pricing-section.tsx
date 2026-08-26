'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { defaultLocale, localizePath, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { SubmitButton } from '@/app/(dashboard)/pricing/submit-button';
import { features } from '@/lib/config/feature-flags';

type PricingCardConfig = {
  label: string;
  title: string;
  tag?: string;
  price: string;
  monthLabel: string;
  description: string;
  features: readonly string[];
  emphasized?: boolean;
  cta:
    | {
        type: 'button';
        label: string;
      }
    | {
        type: 'checkout';
        priceId?: string;
      }
    | {
        type: 'current';
        label: string;
      }
    | {
        type: 'split';
        primaryLabel: string;
        secondaryLabel: string;
        secondaryHref: string;
      };
};

export function PricingSection({
  locale = defaultLocale,
  cards,
  className = 'bg-transparent py-20'
}: {
  locale?: Locale;
  cards: readonly PricingCardConfig[];
  className?: string;
}) {
  const t = getMessages(locale);

  return (
    <section className={className}>
      <div className="section-shell">
        <div className="animate-enter mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-border/70 bg-background px-3 py-1 text-sm font-medium text-muted-foreground">
            {t.home.pricingBadge}
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {t.home.pricingTitle}
          </h2>

          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {t.home.pricingDescription}
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {cards.map((card) => (
            <PricingCard key={`${card.label}-${card.title}`} card={card} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  card,
  locale
}: {
  card: PricingCardConfig;
  locale: Locale;
}) {
  const cardClassName = card.emphasized
    ? 'animate-enter-delay-2 surface-panel group relative overflow-hidden p-8 ring-1 ring-primary/15'
    : 'animate-enter-delay-1 surface-card group relative overflow-hidden p-8';

  return (
    <div className={cardClassName}>
      {card.emphasized ? (
        <>
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary/10 to-transparent" />
          {card.tag ? (
            <div className="absolute right-6 top-6 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
              {card.tag}
            </div>
          ) : null}
        </>
      ) : (
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      )}

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              {card.label}
            </p>
            <h3 className="mt-2 text-2xl font-semibold text-foreground">
              {card.title}
            </h3>
          </div>

          {!card.emphasized && card.tag ? (
            <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {card.tag}
            </div>
          ) : null}
        </div>

        <div className="mt-6 flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight text-foreground">
            {card.price}
          </span>
          <span className="pb-1 text-sm text-muted-foreground">
            {card.monthLabel}
          </span>
        </div>

        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          {card.description}
        </p>

        <FeatureList items={card.features} />

        <div className="mt-8">{renderCta(card.cta, locale)}</div>
      </div>
    </div>
  );
}

function renderCta(cta: PricingCardConfig['cta'], locale: Locale) {
  if (cta.type === 'button') {
    return (
      <Button
        variant="outline"
        size="lg"
        className="w-full text-base"
      >
        {cta.label}
      </Button>
    );
  }

  if (cta.type === 'checkout') {
    if (!features.stripe) {
      return (
        <Button
          type="button"
          variant="secondary"
          size="lg"
          className="w-full text-base"
          disabled
          title="Billing not available in this deployment mode"
        >
          Get Started
        </Button>
      );
    }

    return (
      <form action="/api/stripe/start-checkout" method="POST">
        <input type="hidden" name="priceId" value={cta.priceId} />
        <input type="hidden" name="locale" value={locale} />
        <SubmitButton locale={locale} />
      </form>
    );
  }

  if (cta.type === 'current') {
    return (
      <Button
        type="button"
        variant="secondary"
        size="lg"
        className="w-full text-base"
        disabled
      >
        {cta.label}
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        size="lg"
        className="flex-1 text-base"
      >
        {cta.primaryLabel}
      </Button>

      <Button asChild variant="outline" size="lg" className="text-base">
        <Link href={cta.secondaryHref}>
          {cta.secondaryLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

function FeatureList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-8 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3 text-sm text-foreground">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Check className="h-3.5 w-3.5" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
