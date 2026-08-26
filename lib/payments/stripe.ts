import Stripe from 'stripe';
import dotenv from 'dotenv';
import { redirect } from 'next/navigation';
import type { Team } from '@/lib/db/schema';
import { defaultLocale, localizePath, type Locale } from '@/lib/i18n/config';
import { getBaseUrl, siteConfig } from '@/lib/site-config';

dotenv.config();

const BASE_URL = getBaseUrl();

export const MOCK_STRIPE = process.env.MOCK_STRIPE === 'true';

const mockProducts = [
  {
    id: 'mock_prod_base',
    name: 'Base',
    description: 'Local mock plan for development.',
    defaultPriceId: 'mock_price_base'
  },
  {
    id: 'mock_prod_plus',
    name: 'Plus',
    description: 'Local mock plan for development.',
    defaultPriceId: 'mock_price_plus'
  }
] as const;

const mockPrices = [
  {
    id: 'mock_price_base',
    productId: 'mock_prod_base',
    unitAmount: 800,
    currency: 'usd',
    interval: 'month',
    trialPeriodDays: 14
  },
  {
    id: 'mock_price_plus',
    productId: 'mock_prod_plus',
    unitAmount: 1200,
    currency: 'usd',
    interval: 'month',
    trialPeriodDays: 14
  }
] as const;

let stripeClient: Stripe | null = null;

export function isMockStripeEnabled() {
  return MOCK_STRIPE;
}

export function getStripeClient() {
  if (MOCK_STRIPE) {
    throw new Error('Stripe client requested while MOCK_STRIPE is enabled.');
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error(
      'Missing STRIPE_SECRET_KEY. Set MOCK_STRIPE=true for local payment simulation.'
    );
  }

  stripeClient ??= new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2025-08-27.basil'
  });

  return stripeClient;
}

export function getMockCheckoutSession(sessionId: string) {
  if (!sessionId.startsWith('mock_checkout::')) {
    return null;
  }

  const [, userId, priceId] = sessionId.split('::');

  if (!userId || !priceId) {
    return null;
  }

  const price = mockPrices.find((entry) => entry.id === priceId);
  const product = mockProducts.find((entry) => entry.id === price?.productId);

  if (!price || !product) {
    return null;
  }

  return {
    userId: Number(userId),
    customerId: `mock_cus_${userId}`,
    subscriptionId: `mock_sub_${price.productId}`,
    productId: product.id,
    planName: product.name,
    subscriptionStatus: 'trialing' as const
  };
}

export async function createCheckoutSession({
  team,
  priceId,
  locale = defaultLocale
}: {
  team: Team | null;
  priceId: string;
  locale?: Locale;
}) {
  const { getUser } = await import('@/lib/db/queries');
  const user = await getUser();

  if (!team || !user) {
    redirect(
      `${localizePath(
        locale,
        '/sign-up'
      )}?redirect=checkout&priceId=${priceId}`
    );
  }

  if (MOCK_STRIPE) {
    redirect(
      `${BASE_URL}/api/stripe/checkout?session_id=mock_checkout::${user.id}::${priceId}&locale=${locale}`
    );
  }

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'subscription',
    success_url: `${BASE_URL}/api/stripe/checkout?session_id={CHECKOUT_SESSION_ID}&locale=${locale}`,
    cancel_url: `${BASE_URL}${localizePath(locale, '/pricing')}`,
    customer: team.stripeCustomerId || undefined,
    client_reference_id: user.id.toString(),
    allow_promotion_codes: true,
    subscription_data: {
      trial_period_days: 14
    }
  });

  redirect(session.url!);
}

export async function createCustomerPortalSession(
  team: Team,
  locale: Locale = defaultLocale
) {
  if (MOCK_STRIPE) {
    return {
      url: `${BASE_URL}${localizePath(locale, '/dashboard/billing')}`
    };
  }

  if (!team.stripeCustomerId || !team.stripeProductId) {
    redirect(localizePath(locale, '/pricing'));
  }

  const stripe = getStripeClient();
  let configuration: Stripe.BillingPortal.Configuration;
  const configurations = await stripe.billingPortal.configurations.list();

  if (configurations.data.length > 0) {
    configuration = configurations.data[0];
  } else {
    const product = await stripe.products.retrieve(team.stripeProductId);
    if (!product.active) {
      throw new Error("Team's product is not active in Stripe");
    }

    const prices = await stripe.prices.list({
      product: product.id,
      active: true
    });
    if (prices.data.length === 0) {
      throw new Error("No active prices found for the team's product");
    }

    configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: siteConfig.billing.portalHeadline
      },
      features: {
        subscription_update: {
          enabled: true,
          default_allowed_updates: ['price', 'quantity', 'promotion_code'],
          proration_behavior: 'create_prorations',
          products: [
            {
              product: product.id,
              prices: prices.data.map((price) => price.id)
            }
          ]
        },
        subscription_cancel: {
          enabled: true,
          mode: 'at_period_end',
          cancellation_reason: {
            enabled: true,
            options: [
              'too_expensive',
              'missing_features',
              'switched_service',
              'unused',
              'other'
            ]
          }
        },
        payment_method_update: {
          enabled: true
        }
      }
    });
  }

  return stripe.billingPortal.sessions.create({
    customer: team.stripeCustomerId,
    return_url: `${BASE_URL}${localizePath(locale, '/dashboard')}`,
    configuration: configuration.id
  });
}

export async function handleSubscriptionChange(
  subscription: Stripe.Subscription
) {
  const { getTeamByStripeCustomerId, updateTeamSubscription } = await import(
    '@/lib/db/queries'
  );
  const customerId = subscription.customer as string;
  const subscriptionId = subscription.id;
  const status = subscription.status;

  const team = await getTeamByStripeCustomerId(customerId);

  if (!team) {
    console.error('Team not found for Stripe customer:', customerId);
    return;
  }

  if (status === 'active' || status === 'trialing') {
    const plan = subscription.items.data[0]?.plan;
    await updateTeamSubscription(team.id, {
      stripeSubscriptionId: subscriptionId,
      stripeProductId: plan?.product as string,
      planName: (plan?.product as Stripe.Product).name,
      subscriptionStatus: status
    });
  } else if (status === 'canceled' || status === 'unpaid') {
    await updateTeamSubscription(team.id, {
      stripeSubscriptionId: null,
      stripeProductId: null,
      planName: null,
      subscriptionStatus: status
    });
  }
}

export async function getStripePrices() {
  if (MOCK_STRIPE) {
    return [...mockPrices];
  }

  const stripe = getStripeClient();
  const prices = await stripe.prices.list({
    expand: ['data.product'],
    active: true,
    type: 'recurring'
  });

  return prices.data.map((price) => ({
    id: price.id,
    productId:
      typeof price.product === 'string' ? price.product : price.product.id,
    unitAmount: price.unit_amount,
    currency: price.currency,
    interval: price.recurring?.interval,
    trialPeriodDays: price.recurring?.trial_period_days
  }));
}

export async function getStripeProducts() {
  if (MOCK_STRIPE) {
    return [...mockProducts];
  }

  const stripe = getStripeClient();
  const products = await stripe.products.list({
    active: true,
    expand: ['data.default_price']
  });

  return products.data.map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    defaultPriceId:
      typeof product.default_price === 'string'
        ? product.default_price
        : product.default_price?.id
  }));
}
