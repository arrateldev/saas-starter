import {
  getStripePrices,
  getStripeProducts,
  isMockStripeEnabled
} from '@/lib/payments/stripe';
import { defaultLocale, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';
import { PricingSection } from '@/components/pricing-section';

// Prices are fresh for one hour max
export const revalidate = 3600;

export default async function PricingPage({
  locale = defaultLocale
}: {
  locale?: Locale;
}) {
  const mockStripeEnabled = isMockStripeEnabled();
  const messages = getMessages(locale);
  const t = messages.pricing;
  const [prices, products] = await Promise.all([
    getStripePrices(),
    getStripeProducts(),
  ]);

  const basePlan = products.find((product) => product.name === 'Base');
  const plusPlan = products.find((product) => product.name === 'Plus');

  const basePrice = prices.find((price) => price.productId === basePlan?.id);
  const plusPrice = prices.find((price) => price.productId === plusPlan?.id);

  return (
    <main>
      {mockStripeEnabled ? (
        <div className="bg-primary/8 border-primary/20 text-foreground mx-auto mt-6 max-w-xl rounded-2xl border px-4 py-3 text-sm">
          {t.mockBillingActive}
        </div>
      ) : null}
      <PricingSection
        locale={locale}
        className="bg-transparent pt-6 pb-20"
        cards={[
          {
            label: messages.home.freeLabel,
            title: messages.home.freeTitle,
            tag: messages.home.freeTag,
            price: messages.home.freePrice,
            monthLabel: messages.home.month,
            description: messages.home.freeDescription,
            features: messages.home.freeFeatures,
            cta: {
              type: 'current',
              label: t.currentPlan
            }
          },
          {
            label: messages.home.proLabel,
            title: messages.home.proTitle,
            tag: messages.home.proTag,
            price: messages.home.proPrice,
            monthLabel: messages.home.month,
            description: messages.home.proDescription,
            features: messages.home.proFeatures,
            emphasized: true,
            cta: {
              type: 'checkout',
              priceId: plusPrice?.id
            }
          }
        ]}
      />
    </main>
  );
}
