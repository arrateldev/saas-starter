import { redirect } from 'next/navigation';
import { updateMockSubscriptionAction } from '@/lib/payments/actions';
import { isMockStripeEnabled } from '@/lib/payments/stripe';
import { getTeamForUser } from '@/lib/db/queries';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { defaultLocale, localizePath, type Locale } from '@/lib/i18n/config';
import { getMessages } from '@/lib/i18n/messages';

const mockStates = [
  {
    title: 'Base Trial',
    description: 'Setzt das Team auf Base mit Trial-Status.',
    planName: 'Base',
    productId: 'mock_prod_base',
    subscriptionStatus: 'trialing'
  },
  {
    title: 'Base Active',
    description: 'Simuliert ein aktives Base-Abo.',
    planName: 'Base',
    productId: 'mock_prod_base',
    subscriptionStatus: 'active'
  },
  {
    title: 'Plus Active',
    description: 'Simuliert ein aktives Plus-Abo.',
    planName: 'Plus',
    productId: 'mock_prod_plus',
    subscriptionStatus: 'active'
  },
  {
    title: 'Unpaid',
    description: 'Lässt das Abo als offen oder fehlgeschlagen erscheinen.',
    planName: 'Plus',
    productId: 'mock_prod_plus',
    subscriptionStatus: 'unpaid'
  },
  {
    title: 'Canceled',
    description: 'Simuliert ein gekündigtes Abo.',
    planName: null,
    productId: null,
    subscriptionStatus: 'canceled'
  },
  {
    title: 'Free',
    description: 'Entfernt alle Subscription-Daten.',
    planName: null,
    productId: null,
    subscriptionStatus: 'inactive'
  }
] as const;

export default async function BillingMockPage({
  locale = defaultLocale
}: {
  locale?: Locale;
}) {
  const t = getMessages(locale).dashboard;

  if (!isMockStripeEnabled()) {
    redirect(localizePath(locale, '/dashboard'));
  }

  const team = await getTeamForUser();

  if (!team) {
    redirect(localizePath(locale, '/sign-in'));
  }

  return (
    <section className="space-y-6 px-1 pb-8">
      <div className="surface-panel p-6 sm:p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-primary">
          {t.settings}
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          {t.billingMockControl}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          {t.billingMockDescription}
        </p>
      </div>

      <Card className="surface-card">
        <CardHeader>
          <CardTitle>{t.currentTeamState}</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
          <p>
            <span className="font-medium">{t.plan}:</span> {team.planName || 'Free'}
          </p>
          <p>
            <span className="font-medium">{t.status}:</span>{' '}
            {team.subscriptionStatus || 'inactive'}
          </p>
          <p>
            <span className="font-medium">{t.productId}:</span>{' '}
            {team.stripeProductId || '-'}
          </p>
          <p>
            <span className="font-medium">{t.subscriptionId}:</span>{' '}
            {team.stripeSubscriptionId || '-'}
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockStates.map((state) => (
          <Card key={state.title} className="surface-card">
            <CardHeader>
              <CardTitle className="text-base">{state.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{state.description}</p>
              <form action={updateMockSubscriptionAction}>
                <input type="hidden" name="locale" value={locale} />
                <input type="hidden" name="planName" value={state.planName || ''} />
                <input type="hidden" name="productId" value={state.productId || ''} />
                <input
                  type="hidden"
                  name="subscriptionStatus"
                  value={state.subscriptionStatus}
                />
                <Button type="submit" className="w-full">
                  {t.applyState}
                </Button>
              </form>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
